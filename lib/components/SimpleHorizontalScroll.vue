<template>
  <div class="horizontal-section" ref="el">
    <div class="horizontal-container" ref="container">
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
  const totalWidth = (children.length - 1) * parent.clientWidth;

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
        end: () => `+=${totalWidth}`,
        markers: markers.value,
      },
    })
    .to(container.value, {
      x: -totalWidth,
      ease: "none",
    });
});
</script>

<style>
/* 横向滚动样式 */
.horizontal-section {
  height: 100vh;
  width: 100%;
  overflow: hidden;
  position: relative;
}

.horizontal-container {
  display: flex;
  height: 100%;
  width: fit-content; /* 让容器宽度自适应内容 */
}

.horizontal-item {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  flex-shrink: 0;
  min-width: 100vw; /* 保持最小宽度为一屏 */
}
</style>
