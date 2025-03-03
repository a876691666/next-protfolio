import { inject, type Ref } from "vue";
import type ScrollTrigger from "gsap/ScrollTrigger";
import { scrollProgressKey, type ScrollProgressContext } from "../components/PageBase.vue";

export function useScrollProgress() {
  const context = inject<ScrollProgressContext>(scrollProgressKey);

  if (!context) {
    throw new Error("useScrollProgress must be used within PageBase component");
  }

  return {
    progress: context.progress as Ref<number>,
    trigger: context.trigger,
  };
}
