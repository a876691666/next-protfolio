<template>
  <div class="scroll-base" ref="scrollerRef">
    <div class="scroll-content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, provide } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useScrollBase } from "../composables/useScrollBase";

gsap.registerPlugin(ScrollTrigger);

const { scrollerRef } = useScrollBase();

// 提供滚动容器元素给子组件
provide("scroll-base-el", scrollerRef);

onMounted(() => {
  if (!scrollerRef.value) return;

  // 设置 ScrollTrigger 默认滚动容器
  ScrollTrigger.defaults({
    scroller: scrollerRef.value,
  });

  // 刷新 ScrollTrigger
  ScrollTrigger.refresh();

  // 设置滚动容器
});
</script>

<style scoped>
.scroll-base {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
  overflow-x: hidden;
  /* 启用平滑滚动 */
  scroll-behavior: smooth;
  /* 优化移动端滚动体验 */
  -webkit-overflow-scrolling: touch;
  /* 隐藏滚动条但保持功能 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

/* 隐藏 Webkit 滚动条 */
.scroll-base::-webkit-scrollbar {
  display: none;
}

.scroll-content {
  /* 确保内容可以撑开容器 */
  min-height: 100%;
  /* 保持内容不被固定定位影响 */
  position: relative;
  /* 启用 3D 加速 */
  transform: translateZ(0);
  will-change: transform;
}
</style>
