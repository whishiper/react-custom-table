import { __assign, __extends, __read, __spread, __values } from "tslib";
import React from 'react';
import { getType, deepCopy } from '../utils/tool';
var defaultProps = {
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
var Table = /** @class */ (function (_super) {
    __extends(Table, _super);
    function Table(props) {
        var _this = _super.call(this, props) || this;
        _this.preHandler = function (dataSoure) {
            // 深拷贝数据
            var header = deepCopy(dataSoure.header);
            var body = deepCopy(dataSoure.body);
            var footer = deepCopy(dataSoure.footer);
            // const header = dataSoure.header;
            // const body = dataSoure.body;
            // const footer = dataSoure.footer;
            var arr = ['key', 'colIndex'].concat(dataSoure.bodyNotShowProps);
            _this.setState({
                _bodyNotShowProps: __spread(new Set(arr))
            });
            // 给表头排序
            (function giveIdx2Item(arr, parentSortId, classifyId) {
                if (parentSortId === void 0) { parentSortId = ''; }
                if (classifyId === void 0) { classifyId = 0; }
                arr.forEach(function (item, idx) {
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
            (function (data) {
                var e_1, _a, e_2, _b;
                var map = new Map();
                var set = new Set();
                var obj = Object.create(null);
                var obj_2 = new Set();
                data.forEach(function (item, index) {
                    var e_3, _a;
                    try {
                        for (var _b = __values(Object.entries(item)), _d = _b.next(); !_d.done; _d = _b.next()) {
                            var _e = __read(_d.value, 2), key = _e[0], value = _e[1];
                            if (getType(value) === 'Object' && value.combine) {
                                set.add(key);
                                obj[key] = [];
                                obj_2[key] = new Set();
                            }
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (_d && !_d.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                    item.colIndex = index;
                    map.set(index, item);
                });
                // console.log(obj);
                // console.log(set);
                var cur_str_arr;
                var cur_name = '';
                map.forEach(function (item, index) {
                    var e_4, _a;
                    try {
                        // console.log(item, index);
                        for (var _b = __values(Object.entries(item)), _d = _b.next(); !_d.done; _d = _b.next()) {
                            var _e = __read(_d.value, 2), key = _e[0], value = _e[1];
                            if (set.has(key)) {
                                if (getType(value) === 'Object' && value.combine) {
                                    if (cur_name === value.name) {
                                        cur_str_arr.push(index);
                                        obj[key].push(cur_str_arr.join('_'));
                                        obj_2[key].add(cur_str_arr.join('_'));
                                    }
                                    else {
                                        cur_str_arr = [];
                                        cur_str_arr.push(index);
                                        obj[key].push(cur_str_arr.join('_'));
                                        obj_2[key].add(cur_str_arr.join('_'));
                                        if (!cur_name || cur_name !== value.name) {
                                            cur_name = value.name;
                                        }
                                    }
                                }
                                else {
                                    cur_str_arr = [];
                                }
                            }
                        }
                    }
                    catch (e_4_1) { e_4 = { error: e_4_1 }; }
                    finally {
                        try {
                            if (_d && !_d.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_4) throw e_4.error; }
                    }
                });
                try {
                    for (var _d = __values(Object.entries(obj)), _e = _d.next(); !_e.done; _e = _d.next()) {
                        var _f = __read(_e.value, 2), key = _f[0], value = _f[1];
                        for (var i = 0; i < value.length; i++) {
                            if (value[i + 1] && value[i + 1].startsWith(value[i])) {
                                obj_2[key].delete(value[i]);
                            }
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                var _loop_1 = function (key, value) {
                    value.forEach(function (v) {
                        var arr = v.split('_');
                        // console.log(arr);
                        var temp;
                        arr.forEach(function (k, __idx) {
                            if (__idx === 0) {
                                temp = k;
                                // console.log('temp', temp);
                            }
                            else {
                                // console.log(k, body[k][key]);
                                var _c = body[k][key].children;
                                body[temp][key].children = body[temp][key].children.concat(_c);
                                var target = body[k];
                                Reflect.deleteProperty(target, key);
                            }
                        });
                    });
                };
                try {
                    // console.log('obj_2', obj_2);
                    for (var _g = __values(Object.entries(obj_2)), _h = _g.next(); !_h.done; _h = _g.next()) {
                        var _j = __read(_h.value, 2), key = _j[0], value = _j[1];
                        _loop_1(key, value);
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_h && !_h.done && (_b = _g.return)) _b.call(_g);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            })(body);
            _this.setState({
                table_header: header,
                table_body: body,
                table_footer: footer
            });
        };
        _this.render_header = function (table_header) {
            if (!table_header.length) {
                return null;
            }
            var _a = _this.props, tableBorderColor = _a.tableBorderColor, cellHeight = _a.cellHeight, headerStyle = _a.headerStyle, headerBgColor = _a.headerBgColor;
            var styles = {
                bd: {
                    border: "1px solid " + tableBorderColor
                }
            };
            if (headerBgColor) {
                headerStyle = Object.assign({}, headerStyle, {
                    background: headerBgColor
                });
            }
            return (React.createElement("thead", { style: headerStyle },
                React.createElement("tr", { style: styles.bd }, table_header.map(function (item, index) {
                    var _a = item, name = _a.name, children = _a.children, key = _a.key, width = _a.width;
                    var common = __assign(__assign({}, styles.bd), { height: cellHeight + "px" });
                    if (children && children.length) {
                        var w = width;
                        var h = cellHeight;
                        var styles_1_1 = {
                            gr: {
                                borderTop: h + "px " + headerBgColor + " solid" /*上边框宽度等于表格第一行行高*/,
                                borderLeft: w + "px #fff solid" /*左边框宽度等于表格第一行第一格宽度*/,
                                position: 'relative' /*让里面的两个子容器绝对定位*/,
                                // color:'white',
                                width: 0,
                                height: 0
                            },
                            top: {
                                position: 'absolute',
                                top: "-" + h + "px",
                                left: "-" + h * 1.2 + "px",
                                width: h * 0.8 + "px"
                            },
                            bt: {
                                position: 'absolute',
                                top: "-" + h * 0.5 + "px",
                                left: "-" + w + "px",
                                width: w * 0.7 + "px"
                            }
                        };
                        var digui = function (arr) {
                            return arr.map(function (item, index) {
                                var name = item.name;
                                return (React.createElement("span", { style: index === 0 ? styles_1_1.bt : styles_1_1.top, key: index }, name));
                            });
                        };
                        return (React.createElement("th", { className: "flex_box", style: __assign(__assign({ width: width + "px" }, styles.bd), styles_1_1.gr), key: index }, digui(children)));
                    }
                    return (React.createElement("th", { className: "t_c v_m", style: width ? __assign({ width: width + "px" }, common) : __assign({}, common), key: key + "_" + index },
                        React.createElement("span", null, name)));
                }))));
        };
        _this.findKeyInHeaderIdx = function (key) {
            var table_header = _this.state.table_header;
            var idx = table_header.findIndex(function (item) { return item.key === key; });
            if (idx === -1) {
                console.error(key, idx);
                return -1;
                // throw `header has no ${key}`;
            }
            return table_header[idx].sortIdx;
        };
        _this.findKeyIfExistInBody = function (key) {
            var table_body = _this.state.table_body;
            var flag = table_body.some(function (item) { return Reflect.has(item, key); });
            return flag;
        };
        _this.render_body = function (table_body) {
            var _a = _this.state, table_header = _a.table_header, _bodyNotShowProps = _a._bodyNotShowProps;
            var _b = _this.props, cellHeight = _b.cellHeight, tableBorderColor = _b.tableBorderColor, cellNoContentTips = _b.cellNoContentTips, bodyNotDataTips = _b.bodyNotDataTips, tableWidth = _b.tableWidth;
            if (!table_body.length) {
                return null;
            }
            if (!table_header.length) {
                return null;
            }
            var styles = {
                common: {
                    height: cellHeight + "px",
                    border: "1px solid " + tableBorderColor
                },
                bd: {
                    border: "1px solid " + tableBorderColor
                }
            };
            // console.log(table_body);
            return (React.createElement("tbody", null, table_body.map(function (item, index) {
                var header_keys = table_header
                    .map(function (v) { return v.key; })
                    .filter(function (v) {
                    if (['', null, undefined].includes(item[v])) {
                        if (_this.findKeyIfExistInBody(v)) {
                            return false;
                        }
                        return true;
                    }
                    return true;
                });
                var sortArr = __spread(new Set(Object.keys(item).concat(header_keys))).filter(function (v) { return !_bodyNotShowProps.includes(v); })
                    .filter(function (v) { return table_header.findIndex(function (k) { return k.key === v; }) !== -1; })
                    .sort(function (a, b) {
                    var sortIdx_a = _this.findKeyInHeaderIdx(a);
                    var sortIdx_b = _this.findKeyInHeaderIdx(b);
                    // console.log('sortIdx_a',a,sortIdx_a)
                    // console.log('sortIdx_b',b,sortIdx_b)
                    // console.log('sortIdx_a - sortIdx_b',sortIdx_a - sortIdx_b)
                    return sortIdx_a - sortIdx_b;
                });
                // console.log('sortArr', sortArr);
                return (React.createElement("tr", { key: index }, sortArr.map(function (v, idx) {
                    var type = getType(item[v]);
                    var cur_prop_sortIdx_in_header = _this.findKeyInHeaderIdx(v);
                    var width = table_header[cur_prop_sortIdx_in_header].width;
                    if (cur_prop_sortIdx_in_header === -1) {
                        return (React.createElement("td", { style: width
                                ? __assign(__assign({}, styles.bd), { width: width + "px", color: '#ff0000' }) : __assign(__assign({}, styles.bd), { color: '#ff0000' }) }, v + " error"));
                    }
                    if (type === 'Object') {
                        if (Reflect.has(item[v], 'children')) {
                            // console.log(v, item[v]);
                            var children = item[v].children;
                            var h1 = cellHeight * children.length + 1 * (children.length - 1);
                            return (React.createElement("td", { rowSpan: children.length, style: width
                                    ? __assign(__assign({}, styles.bd), { width: width + "px" }) : __assign({}, styles.bd), key: idx },
                                React.createElement("span", { className: "flex_box" },
                                    React.createElement("span", { className: "flex_1 flex_box al-it_c " },
                                        React.createElement("span", { className: "t_c v_m", style: {
                                                width: '100%'
                                            } }, item[v].name)),
                                    React.createElement("span", { className: " flex_1" },
                                        React.createElement("span", { className: "flex_box flex_v_box" }, children.map(function (j, _idx) {
                                            var bd = {
                                                borderLeft: "1px solid " + tableBorderColor
                                            };
                                            if (_idx !== 0) {
                                                bd.borderTop = "1px solid " + tableBorderColor;
                                            }
                                            return (React.createElement("span", { style: __assign({ width: '100%', height: cellHeight + "px" }, bd), className: " flex_box al-it_c", key: _idx }, j.name));
                                        }))))));
                        }
                        return (React.createElement("td", { style: width
                                ? __assign(__assign({}, styles.common), { width: width + "px" }) : __assign({}, styles.common), key: idx }, item[v].name));
                    }
                    // console.log(v,item[v],width)
                    return (React.createElement("td", { className: "t_c v_m", style: width
                            ? __assign(__assign({}, styles.common), { width: width + "px" }) : __assign({}, styles.common), key: idx },
                        React.createElement("span", null, ![null, ''].includes(item[v])
                            ? item[v]
                            : cellNoContentTips)));
                })));
            })));
        };
        _this.render_footer = function (table_footer) {
            if (!table_footer.length) {
                return null;
            }
            var _a = _this.props, cellHeight = _a.cellHeight, tableBorderColor = _a.tableBorderColor;
            var table_header = _this.state.table_header;
            var styles = {
                common: {
                    height: cellHeight + "px",
                    border: "1px solid " + tableBorderColor
                }
            };
            return (React.createElement("tbody", null,
                React.createElement("tr", null, table_footer.map(function (item, index) {
                    var cur_prop_sortIdx_in_header = _this.findKeyInHeaderIdx(item.key);
                    var width = table_header[cur_prop_sortIdx_in_header].width;
                    return (React.createElement("td", { key: index, style: width
                            ? __assign({ width: width + "px" }, styles.common) : __assign({}, styles.common), className: "t_c v_m" }, item.name));
                }))));
        };
        _this.state = {
            table_header: [],
            table_body: [],
            table_footer: [],
            _bodyNotShowProps: []
        };
        return _this;
    }
    Table.prototype.componentDidMount = function () {
        this.preHandler(this.props);
    };
    Table.prototype.componentWillReceiveProps = function (nextProps) {
        this.preHandler(nextProps);
    };
    Table.prototype.render = function () {
        var _a = this.state, table_header = _a.table_header, table_body = _a.table_body, table_footer = _a.table_footer;
        var _b = this.props, tableWidth = _b.tableWidth, tableAligin = _b.tableAligin, bodyNotDataTips = _b.bodyNotDataTips, tableBorderColor = _b.tableBorderColor;
        var aliginOp = {
            left: 'just_c_st',
            center: 'just_c_c',
            right: 'just_c_ed'
        };
        return (React.createElement("section", { className: "nui-scroll nui-scroll-x flex_box flex_v_box " + aliginOp[tableAligin] },
            React.createElement("table", { style: { width: tableWidth + "px" } },
                this.render_header(table_header),
                this.render_body(table_body),
                this.render_footer(table_footer)),
            table_body.length ? null : (React.createElement("div", { className: "flex_box just_c_c al_it_c", style: {
                    width: tableWidth + "px",
                    height: '200px',
                    borderBottom: "1px " + tableBorderColor + " solid",
                    borderLeft: "1px " + tableBorderColor + " solid",
                    borderRight: "1px " + tableBorderColor + " solid",
                    borderTop: (table_header.length ? 0 : 1) + "px " + tableBorderColor + " solid"
                } }, bodyNotDataTips))));
    };
    Table.defaultProps = defaultProps;
    return Table;
}(React.Component));
export default Table;
