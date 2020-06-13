declare type NotFunction<T> = T extends Function ? never : T;
