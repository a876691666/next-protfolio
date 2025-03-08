<template>
  <ScrollBase>
    <div
      class="section"
      v-gsap-style="[
        rangeGsap(pointGsap('top top', { scale: 1 }), pointGsap('bottom top', { scale: 0 })),
      ]"
    >
      <span
        v-gsap-style="[
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

    <!-- 横向滚动部分 -->
    <div>
      <Horizontal>
        <div class="horizontal-item">123</div>
        <div class="horizontal-item">
          <h2>横向滚动 2</h2>
        </div>
        <div class="horizontal-item">
          <h2>横向滚动 3</h2>
        </div>
      </Horizontal>
    </div>

    <!-- 垂直滚动部分 -->
    <div>
      <Vertical>
        <div class="vertical-item">123</div>
        <div class="vertical-item">
          <h2>横向滚动 2</h2>
        </div>
        <div class="vertical-item">
          <h2>横向滚动 3</h2>
        </div>
      </Vertical>
    </div>

    <div>
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
    </div>

    <!-- 横向滚动部分 -->
    <div>
      <Horizontal>
        <div class="horizontal-item">123</div>
        <div class="horizontal-item">
          <h2>横向滚动 2</h2>
        </div>
        <div class="horizontal-item">
          <h2>横向滚动 3</h2>
        </div>
      </Horizontal>
    </div>

    <!-- 其他内容 -->
  </ScrollBase>
</template>

<script setup lang="ts">
import { ScrollBase, rangeGsap, pointGsap, freamGsap } from "next-portfolio";
</script>

<style scoped>
.section {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
}

.vertical-item {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
}

.horizontal-item:nth-child(1) {
  background-color: #ffcccc;
}

.horizontal-item:nth-child(2) {
  background-color: #ccffcc;
}

.horizontal-item:nth-child(3) {
  background-color: #ccccff;
}
</style>
