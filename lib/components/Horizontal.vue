<template>
  <div class="horizontal-section" v-horizontal-scroll="{ sections: 3 }">
    <div class="horizontal-container">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

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
