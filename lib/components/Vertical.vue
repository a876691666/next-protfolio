<template>
  <div class="vertical-section" v-vertical-scroll>
    <div class="vertical-container">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

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
