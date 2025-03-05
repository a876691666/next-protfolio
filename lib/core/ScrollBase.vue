<template>
  <main ref="scrollBaseRef" class="scroll-base">
    <slot></slot>
  </main>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, shallowRef } from "vue";
import LocomotiveScroll from "locomotive-scroll";
import ScrollTrigger from "gsap/ScrollTrigger";
import "locomotive-scroll/dist/locomotive-scroll.css";
import { init } from "../store/global";

const scrollBaseRef = shallowRef<HTMLElement>();
const locomotiveScroll = shallowRef<LocomotiveScroll | null>(null);

function initScrollTrigger() {
  if (locomotiveScroll.value) {
    const locoScroll = locomotiveScroll.value;

    locoScroll.on("scroll", () => {
      ScrollTrigger.update();
    });

    ScrollTrigger.scrollerProxy(scrollBaseRef.value!, {
      scrollTop(value) {
        return arguments.length
          ? locoScroll.scrollTo(value!, { duration: 0, disableLerp: true })
          : // @ts-ignore
            locoScroll.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: scrollBaseRef.value?.style.transform ? "transform" : "fixed",
    });

    ScrollTrigger.addEventListener("refresh", () => {
      locoScroll.update();
    });
    ScrollTrigger.defaults({ scroller: scrollBaseRef.value });

    ScrollTrigger.refresh();
  }
}

function destroyLocomotiveScroll() {
  if (locomotiveScroll.value) {
    locomotiveScroll.value.destroy();
    locomotiveScroll.value = null;
  }
}

onMounted(() => {
  locomotiveScroll.value = new LocomotiveScroll({
    el: scrollBaseRef.value,
    smooth: true,
  });

  initScrollTrigger();

  init.value = true;
});

onUnmounted(() => {
  destroyLocomotiveScroll();
});
</script>

<style scoped>
.scroll-base {
  top: 0;
  left: 0;
  width: 100vw;
}
</style>
