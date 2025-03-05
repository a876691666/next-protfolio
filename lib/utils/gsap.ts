import gsap from "gsap";
import type { GsapType } from "../helper";

interface CreateTimelineOptions {
  el: HTMLElement;
  isComponent: boolean;
  updateCallback?: (progress: number, state: Record<string, any>) => void;
}

function interpolateStyleState(startState: any, endState: any, progress: number) {
  const interpolatedState: Record<string, any> = {};
  Object.keys(startState).forEach((key) => {
    interpolatedState[key] = gsap.utils.interpolate(
      startState[key],
      endState[key],
      progress
    );
  });
  return interpolatedState;
}

function interpolatePropsState(startState: any, endState: any, progress: number) {
  const interpolatedState: Record<string, any> = {};
  Object.keys(startState).forEach((key) => {
    interpolatedState[key] = gsap.utils.interpolate(
      startState[key],
      endState[key],
      progress
    );
  });
  return interpolatedState;
}

function interpolateAttrsState(startState: any, endState: any, progress: number) {
  const interpolatedState: Record<string, any> = {};
  Object.keys(startState).forEach((key) => {
    interpolatedState[key] = gsap.utils.interpolate(
      startState[key],
      endState[key],
      progress
    );
  });
  return interpolatedState;
}

function createStyleScrollTrigger(
  el: HTMLElement,
  startPoint: string,
  endPoint: string,
  startState: any,
  endState: any,
  isComponent: boolean,
  updateCallback?: (progress: number, state: Record<string, any>) => void
) {
  return gsap.timeline({
    scrollTrigger: {
      trigger: el,
      start: startPoint,
      end: endPoint,
      scrub: 0.1,
      markers: false,
      onUpdate: (self) => {
        const interpolatedState = interpolateStyleState(startState, endState, self.progress);
        if (isComponent && updateCallback) {
          updateCallback(self.progress, interpolatedState);
        } else {
          gsap.set(el, { ...interpolatedState });
        }
      },
    },
  });
}

function createPropsScrollTrigger(
  el: HTMLElement,
  startPoint: string,
  endPoint: string,
  startState: any,
  endState: any,
  isComponent: boolean,
  updateCallback?: (progress: number, state: Record<string, any>) => void
) {
  return gsap.timeline({
    scrollTrigger: {
      trigger: el,
      start: startPoint,
      end: endPoint,
      scrub: 0.1,
      markers: false,
      onUpdate: (self) => {
        const interpolatedState = interpolatePropsState(startState, endState, self.progress);
        if (isComponent && updateCallback) {
          updateCallback(self.progress, interpolatedState);
        } else {
          gsap.set(el, { ...interpolatedState });
        }
      },
    },
  });
}

function createAttrsScrollTrigger(
  el: HTMLElement,
  startPoint: string,
  endPoint: string,
  startState: any,
  endState: any,
  isComponent: boolean,
  updateCallback?: (progress: number, state: Record<string, any>) => void
) {
  return gsap.timeline({
    scrollTrigger: {
      trigger: el,
      start: startPoint,
      end: endPoint,
      scrub: 0.1,
      markers: false,
      onUpdate: (self) => {
        const interpolatedState = interpolateAttrsState(startState, endState, self.progress);
        if (isComponent && updateCallback) {
          updateCallback(self.progress, interpolatedState);
        } else {
          Object.entries(interpolatedState).forEach(([key, value]) => {
            el.setAttribute(key, String(value));
          });
        }
      },
    },
  });
}

const createTriggerMap = {
  props: createPropsScrollTrigger,
  attrs: createAttrsScrollTrigger,
  style: createStyleScrollTrigger,
};

export function createGsapTimeline(
  keyframe: GsapType & { animationType?: 'props' | 'style' | 'attrs' },
  options: CreateTimelineOptions
) {
  const { el, isComponent, updateCallback } = options;
  const timelines: gsap.core.Timeline[] = [];

  const createTrigger = createTriggerMap[keyframe.animationType || 'style'];

  if (keyframe.type === "range") {
    const tl = createTrigger(
      el,
      keyframe.startPoint.point,
      keyframe.endPoint.point,
      keyframe.startPoint.state,
      keyframe.endPoint.state,
      isComponent,
      updateCallback
    );
    timelines.push(tl);
  }

  if (keyframe.type === "fream") {
    for (let i = 0; i < keyframe.points.length - 1; i++) {
      const currentPoint = keyframe.points[i];
      const nextPoint = keyframe.points[i + 1];
      const tl = createTrigger(
        el,
        currentPoint.point,
        nextPoint.point,
        currentPoint.state,
        nextPoint.state,
        isComponent,
        updateCallback
      );
      timelines.push(tl);
    }
  }

  return timelines;
}
