<template>
  <ScrollBase>
    <!-- PageBase 组件 -->
    <PageBase
      v-gsap="[
        rangeGsap(
          pointGsap('top top', { props: { scale: 1 } }),
          pointGsap('bottom top', { props: { scale: 0 } })
        ),
      ]"
    >
      <div class="section">
        <span
          v-gsap="[
            rangeGsap(
              pointGsap('center 100%', { style: { opacity: 0 } }),
              pointGsap('center 50%', { style: { opacity: 1 } })
            ),
            rangeGsap(
              pointGsap('center 50%', { style: { opacity: 1 } }),
              pointGsap('center 0%', { style: { opacity: 0 } })
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
              pointGsap('center 100%', { style: { fontSize: 12, opacity: 0 } }),
              pointGsap('center 50%', { style: { fontSize: 50, opacity: 1 } }),
              pointGsap('center 0%', { style: { fontSize: 12, opacity: 0 } }),
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
