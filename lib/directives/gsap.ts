import type { Directive, DirectiveBinding } from "vue";
import type { GsapType } from "../helper";
import { waitForRef, createGsapTimeline } from "../utils";
import { init } from "../store/global";

export type GsapBindingValue = GsapType[];

export const vGsap: Directive = {
  async mounted(el: HTMLElement, binding: DirectiveBinding<GsapBindingValue>, vnode: any) {
    await waitForRef(init);

    let isComponent = false;
    if (vnode.ctx.exposed?.gsapUpdate) {
      isComponent = true;
    }

    const keyframes = binding.value;

    // Store all timelines for cleanup
    (el as any)._gsapTimelines = [];

    // Create timelines for each keyframe
    keyframes.forEach((keyframe) => {
      const timelines = createGsapTimeline(keyframe, {
        el,
        isComponent,
        updateCallback: isComponent
          ? (progress, state) => vnode.ctx.exposed?.gsapUpdate(progress, state)
          : undefined,
      });
      (el as any)._gsapTimelines.push(...timelines);
    });
  },

  unmounted(el: HTMLElement) {
    // Clean up all ScrollTriggers and timelines
    if ((el as any)._gsapTimelines) {
      (el as any)._gsapTimelines.forEach((tl: gsap.core.Timeline) => {
        tl.scrollTrigger?.kill();
        tl.kill();
      });
      (el as any)._gsapTimelines = [];
    }
  },
};
