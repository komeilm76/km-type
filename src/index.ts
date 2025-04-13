import { Observable } from 'rxjs';

namespace kmType {
  export namespace Advanced {
    export type ITuple<LIST extends any[]> = [...LIST];
    export type IShape<KEY extends string, VALUE extends any, SHAPE_TYPE extends object> = {
      [key in KEY]: VALUE;
    } & SHAPE_TYPE;
    export type ITupleShape<TUPLE_LIST, KEY_OF_VALUE extends string, SHAPE_TYPE extends object> = {
      [key in keyof TUPLE_LIST]: IShape<KEY_OF_VALUE, TUPLE_LIST[key], SHAPE_TYPE>;
    };
    export const tuple = <LIST extends any[]>(list: [...LIST]) => {
      return list as [...LIST];
    };

    export const tupleShape = <
      LIST extends readonly any[],
      SHAPE_TYPE extends object,
      KEY_OF_VALUE extends string
    >(
      list: [...LIST] | [],
      keyOfValue: KEY_OF_VALUE,
      exampleShape?: SHAPE_TYPE
    ) => {
      return list.map((item) => {
        return {
          [keyOfValue]: item,
          ...exampleShape,
        };
      }) as ITupleShape<[...LIST], KEY_OF_VALUE, SHAPE_TYPE>;
    };
  }
  export namespace Infer {
    export type ObservableOutput<T> = T extends Observable<infer U> ? U : never;
    export type PromiseOutput<T> = T extends Promise<infer U> ? U : never;
    export type FunctionOutput<T> = T extends (...args: any) => infer U ? U : never;
    export type ElementOfArray<T> = T extends readonly (infer U)[] | Array<infer U> ? U : never;
    export type ArgumentValues<T> = T extends (...args: infer U) => unknown ? U : never;
    export type ObjectKeys<T> = T extends { [key in infer U]: any } ? U : never;
    export type ObjectValues<T> = T extends { [key: string]: infer U } ? U : never;
    export type ObjectEntiers<T> = T extends { [key in infer K]: infer V } ? [K, V] : never;
  }
}

export type KMTuple<LIST extends any[]> = kmType.Advanced.ITuple<LIST>;
export type KMShape<
  KEY extends string,
  VALUE extends any,
  SHAPE_TYPE extends object
> = kmType.Advanced.IShape<KEY, VALUE, SHAPE_TYPE>;
export type KMTupleShape<
  TUPLE_LIST,
  KEY_OF_VALUE extends string,
  SHAPE_TYPE extends object
> = kmType.Advanced.ITupleShape<TUPLE_LIST, KEY_OF_VALUE, SHAPE_TYPE>;
export const kmTuple = kmType.Advanced.tuple;
export const kmTupleShape = kmType.Advanced.tupleShape;

export type InferObservableOutput<ENTRY> = kmType.Infer.ObservableOutput<ENTRY>;
export type InferPromiseOutput<ENTRY> = kmType.Infer.PromiseOutput<ENTRY>;
export type InferFunctionOutput<ENTRY> = kmType.Infer.FunctionOutput<ENTRY>;
export type InferArrayElement<ENTRY> = kmType.Infer.ElementOfArray<ENTRY>;
export type InferArgumentValues<ENTRY> = kmType.Infer.ArgumentValues<ENTRY>;
export type InferObjectKeys<ENTRY> = kmType.Infer.ObjectKeys<ENTRY>;
export type InferObjectValues<ENTRY> = kmType.Infer.ObjectValues<ENTRY>;
export type InferObjectEntiers<ENTRY> = kmType.Infer.ObjectEntiers<ENTRY>;

export default kmType;
