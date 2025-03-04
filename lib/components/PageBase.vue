<template>
  <div class="page-base" ref="pageEl" :style="{ transform: `scale(${propsState.scale})` }">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { provide, ref, onUnmounted, watch } from "vue";
import gsap from "gsap";

export interface ScrollProgressContext {
  progress: number;
  trigger: ScrollTrigger | null;
}

const pageEl = ref<HTMLElement | null>(null);

const props = withDefaults(
  defineProps<{
    scale?: number;
  }>(),
  {
    scale: 1,
  }
);

// 提供注入键值
provide("page-trigger-el", pageEl);

// 创建状态管理函数
const createPropsState = <T extends Record<string, any>>(props: T): T => {
  const state: any = ref<T>({ ...props });

  const watchStopList = Object.keys(props).map((key: keyof T) =>
    watch(
      () => props[key],
      (newValue: any, oldValue: any) => {
        if (newValue !== oldValue) {
          state[key] = newValue;
        }
      },
      { immediate: true }
    )
  );

  onUnmounted(() => {
    watchStopList.forEach((stop) => stop());
  });

  return state;
};

// 创建并暴露状态管理对象
const propsState: any = createPropsState(props);

defineExpose({
  gsapUpdate: (progress: number, state: Record<string, any>) => {
    if (state.style) {
      gsap.set(pageEl.value, {
        ...state.style,
      });
    }
    if (state.props) {
      propsState.value = { ...state.props };
    }
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
