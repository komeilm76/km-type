namespace KmType {
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
    // export const tupleShape = <
    //   LIST extends any[],
    //   SHAPE_TYPE extends object,
    //   KEY_OF_VALUE extends string
    // >(
    //   list: [...LIST],
    //   keyOfValue: KEY_OF_VALUE,
    //   exampleShape?: SHAPE_TYPE
    // ) => {
    //   return list.map((item) => {
    //     return {
    //       [keyOfValue]: item,
    //       ...exampleShape,
    //     };
    //   }) as ITupleShape<[...LIST], KEY_OF_VALUE, SHAPE_TYPE>;
    // };
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
}

export type KMTuple<LIST extends any[]> = KmType.Advanced.ITuple<LIST>;
export type KMShape<
  KEY extends string,
  VALUE extends any,
  SHAPE_TYPE extends object
> = KmType.Advanced.IShape<KEY, VALUE, SHAPE_TYPE>;
export type KMTupleShape<
  TUPLE_LIST,
  KEY_OF_VALUE extends string,
  SHAPE_TYPE extends object
> = KmType.Advanced.ITupleShape<TUPLE_LIST, KEY_OF_VALUE, SHAPE_TYPE>;
export const kmTuple = KmType.Advanced.tuple;
export const tupleShape = KmType.Advanced.tupleShape;


export default KmType;
