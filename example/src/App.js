import React, { useState } from 'react';
import Table from '../../lib/index';
// import Table from '../../src/index';
// import Table from 'react-custom-table'
import info from './mock/info';
import info_2 from './mock/info_2';
import JSONTree from 'react-json-tree';
class index extends React.Component {
  state = {
    header: info.header,
    body: info.body,
    footer: info.footer,
    isHeaderShow: false,
    isBodyShow: false,
    isFooterShow: false,
    bodyNotShowProps:[]
  };
  render() {
    const pd_v_50 = { padding: '50px 0' };
    const {
      header,
      body,
      footer,
      isHeaderShow,
      isBodyShow,
      isFooterShow,
      bodyNotShowProps
    } = this.state;
    return (
      <div style={{ margin: '50px' }}>
        <div>
          <span
            onClick={() =>
              this.setState({
                header: info.header,
                body: info.body,
                footer: info.footer,
                bodyNotShowProps:[]
              })
            }
            style={{ paddingRight: '50px' }}
          >
            info
          </span>
          <span
            onClick={() =>
              this.setState({
                header: info_2.header,
                body: info_2.body,
                footer: info_2.footer,
                bodyNotShowProps:['regionalDirectorEmployeId', 'headmanEmployeId', 'majordomoEmployeId', 'key','underFlag']
              })
            }
          >
            info_2
          </span>
        </div>
        <Table header={header} body={body} footer={footer} bodyNotShowProps={bodyNotShowProps}/>
        <div style={{ padding: '20px' }}>
          <div style={pd_v_50}>
            <button
              onClick={() =>
                this.setState({
                  isHeaderShow: !isHeaderShow
                })
              }
            >
              {isHeaderShow ? 'hide header' : 'show header'}
            </button>
            <br />
            {isHeaderShow ? <JSONTree data={header} /> : null}
          </div>
          <div style={pd_v_50}>
            <button onClick={() => this.setState({ isBodyShow: !isBodyShow })}>
              {isBodyShow ? 'hide body' : 'show body'}
            </button>
            <br />
            {isBodyShow ? <JSONTree data={body} /> : null}
          </div>
          <div style={pd_v_50}>
            <button
              onClick={() => this.setState({ isFooterShow: !isFooterShow })}
            >
              {isFooterShow ? 'hide footer' : 'show footer'}
            </button>
            <br />
            {isFooterShow ? <JSONTree data={footer} /> : null}
          </div>
        </div>
      </div>
    );
  }
}
// const index = () => {
//   const [isHeaderShow, setIsHeaderShow] = useState(false);
//   const [isBodyShow, setIsBodyShow] = useState(false);
//   const [isFooterShow, setIsFooterShow] = useState(false);

// };
export default index;
