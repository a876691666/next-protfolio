import gsap from "gsap";
import type { GsapType, GsapState } from "../helper";

interface CreateTimelineOptions {
  el: HTMLElement;
  isComponent: boolean;
  updateCallback?: (progress: number, state: Record<string, any>) => void;
}

function interpolateState(startState: GsapState<any>, endState: GsapState<any>, progress: number) {
  const interpolatedState: Record<string, any> = {};

  // 处理 style 属性
  if (startState.style && endState.style) {
    interpolatedState.style = {};
    Object.keys(startState.style).forEach((key) => {
      interpolatedState.style[key] = gsap.utils.interpolate(
        startState.style[key],
        endState.style[key],
        progress
      );
    });
  }

  // 处理 props 属性
  if (startState.props && endState.props) {
    interpolatedState.props = {};
    Object.keys(startState.props).forEach((key) => {
      interpolatedState.props[key] = gsap.utils.interpolate(
        startState.props[key],
        endState.props[key],
        progress
      );
    });
  }

  return interpolatedState;
}

function createScrollTrigger(
  el: HTMLElement,
  startPoint: string,
  endPoint: string,
  startState: GsapState<any>,
  endState: GsapState<any>,
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
        const interpolatedState = interpolateState(startState, endState, self.progress);
        if (isComponent && updateCallback) {
          updateCallback(self.progress, interpolatedState);
        } else {
          if (interpolatedState.style) {
            gsap.set(el, { ...interpolatedState.style });
          }
          if (interpolatedState.props) {
            gsap.set(el, { ...interpolatedState.props });
          }
        }
      },
    },
  });
}

export function createGsapTimeline(keyframe: GsapType, options: CreateTimelineOptions) {
  const { el, isComponent, updateCallback } = options;
  const timelines: gsap.core.Timeline[] = [];

  if (keyframe.type === "range") {
    const tl = createScrollTrigger(
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
      const tl = createScrollTrigger(
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
