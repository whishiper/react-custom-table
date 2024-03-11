# react-custom-table2
适用于表格某些行的信息需要合并展示的场景
## demo
[demo](https://whishiper.github.io/react-custom-table2/index.html)
## usage
```
npm i react-custom-table2 
or yarn add react-custom-table2
```
## 属性说明
| 属性              | 说明                 | 默认值   | 类型   |
| ----------------- | -------------------- | -------- | ------ |
| tableBorderColor  | 边框颜色             | #cad1d8  | string |
| tableWidth        | 表格宽度             | 1200     | number |
| cellNoContentTips | 单元格无内容的展示   | ''       | string |
| bodyNotDataTips   | 表格body无内容的提示 | 暂无数据 | number |
| tableAligin      | 表格布局（left,center,right）                      | center                                    | string |
| cellHeight       | 单元格高度                                         | 50                                        | number |
| bodyNotShowProps | 表体中不显示的属性                                 | ['key', 'colIndex']                       | array  |
| headerStyle      | 表头样式                                           | {background: '#e2e9ef',  color: '#333'  } | object |
| headerBgColor    | 表头背景颜色 (该属性会覆盖headerStyle中的背景颜色) | #e2e9ef                                   | string |
| header           | 表头数据                                           | []                                        | array  |
| body             | 表体数据                                           | []                                        | array  |
| footer           | 表底部数据                                         | []                                        | array  |