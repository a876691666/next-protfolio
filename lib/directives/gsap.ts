import type { Directive, DirectiveBinding } from "vue";
import type { GsapType } from "../helper";
import { waitForRef, createGsapTimeline } from "../utils";
import { init } from "../store/global";

export type GsapBindingValue = GsapType[];

// 基础 GSAP 指令创建函数
function createGsapDirective(type: 'props' | 'style' | 'attrs'): Directive {
  return {
    async mounted(el: HTMLElement & { _gsapTimelines: gsap.core.Timeline[] }, binding: DirectiveBinding<GsapBindingValue>, vnode: any) {
      await waitForRef(init);

      let isComponent = false;
      if (vnode.ctx.exposed?.gsapUpdate) {
        isComponent = true;
      }

      const keyframes = binding.value;

      if (!el._gsapTimelines) {
        el._gsapTimelines = [];
      }

      keyframes.forEach((keyframe) => {
        const modifiedKeyframe = { ...keyframe, animationType: type };

        const timelines = createGsapTimeline(modifiedKeyframe, {
          el,
          isComponent,
          updateCallback: isComponent
            ? (progress, state) => vnode.ctx.exposed?.gsapUpdate(progress, state)
            : undefined,
        });
        (el as any)._gsapTimelines.push(...timelines);
      });
    },

    unmounted(el: HTMLElement & { _gsapTimelines: gsap.core.Timeline[] }) {
      if (el._gsapTimelines) {
        el._gsapTimelines.forEach((tl: gsap.core.Timeline) => {
          tl.scrollTrigger?.kill();
          tl.kill();
        });
        el._gsapTimelines = [];
      }
    },
  };
}

// 创建三个不同的指令
export const vGsapProps: Directive = createGsapDirective('props');
export const vGsapStyle: Directive = createGsapDirective('style');
export const vGsapAttrs: Directive = createGsapDirective('attrs');
export const vGsap: Directive = createGsapDirective('style');
