import React from 'react';
import { getType, deepCopy, withDefaultProps } from '../utils/tool';
const defaultProps = {
  tableBorderColor: '#cad1d8',
  tableWidth: 1200,
  tableAligin: 'center',
  cellNoContentTips: '',
  cellHeight: 50,
  bodyNotShowProps: ['key', 'colIndex'],
  headerStyle: {
    background: '#e2e9ef',
    color: '#333'
  },
  headerBgColor: '#e2e9ef',
  header: [],
  body: [],
  footer: [],
  bodyNotDataTips: '暂无数据'
};
type Props = {
  tableBorderColor: string;
  tableWidth: number;
  tableAligin: string;
  cellNoContentTips: string;
  cellHeight: number;
  bodyNotShowProps: string[];
  headerStyle: React.CSSProperties;
  headerBgColor: string;
  header: any[];
  body: any[];
  footer: any[];
  bodyNotDataTips: string;
};
type State = {
  table_header: any[];
  table_body: any[];
  table_footer: any[];
  _bodyNotShowProps: string[];
};
class Table extends React.Component<Props, State> {
  static defaultProps = defaultProps;
  constructor(props: Props) {
    super(props);
    this.state = {
      table_header: [],
      table_body: [],
      table_footer: [],
      _bodyNotShowProps: []
    };
  }
  componentDidMount() {
    this.preHandler(this.props);
  }
  componentWillReceiveProps(nextProps: Props) {
    this.preHandler(nextProps);
  }
  preHandler = (dataSoure: Props): void => {
    // 深拷贝数据
    const header = deepCopy(dataSoure.header);
    const body = deepCopy(dataSoure.body);
    const footer = deepCopy(dataSoure.footer);
    // const header = dataSoure.header;
    // const body = dataSoure.body;
    // const footer = dataSoure.footer;
    const arr = ['key', 'colIndex'].concat(dataSoure.bodyNotShowProps);
    this.setState({
      _bodyNotShowProps: [...new Set(arr)]
    });
    // 给表头排序
    (function giveIdx2Item(arr, parentSortId = '', classifyId = 0) {
      (arr as any[]).forEach((item, idx) => {
        if (!item.sortIdx) {
          item.sortIdx = (parentSortId ? parentSortId + '_' : '') + idx;
        }
        item.classifyId = classifyId;
        if (item.children && item.children.length) {
          giveIdx2Item(item.children, item.sortIdx, classifyId + 1);
        }
      });
    })(header);
    // 处理body中需要合并的行
    (function(data) {
      const map = new Map();
      const set = new Set();
      const obj = Object.create(null);
      const obj_2 = new Set();
      (data as any[]).forEach((item, index) => {
        for (const [key, value] of Object.entries(item)) {
          if (getType(value) === 'Object' && (value as any).combine) {
            set.add(key);
            obj[key] = [];
            obj_2[key] = new Set();
          }
        }
        item.colIndex = index;
        map.set(index, item);
      });
      // console.log(obj);
      // console.log(set);
      let cur_str_arr: number[];
      let cur_name = '';
      map.forEach((item, index) => {
        // console.log(item, index);
        for (const [key, value] of Object.entries(item)) {
          if (set.has(key)) {
            if (getType(value) === 'Object' && (value as any).combine) {
              if (cur_name === (value as any).name) {
                cur_str_arr.push(index);
                obj[key].push(cur_str_arr.join('_'));
                obj_2[key].add(cur_str_arr.join('_'));
              } else {
                cur_str_arr = [];
                cur_str_arr.push(index);
                obj[key].push(cur_str_arr.join('_'));
                obj_2[key].add(cur_str_arr.join('_'));
                if (!cur_name || cur_name !== (value as any).name) {
                  cur_name = (value as any).name;
                }
              }
            } else {
              cur_str_arr = [];
            }
          }
        }
      });
      for (const [key, value] of Object.entries(obj)) {
        for (let i = 0; i < (value as string[]).length; i++) {
          if ((value as string[])[i + 1] && (value as string[])[i + 1].startsWith((value as string[])[i])) {
            obj_2[key].delete((value as string[])[i]);
          }
        }
      }
      // console.log('obj_2', obj_2);
      for (const [key, value] of Object.entries(obj_2)) {
        value.forEach((v: string) => {
          const arr = v.split('_');
          // console.log(arr);
          let temp: string;
          arr.forEach((k, __idx) => {
            if (__idx === 0) {
              temp = k;
              // console.log('temp', temp);
            } else {
              // console.log(k, body[k][key]);
              const _c = body[k][key].children;
              body[temp][key].children = body[temp][key].children.concat(_c);
              const target = body[k];
              Reflect.deleteProperty(target, key);
            }
          });
        });
      }
    })(body);
    this.setState({
      table_header: header,
      table_body: body,
      table_footer: footer
    });
  };
  render_header = (table_header: object[]) => {
    if (!table_header.length) {
      return null;
    }
    let {
      tableBorderColor,
      cellHeight,
      headerStyle,
      headerBgColor
    } = this.props;
    interface styles {
      bd: React.CSSProperties;
    }
    const styles = {
      bd: {
        border: `1px solid ${tableBorderColor}`
      }
    };
    if (headerBgColor) {
      headerStyle = Object.assign({}, headerStyle, {
        background: headerBgColor
      });
    }
    interface styles_1 {
      gr: React.CSSProperties;
      top: React.CSSProperties;
      bt: React.CSSProperties;
    }
    return (
      <thead style={headerStyle}>
        <tr style={styles.bd}>
          {table_header.map((item, index) => {
            const { name, children, key, width } = item as any;
            const common = {
              ...styles.bd,
              height: `${cellHeight}px`
            };
            if (children && children.length) {
              const w = width;
              const h = cellHeight;
              const styles_1: styles_1 = {
                gr: {
                  borderTop: `${h}px ${headerBgColor} solid` /*上边框宽度等于表格第一行行高*/,
                  borderLeft: `${w}px #fff solid` /*左边框宽度等于表格第一行第一格宽度*/,
                  position: 'relative' /*让里面的两个子容器绝对定位*/,
                  // color:'white',
                  width: 0,
                  height: 0
                },
                top: {
                  position: 'absolute',
                  top: `-${h}px`,
                  left: `-${h * 1.2}px`,
                  width: `${h * 0.8}px`
                },
                bt: {
                  position: 'absolute',
                  top: `-${h * 0.5}px`,
                  left: `-${w}px`,
                  width: `${w * 0.7}px`
                }
              };
              type childrenItem = {
                name: string;
              };
              const digui = (arr: childrenItem[]) => {
                return arr.map((item: childrenItem, index: number) => {
                  const { name } = item;
                  return (
                    <span
                      style={index === 0 ? styles_1.bt : styles_1.top}
                      key={index}
                    >
                      {name}
                    </span>
                  );
                });
              };
              return (
                <th
                  className="flex_box"
                  style={{
                    width: `${width}px`,
                    ...styles.bd,
                    ...styles_1.gr
                  }}
                  key={index}
                >
                  {digui(children)}
                </th>
              );
            }
            return (
              <th
                className="t_c v_m"
                style={
                  width ? { width: `${width}px`, ...common } : { ...common }
                }
                key={`${key}_${index}`}
              >
                <span>{name}</span>
              </th>
            );
          })}
        </tr>
      </thead>
    );
  };
  findKeyInHeaderIdx = (key: string): number => {
    const { table_header } = this.state;
    const idx = table_header.findIndex(item => (item as any).key === key);
    if (idx === -1) {
      console.error(key, idx);
      return -1;
      // throw `header has no ${key}`;
    }
    return (table_header[idx] as any).sortIdx;
  };
  findKeyIfExistInBody = (key: string): boolean => {
    const { table_body } = this.state;
    const flag = table_body.some(item => Reflect.has(item, key));
    return flag;
  };
  render_body = (table_body: any[]):JSX.Element|null => {
    const { table_header, _bodyNotShowProps } = this.state;
    const {
      cellHeight,
      tableBorderColor,
      cellNoContentTips,
      bodyNotDataTips,
      tableWidth
    } = this.props;
    if (!table_body.length) {
      return null;
    }
    if (!table_header.length) {
      return null;
    }
    interface styles {
      common: React.CSSProperties;
      bd: React.CSSProperties;
    }
    const styles: styles = {
      common: {
        height: `${cellHeight}px`,
        border: `1px solid ${tableBorderColor}`
      },
      bd: {
        border: `1px solid ${tableBorderColor}`
      }
    };
    // console.log(table_body);
    return (
      <tbody>
        {table_body.map((item, index) => {
          const header_keys = table_header
            .map(v => (v as any).key)
            .filter(v => {
              if (['', null, undefined].includes(item[v])) {
                if (this.findKeyIfExistInBody(v)) {
                  return false;
                }
                return true;
              }
              return true;
            });
          const sortArr = [...new Set(Object.keys(item).concat(header_keys))]
            .filter(v => !_bodyNotShowProps.includes(v))
            .filter(
              v => table_header.findIndex(k => (k as any).key === v) !== -1
            )
            .sort((a, b) => {
              const sortIdx_a = this.findKeyInHeaderIdx(a);
              const sortIdx_b = this.findKeyInHeaderIdx(b);
              // console.log('sortIdx_a',a,sortIdx_a)
              // console.log('sortIdx_b',b,sortIdx_b)
              // console.log('sortIdx_a - sortIdx_b',sortIdx_a - sortIdx_b)
              return sortIdx_a - sortIdx_b;
            });
          // console.log('sortArr', sortArr);
          return (
            <tr key={index}>
              {sortArr.map((v, idx) => {
                const type = getType(item[v]);
                const cur_prop_sortIdx_in_header = this.findKeyInHeaderIdx(v);
                type target = {
                  width?: string;
                };
                const { width } = table_header[
                  cur_prop_sortIdx_in_header
                ] as target;
                if (cur_prop_sortIdx_in_header === -1) {
                  return (
                    <td
                      style={
                        width
                          ? {
                              ...styles.bd,
                              width: `${width}px`,
                              color: '#ff0000'
                            }
                          : { ...styles.bd, color: '#ff0000' }
                      }
                    >{`${v} error`}</td>
                  );
                }

                if (type === 'Object') {
                  if (Reflect.has(item[v], 'children')) {
                    // console.log(v, item[v]);
                    const { children } = item[v];
                    const h1 =
                      cellHeight * children.length + 1 * (children.length - 1);
                    type childrenItem = {
                      name: string;
                    };
                    return (
                      <td
                        rowSpan={children.length}
                        style={
                          width
                            ? {
                                ...styles.bd,
                                width: `${width}px`
                              }
                            : { ...styles.bd }
                        }
                        key={idx}
                      >
                        <span className="flex_box">
                          <span className="flex_1 flex_box al-it_c ">
                            <span
                              className="t_c v_m"
                              style={{
                                width: '100%'
                              }}
                            >
                              {item[v].name}
                            </span>
                          </span>
                          <span className=" flex_1">
                            <span className="flex_box flex_v_box">
                              {children.map((j: childrenItem, _idx: number) => {
                                const bd: React.CSSProperties = {
                                  borderLeft: `1px solid ${tableBorderColor}`
                                };
                                if (_idx !== 0) {
                                  bd.borderTop = `1px solid ${tableBorderColor}`;
                                }
                                return (
                                  <span
                                    style={{
                                      width: '100%',
                                      height: `${cellHeight}px`,
                                      ...bd
                                    }}
                                    className=" flex_box al-it_c"
                                    key={_idx}
                                  >
                                    {j.name}
                                  </span>
                                );
                              })}
                            </span>
                          </span>
                        </span>
                      </td>
                    );
                  }
                  return (
                    <td
                      style={
                        width
                          ? { ...styles.common, width: `${width}px` }
                          : { ...styles.common }
                      }
                      key={idx}
                    >
                      {item[v].name}
                    </td>
                  );
                }
                // console.log(v,item[v],width)
                return (
                  <td
                    className="t_c v_m"
                    style={
                      width
                        ? {
                            ...styles.common,
                            width: `${width}px`
                          }
                        : { ...styles.common }
                    }
                    key={idx}
                  >
                    <span>
                      {![null, ''].includes(item[v])
                        ? item[v]
                        : cellNoContentTips}
                    </span>
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    );
  };
  render_footer = (table_footer:any[]):JSX.Element|null => {
    if (!table_footer.length) {
      return null;
    }
    const { cellHeight, tableBorderColor } = this.props;
    const { table_header } = this.state;
    const styles = {
      common: {
        height: `${cellHeight}px`,
        border: `1px solid ${tableBorderColor}`
      }
    };
    return (
      <tbody>
        <tr>
          {table_footer.map((item, index) => {
            const cur_prop_sortIdx_in_header = this.findKeyInHeaderIdx(
              item.key
            );
            type target = {
              width?: string;
            };
            const { width } = table_header[
              cur_prop_sortIdx_in_header
            ] as target;

            return (
              <td
                key={index}
                style={
                  width
                    ? {
                        width: `${width}px`,
                        ...styles.common
                      }
                    : { ...styles.common }
                }
                className="t_c v_m"
              >
                {item.name}
              </td>
            );
          })}
        </tr>
      </tbody>
    );
  };
  render() {
    const { table_header, table_body, table_footer } = this.state;
    const {
      tableWidth,
      tableAligin,
      bodyNotDataTips,
      tableBorderColor
    } = this.props;
    const aliginOp = {
      left: 'just_c_st',
      center: 'just_c_c',
      right: 'just_c_ed'
    };
    return (
      <section
        className={`nui-scroll nui-scroll-x flex_box flex_v_box ${aliginOp[tableAligin]}`}
      >
        <table style={{ width: `${tableWidth}px` }}>
          {this.render_header(table_header)}
          {this.render_body(table_body)}
          {this.render_footer(table_footer)}
        </table>
        {table_body.length ? null : (
          <div
            className="flex_box just_c_c al_it_c"
            style={{
              width: `${tableWidth}px`,
              height: '200px',
              borderBottom: `1px ${tableBorderColor} solid`,
              borderLeft: `1px ${tableBorderColor} solid`,
              borderRight: `1px ${tableBorderColor} solid`,
              borderTop: `${
                table_header.length ? 0 : 1
              }px ${tableBorderColor} solid`
            }}
          >
            {bodyNotDataTips}
          </div>
        )}
      </section>
    );
  }
}
export default Table;
