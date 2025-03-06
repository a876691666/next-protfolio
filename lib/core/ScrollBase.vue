<template>
  <div class="scroll-base-wrapper" ref="scrollBaseRef">
    <main class="scroll-base">
      <slot></slot>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, shallowRef } from "vue";
import "locomotive-scroll/dist/locomotive-scroll.css";
import { init } from "../store/global";

const scrollBaseRef = shallowRef<HTMLElement>();
onMounted(() => {
  init.value = true;
});

onUnmounted(() => {});
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
