<template>
  <div class="scroll-base-wrapper" ref="scrollBaseRef">
    <main class="scroll-base">
      <slot></slot>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, shallowRef } from "vue";
import ScrollTrigger from "gsap/ScrollTrigger";
import { init, progress } from "../store/global";
// import gsap from "gsap";

const updateProgress = () => {
  if (!scrollBaseRef.value) return;
  progress.value =
    scrollBaseRef.value?.scrollTop /
    (scrollBaseRef.value?.scrollHeight - scrollBaseRef.value?.clientHeight);
};

const scrollBaseRef = shallowRef<HTMLElement>();
onMounted(() => {
  ScrollTrigger.defaults({ scroller: scrollBaseRef.value });

  // 监听scrollBaseRef的scroll事件
  scrollBaseRef.value?.addEventListener("scroll", updateProgress);

  const resizeObserver = new ResizeObserver(() => {
    ScrollTrigger.refresh();
  });

  if (scrollBaseRef.value) {
    resizeObserver.observe(scrollBaseRef.value);
  }

  init.value = true;
});

onUnmounted(() => {
  scrollBaseRef.value?.removeEventListener("scroll", updateProgress);
});
</script>

<style scoped>
.scroll-base-wrapper {
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
}
.scroll-base {
  top: 0;
  left: 0;
  width: 100vw;
  /* height: 100vh; */
}
</style>
