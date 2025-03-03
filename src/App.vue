<template>
  <ScrollBase>
    <!-- PageBase 组件 -->
    <PageBase>
      <div class="section" v-gsap="[]">第一屏</div>
    </PageBase>

    <PageBase>
      <div class="section">第二屏</div>
    </PageBase>

    <!-- 其他内容 -->
  </ScrollBase>
</template>

<script setup lang="ts">
import { ScrollBase, PageBase } from "next-portfolio";
</script>

<style scoped>
.section {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
}
</style>
