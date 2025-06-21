import { Observable } from 'rxjs';

namespace kmType {
  export namespace Advanced {
    export type TupleList<LIST extends any[]> = [...LIST];
    export type ShapeType<KEY extends string, VALUE extends any, SHAPE_TYPE extends object> = {
      [key in KEY]: VALUE;
    } & SHAPE_TYPE;
    export type TupleShapeList<
      TUPLE_LIST,
      KEY_OF_VALUE extends string,
      SHAPE_TYPE extends object
    > = {
      [key in keyof TUPLE_LIST]: ShapeType<KEY_OF_VALUE, TUPLE_LIST[key], SHAPE_TYPE>;
    };
    export const tupleList = <LIST extends any[]>(list: [...LIST]) => {
      return list as [...LIST];
    };

    export const tupleShapeList = <
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
      }) as TupleShapeList<[...LIST], KEY_OF_VALUE, SHAPE_TYPE>;
    };

    export type JoinListOfStringInStart<
      LIST extends string[],
      SPLITTER extends string = ','
    > = LIST['length'] extends 0
      ? ''
      : LIST extends [infer First extends string, ...infer Rest extends string[]]
      ? `${SPLITTER}${First}${JoinListOfStringInStart<Rest, SPLITTER>}`
      : string;

    export type JoinListOfStringInEnd<
      LIST extends string[],
      SPLITTER extends string = ','
    > = LIST['length'] extends 0
      ? ''
      : LIST extends [infer First extends string, ...infer Rest extends string[]]
      ? `${First}${SPLITTER}${JoinListOfStringInEnd<Rest, SPLITTER>}`
      : string;
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

export type TupleList<LIST extends any[]> = kmType.Advanced.TupleList<LIST>;
export type ShapeType<
  KEY extends string,
  VALUE extends any,
  SHAPE_TYPE extends object
> = kmType.Advanced.ShapeType<KEY, VALUE, SHAPE_TYPE>;
export type TupleShapeList<
  TUPLE_LIST,
  KEY_OF_VALUE extends string,
  SHAPE_TYPE extends object
> = kmType.Advanced.TupleShapeList<TUPLE_LIST, KEY_OF_VALUE, SHAPE_TYPE>;
export const tupleList = kmType.Advanced.tupleList;
export const tupleShapeList = kmType.Advanced.tupleShapeList;

export type InferObservableOutput<ENTRY> = kmType.Infer.ObservableOutput<ENTRY>;
export type InferPromiseOutput<ENTRY> = kmType.Infer.PromiseOutput<ENTRY>;
export type InferFunctionOutput<ENTRY> = kmType.Infer.FunctionOutput<ENTRY>;
export type InferArrayElement<ENTRY> = kmType.Infer.ElementOfArray<ENTRY>;
export type InferArgumentValues<ENTRY> = kmType.Infer.ArgumentValues<ENTRY>;
export type InferObjectKeys<ENTRY> = kmType.Infer.ObjectKeys<ENTRY>;
export type InferObjectValues<ENTRY> = kmType.Infer.ObjectValues<ENTRY>;
export type InferObjectEntiers<ENTRY> = kmType.Infer.ObjectEntiers<ENTRY>;

export default kmType;
