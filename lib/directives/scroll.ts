import { waitForTrue } from "../utils";
import { init, markers } from "../store/global";
import { gsap } from "gsap";
import type { DirectiveBinding } from "vue";

export const HorizontalScroll = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    waitForTrue(init).then(() => {
      if (el.children.length > 1) {
        console.warn("v-horizontal-scroll 指令只能包含一个子元素");
        return;
      }

      const container = el.children[0] as HTMLElement;

      if (!container) {
        console.warn("v-horizontal-scroll 指令需要一个子元素");
        return;
      }

      // 获取配置选项，如果没有提供则使用默认值
      const options = binding.value || {};
      const {
        start = "top top",
        scrub = true,
        pin = true,
        anticipatePin = 1,
        invalidateOnRefresh = true,
        sections = 1,
      } = options;

      const children = Array.from(container.children);
      const totalWidth = (children.length - 1) * window.innerHeight;
      const totalHeight = (children.length - 1) * window.innerWidth;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => `+=${totalWidth}`,
          scrub,
          pin,
          anticipatePin,
          invalidateOnRefresh,
          markers: markers.value,
        },
      });

      // 获取所有子元素

      // 计算每个子元素的目标位置
      children.forEach((child) => {
        tl.fromTo(
          child,
          { x: 0 }, // 初始位置
          { x: -totalHeight, ease: "none" }, // 目标位置
          0 // 同时开始
        );
      });
    });
  },
};

export const VerticalScroll = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    waitForTrue(init).then(() => {
      if (el.children.length > 1) {
        console.warn("v-vertical-scroll 指令只能包含一个子元素");
        return;
      }

      const container = el.children[0] as HTMLElement;

      if (!container) {
        console.warn("v-vertical-scroll 指令需要一个子元素");
        return;
      }

      // 获取配置选项，如果没有提供则使用默认值
      const options = binding.value || {};
      const {
        start = "top top",
        scrub = true,
        pin = true,
        anticipatePin = 1,
        invalidateOnRefresh = true,
      } = options;

      const tl = gsap.to(container, {
        y: () => -(container.offsetHeight - window.innerHeight),
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start,
          end: () => `+=${container.offsetHeight - window.innerHeight}`,
          scrub,
          pin,
          anticipatePin,
          invalidateOnRefresh,
          markers: markers.value,
        },
      });
    });
  },
};
