export declare type Omit<T, K> = Pick<T, Exclude<keyof T, K>>
// export declare type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

