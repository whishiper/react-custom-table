import { Omit } from '../globals';
import { ComponentType } from 'react';
export const withDefaultProps = <P extends object, DP extends Partial<P> = Partial<P>>(
  defaultProps: DP,
  Cmp: ComponentType<P>
) => {
  // we are extracting props that need to be required
  type RequiredProps = Omit<P, keyof DP>;
  // we are re-creating our props definition by creating and intersection type
  // between all original props mapped to be optional and required to be required
  type Props = Partial<DP> & Required<RequiredProps>;

  // here we set our defaultProps
  Cmp.defaultProps = defaultProps;

  // we override return type definition by turning type checker off
  // for original props  and setting the correct return type
  return (Cmp as ComponentType<any>) as ComponentType<Props>;
};
export const getType = (data: any): string =>
  Object.prototype.toString.call(data).slice(8, -1);
//深拷贝
export const deepCopy = (obj1: any) => {
  const isObject = (obj: any): boolean => (typeof obj === 'object') === true;

  const isType = (obj: any): string =>
    Object.prototype.toString.call(obj).slice(8, -1);
  let resObj:any;
  //引用类型
  if (isObject) {
    if (isType(obj1) === 'Array') {
      resObj = [];
      for (let i = 0; i < obj1.length; i++) {
        if (isObject(obj1[i])) {
          resObj[i] = deepCopy(obj1[i]);
        } else {
          resObj[i] = obj1[i];
        }
      }
    }
    if (isType(obj1) === 'Object') {
      resObj = {};
      for (let key in obj1) {
        if (isObject(obj1[key])) {
          resObj[key] = deepCopy(obj1[key]);
        } else {
          resObj[key] = obj1[key];
        }
      }
    }
  } else {
    //基本类型
    resObj = obj1;
  }
  return resObj;
};
export default {
  getType
};
