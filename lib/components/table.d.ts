import React from 'react';
declare type Props = {
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
declare type State = {
    table_header: any[];
    table_body: any[];
    table_footer: any[];
    _bodyNotShowProps: string[];
};
declare class Table extends React.Component<Props, State> {
    static defaultProps: {
        tableBorderColor: string;
        tableWidth: number;
        tableAligin: string;
        cellNoContentTips: string;
        cellHeight: number;
        bodyNotShowProps: string[];
        headerStyle: {
            background: string;
            color: string;
        };
        headerBgColor: string;
        header: never[];
        body: never[];
        footer: never[];
        bodyNotDataTips: string;
    };
    constructor(props: Props);
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: Props): void;
    preHandler: (dataSoure: Props) => void;
    render_header: (table_header: object[]) => JSX.Element | null;
    findKeyInHeaderIdx: (key: string) => number;
    findKeyIfExistInBody: (key: string) => boolean;
    render_body: (table_body: any[]) => JSX.Element | null;
    render_footer: (table_footer: any[]) => JSX.Element | null;
    render(): JSX.Element;
}
export default Table;
