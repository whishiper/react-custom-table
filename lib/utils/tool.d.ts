import { ComponentType } from 'react';
export declare const withDefaultProps: <P extends object, DP extends Partial<P> = Partial<P>>(defaultProps: DP, Cmp: ComponentType<P>) => ComponentType<Partial<DP> & Required<Pick<P, Exclude<keyof P, keyof DP>>>>;
export declare const getType: (data: any) => string;
export declare const deepCopy: (obj1: any) => any;
declare const _default: {
    getType: (data: any) => string;
};
export default _default;
