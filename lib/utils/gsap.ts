import gsap from "gsap";
import type { GsapType } from "../helper";
import { markers } from "../store/global";

interface CreateTimelineOptions {
  updateCallback?: (progress: number, state: Record<string, any>) => void;
  options?: ScrollTrigger.Vars;
}

function interpolateState(startState: any, endState: any, progress: number) {
  const interpolatedState: Record<string, any> = {};
  Object.keys(startState).forEach((key) => {
    interpolatedState[key] = gsap.utils.interpolate(startState[key], endState[key], progress);
  });
  return interpolatedState;
}

interface CreateScrollTriggerParams {
  trigger?: HTMLElement;
  startPoint: string;
  endPoint: string;
  startState: any;
  endState: any;
  onUpdate?: (progress: number, state: Record<string, any>) => void;
  options?: ScrollTrigger.Vars;
}

function createScrollTrigger({
  startPoint,
  endPoint,
  startState,
  endState,
  onUpdate,
  options
}: CreateScrollTriggerParams) {
  return gsap.timeline({
    scrollTrigger: {
      start: startPoint,
      end: endPoint,
      scrub: 0.1,
      markers: markers.value,
      ...options,
      onUpdate: (self) => {
        const interpolatedState = interpolateState(startState, endState, self.progress);
        onUpdate?.(self.progress, interpolatedState);
      },
    },
  });
}

export function createGsapTimeline(
  keyframe: GsapType,
  options: CreateTimelineOptions
) {
  const { updateCallback, options: scrollTriggerOptions } = options;
  const timelines: gsap.core.Timeline[] = [];

  if (keyframe.type === "range") {
    const tl = createScrollTrigger({
      startPoint: keyframe.startPoint.point,
      endPoint: keyframe.endPoint.point,
      startState: keyframe.startPoint.state,
      endState: keyframe.endPoint.state,
      onUpdate: updateCallback,
      options: scrollTriggerOptions,
    });
    timelines.push(tl);
  }

  if (keyframe.type === "frame") {
    for (let i = 0; i < keyframe.points.length - 1; i++) {
      const currentPoint = keyframe.points[i];
      const nextPoint = keyframe.points[i + 1];
      const tl = createScrollTrigger({
        startPoint: currentPoint.point,
        endPoint: nextPoint.point,
        startState: currentPoint.state,
        endState: nextPoint.state,
        onUpdate: updateCallback,
        options: scrollTriggerOptions,
      });
      timelines.push(tl);
    }
  }

  return timelines;
}
