export type GsapState<T> = {
  props?: T;
  style?: any;
};

export type GsapRange<T> = {
  type: "range";
  startPoint: GsapPoint<T>;
  endPoint: GsapPoint<T>;
};

export type GsapPoint<T> = {
  type: "point";
  point: string;
  state: GsapState<T>;
  trigger?: HTMLElement;
};

export type GsapFream<T> = {
  type: "fream";
  points: GsapPoint<T>[];
};

export type GsapType = GsapRange<any> | GsapPoint<any> | GsapFream<any>;

export const rangeGsap = <T>(startPoint: GsapPoint<T>, endPoint: GsapPoint<T>): GsapRange<T> => {
  return {
    type: "range",
    startPoint,
    endPoint,
  };
};

export const pointGsap = <T>(point: string, state: GsapState<T>): GsapPoint<T> => {
  return {
    type: "point",
    point,
    state,
  };
};

export const freamGsap = <T>(points: GsapPoint<T>[]): GsapFream<T> => {
  return {
    type: "fream",
    points,
  };
};
