import type { Directive, DirectiveBinding } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useScrollBase } from "../composables/useScrollBase";
import { waitForRef } from "../utils/vue-tools";
import type { GsapType } from "../helper";
import { createGsapTimeline } from "../utils/gsap-utils";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export type GsapBindingValue = GsapType[];

const { scrollerRef } = useScrollBase();

export const vGsap: Directive = {
  async mounted(el: HTMLElement, binding: DirectiveBinding<GsapBindingValue>, vnode: any) {
    let isComponent = false;
    if (vnode.ctx.exposed?.gsapUpdate) {
      isComponent = true;
    }

    const scrollerEl = await waitForRef(scrollerRef);

    if (!scrollerEl) {
      console.warn("v-gsap: No scroller element provided by ScrollBase");
      return;
    }

    const keyframes = binding.value;

    // Store all timelines for cleanup
    (el as any)._gsapTimelines = [];
    
    // Create timelines for each keyframe
    keyframes.forEach((keyframe) => {
      const timelines = createGsapTimeline(keyframe, {
        el,
        scrollerEl,
        isComponent,
        updateCallback: isComponent 
          ? (progress, state) => vnode.ctx.exposed?.gsapUpdate(progress, state)
          : undefined
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
