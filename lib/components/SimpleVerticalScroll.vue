<template>
  <div class="vertical-section" ref="el">
    <div class="vertical-container" ref="container">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, shallowRef } from "vue";
import { init, markers } from "../store/global";
import { waitForTrue } from "../utils";
import gsap from "gsap";

const el = shallowRef<HTMLElement>();
const container = shallowRef<HTMLElement>();

onMounted(async () => {
  await waitForTrue(init);
  const parent = el.value?.parentElement;
  if (!el.value || !container.value || !parent) {
    return;
  }

  const children = Array.from(container.value.children);
  const totalHeight = (children.length - 1) * parent.clientHeight;

  gsap
    .timeline({
      scrollTrigger: {
        trigger: el.value,
        pin: true,
        scrub: 1,
        snap: {
          snapTo: 1 / (children.length - 1),
          duration: 0.1,
          delay: 0.02,
          inertia: false,
          ease: "none",
        },
        end: () => `+=${totalHeight}`,
        markers: markers.value,
      },
    })
    .to(container.value, {
      y: -totalHeight,
      ease: "none",
    });
});
</script>

<style>
/* 垂直滚动样式 */
.vertical-section {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
}

.vertical-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content; /* 让容器高度自适应内容 */
}

.vertical-item {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  flex-shrink: 0;
}
</style>
