<template>
  <ScrollBase>
    <!-- PageBase 组件 -->
    <PageBase
      v-gsap="[
        rangeGsap(
          pointGsap('center 100%', { opacity: 0 }),
          pointGsap('center 0%', { opacity: 1 })
        ),
      ]"
    >
      <div class="section">
        <span
          v-gsap="[
            rangeGsap(
              pointGsap('center 100%', { opacity: 0 }),
              pointGsap('center 50%', { opacity: 1 })
            ),
            rangeGsap(
              pointGsap('center 50%', { opacity: 1 }),
              pointGsap('center 0%', { opacity: 0 })
            ),
          ]"
        >
          第一屏
        </span>
      </div>
    </PageBase>

    <PageBase>
      <div class="section">
        <span
          v-gsap="[
            freamGsap([
              pointGsap('center 100%', { fontSize: 12, opacity: 0 }),
              pointGsap('center 50%', { fontSize: 50, opacity: 1 }),
              pointGsap('center 0%', { fontSize: 12, opacity: 0 }),
            ]),
          ]"
        >
          第2屏
        </span>
      </div>
    </PageBase>

    <!-- 其他内容 -->
  </ScrollBase>
</template>

<script setup lang="ts">
import { ScrollBase, PageBase, rangeGsap, pointGsap, freamGsap } from "next-portfolio";
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
