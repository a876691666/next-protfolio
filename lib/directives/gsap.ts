import type { Directive, DirectiveBinding } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useScrollBase } from "../composables/useScrollBase";
import { waitForRef } from "../utils/vue-tools";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface AnimationState {
  style?: Record<string, any>;
  [key: string]: any;
}

interface AnimationKeyframe {
  progress: number;
  state: AnimationState;
}

export type GsapBindingValue = AnimationKeyframe[];

const { scrollerRef } = useScrollBase();

export const vGsap: Directive = {
  async mounted(el: HTMLElement, binding: DirectiveBinding<GsapBindingValue>) {
    const scrollerEl = await waitForRef(scrollerRef);

    if (!scrollerEl) {
      console.warn("v-gsap: No scroller element provided by ScrollBase");
      return;
    }

    const keyframes = binding.value;
    if (!Array.isArray(keyframes) || keyframes.length < 2) {
      console.warn("v-gsap directive requires at least two keyframes");
      return;
    }

    // Store all timelines for cleanup
    (el as any)._gsapTimelines = [];

    // Create individual timeline for each keyframe
    keyframes.forEach((keyframe, index) => {
      if (index === 0) return; // Skip first keyframe as it's the starting point

      const prevKeyframe = keyframes[index - 1];

      const tl = gsap.timeline({
        scrollTrigger: {
          scroller: scrollerEl,
          trigger: el,
          start: `top+=${prevKeyframe.progress * 100}% center`,
          end: `top+=${keyframe.progress * 100}% center`,
          scrub: 0.1,
          markers: false,
        },
      });

      tl.fromTo(
        el,
        { ...prevKeyframe.state },
        {
          ...keyframe.state,
          duration: 1,
          ease: "none",
        }
      );

      // Store timeline for cleanup
      (el as any)._gsapTimelines.push(tl);
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
