import type { ComponentPublicInstance } from "vue";

type GsapOptions = {
  trigger?: HTMLElement;
  target?: HTMLElement | ComponentPublicInstance;
} & ScrollTrigger.Vars;

export type GsapRange<T> = {
  type: "range";
  startPoint: GsapPoint<T>;
  endPoint: GsapPoint<T>;
  options?: GsapOptions;
};

export type GsapPoint<T> = {
  type: "point";
  point: string;
  state: T;
  options?: GsapOptions;
};

export type GsapFrame<T> = {
  type: "frame";
  points: GsapPoint<T>[];
  options?: GsapOptions;
};

export type GsapType = GsapRange<any> | GsapPoint<any> | GsapFrame<any>;

export const rangeGsap = <T>(startPoint: GsapPoint<T>, endPoint: GsapPoint<T>, options?: GsapOptions): GsapRange<T> => {
  return {
    type: "range",
    startPoint,
    endPoint,
    options,
  };
};

export const pointGsap = <T>(point: string, state: T, options?: GsapOptions): GsapPoint<T> => {
  return {
    type: "point",
    point,
    state,
    options,
  };
};

export const frameGsap = <T>(points: GsapPoint<T>[], options?: GsapOptions): GsapFrame<T> => {
  return {
    type: "frame",
    points,
    options,
  };
};
