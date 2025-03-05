<template>
  <ScrollBase>
    <div>
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
    </div>

    <!-- 横向滚动部分 -->
    <div>
      <div class="horizontal-section" ref="horizontalSection">
        <div class="horizontal-container">
          <div class="horizontal-item">
            <h2>横向滚动 1</h2>
          </div>
          <div class="horizontal-item">
            <h2>横向滚动 2</h2>
          </div>
          <div class="horizontal-item">
            <h2>横向滚动 3</h2>
          </div>
        </div>
      </div>
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

    <!-- 其他内容 -->
  </ScrollBase>
</template>

<script setup lang="ts">
import { ScrollBase, rangeGsap, pointGsap, freamGsap } from "next-portfolio";
import { onMounted, ref } from "vue";
import { gsap } from "gsap";

const horizontalSection = ref<HTMLElement | null>(null);

onMounted(() => {
  // 设置横向滚动
  if (horizontalSection.value) {
    const container = horizontalSection.value.querySelector<HTMLElement>(".horizontal-container");

    if (container) {
      gsap.to(container, {
        x: () => -(container.offsetWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: horizontalSection.value,
          start: "top top",
          end: () => `+=${container.offsetWidth - window.innerWidth}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }
  }
});
</script>

<style scoped>
.section {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
}

/* 横向滚动样式 */
.horizontal-section {
  height: 100vh;
  width: 100%;
  overflow: hidden;
  position: relative;
}

.horizontal-container {
  display: flex;
  width: 300vw; /* 三个屏幕宽度 */
  height: 100%;
}

.horizontal-item {
  width: 100vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  flex-shrink: 0;
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
