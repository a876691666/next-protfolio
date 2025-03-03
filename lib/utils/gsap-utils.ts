import gsap from "gsap";
import type { GsapType } from "../helper";

interface CreateTimelineOptions {
  el: HTMLElement;
  scrollerEl: HTMLElement;
  isComponent: boolean;
  updateCallback?: (progress: number, state: Record<string, any>) => void;
}

export function createGsapTimeline(
  keyframe: GsapType,
  options: CreateTimelineOptions
) {
  const { el, scrollerEl, isComponent, updateCallback } = options;
  const timelines: gsap.core.Timeline[] = [];

  if (keyframe.type === "range") {
    const tl = gsap.timeline({
      scrollTrigger: {
        scroller: scrollerEl,
        trigger: el,
        start: keyframe.startPoint?.point,
        end: keyframe.endPoint?.point,
        scrub: 0.1,
        markers: false,
        onUpdate: (self) => {
          const interpolatedState: Record<string, any> = {};
          Object.keys(keyframe.startPoint.state).forEach((key) => {
            interpolatedState[key] = gsap.utils.interpolate(
              keyframe.startPoint.state[key],
              keyframe.endPoint.state[key],
              self.progress
            );
          });
          if (isComponent && updateCallback) {
            updateCallback(self.progress, interpolatedState);
          } else {
            gsap.set(el, interpolatedState);
          }
        },
      },
    });
    timelines.push(tl);
  }

  if (keyframe.type === "fream") {
    for (let i = 0; i < keyframe.points.length - 1; i++) {
      const currentPoint = keyframe.points[i];
      const nextPoint = keyframe.points[i + 1];
      const tl = gsap.timeline({
        scrollTrigger: {
          scroller: scrollerEl,
          trigger: el,
          start: currentPoint.point,
          end: nextPoint.point,
          scrub: 0.1,
          markers: false,
          onUpdate: (self) => {
            const interpolatedState: Record<string, any> = {};
            Object.keys(currentPoint.state).forEach((key) => {
              interpolatedState[key] = gsap.utils.interpolate(
                currentPoint.state[key],
                nextPoint.state[key],
                self.progress
              );
            });
            if (isComponent && updateCallback) {
              updateCallback(self.progress, interpolatedState);
            } else {
              gsap.set(el, interpolatedState);
            }
          },
        },
      });
      timelines.push(tl);
    }
  }

  return timelines;
} 