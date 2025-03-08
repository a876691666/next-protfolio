import gsap from "gsap";
import type { GsapType } from "../helper";
import { markers } from "../store/global";

interface CreateTimelineOptions {
  el: HTMLElement;
  updateCallback?: (progress: number, state: Record<string, any>) => void;
}

function interpolateState(startState: any, endState: any, progress: number) {
  const interpolatedState: Record<string, any> = {};
  Object.keys(startState).forEach((key) => {
    interpolatedState[key] = gsap.utils.interpolate(startState[key], endState[key], progress);
  });
  return interpolatedState;
}

function createScrollTrigger(
  el: HTMLElement,
  startPoint: string,
  endPoint: string,
  startState: any,
  endState: any,
  updateCallback?: (progress: number, state: Record<string, any>) => void
) {
  return gsap.timeline({
    scrollTrigger: {
      trigger: el,
      start: startPoint,
      end: endPoint,
      scrub: 0.1,
      markers: markers.value,
      onUpdate: (self) => {
        const interpolatedState = interpolateState(startState, endState, self.progress);
        if (updateCallback) {
          updateCallback(self.progress, interpolatedState);
        }
        gsap.set(el, { ...interpolatedState });
      },
    },
  });
}

export function createGsapTimeline(
  keyframe: GsapType & { animationType?: "props" | "style" | "attrs" },
  options: CreateTimelineOptions
) {
  const { el, updateCallback } = options;
  const timelines: gsap.core.Timeline[] = [];

  const onUpdate = (progress: number, state: Record<string, any>) => {
    if (keyframe.animationType === "attrs") {
      Object.entries(state).forEach(([key, value]) => {
        el.setAttribute(key, String(value));
      });
    } else if (keyframe.animationType === "props") {
      Object.entries(state).forEach(([key, value]) => {
        (el as any)[key] = value;
      });
    } else {
      gsap.set(el, { ...state });
    }
    updateCallback?.(progress, state);
  };

  if (keyframe.type === "range") {
    const tl = createScrollTrigger(
      el,
      keyframe.startPoint.point,
      keyframe.endPoint.point,
      keyframe.startPoint.state,
      keyframe.endPoint.state,
      onUpdate
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
        onUpdate
      );
      timelines.push(tl);
    }
  }

  return timelines;
}
