<template>
  <div class="page-base" ref="pageEl">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { provide, ref, onMounted, onUnmounted } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface ScrollProgressContext {
  progress: number;
  trigger: ScrollTrigger | null;
}

const pageEl = ref<HTMLElement | null>(null);
const progress = ref(0);
let trigger: ScrollTrigger | null = null;

onMounted(() => {
  if (!pageEl.value) return;

  trigger = ScrollTrigger.create({
    trigger: pageEl.value,
    start: "top top",
    end: "bottom bottom",
    scrub: true,
    onUpdate: (self) => {
      progress.value = self.progress * 100;
    },
  });
});

onUnmounted(() => {
  if (trigger) {
    trigger.kill();
    trigger = null;
  }
});

// 提供注入键值
provide("page-trigger-el", pageEl);

defineExpose({
  gsapUpdate: (progress: number, state: Record<string, any>) => {
    gsap.set(pageEl.value, {
      ...state,
    });
  },
});
</script>

<style scoped>
.page-base {
  min-height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
</style>
