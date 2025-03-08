<template>
  <ScrollBase>
    <GsapEl
      class="section"
      tag="div"
      :keyframe="[
        rangeGsap(pointGsap('top top', { scale: 1 }), pointGsap('bottom top', { scale: 0 })),
      ]"
    >
      <GsapEl
        tag="span"
        :keyframe="[
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
      </GsapEl>
    </GsapEl>

    <!-- 横向滚动部分 -->
    <div>
      <SimpleHorizontalScroll>
        <div class="horizontal-item">123</div>
        <div class="horizontal-item">
          <h2>横向滚动 2</h2>
        </div>
        <div class="horizontal-item">
          <h2>横向滚动 3</h2>
        </div>
      </SimpleHorizontalScroll>
    </div>

    <!-- 垂直滚动部分 -->
    <div>
      <SimpleVerticalScroll>
        <div class="vertical-item">
          <GsapEl
            :keyframe="[
              frameGsap([
                pointGsap('top bottom', { opacity: 0, ease: 'none' }),
                pointGsap('center center', { opacity: 1, ease: 'none' }),
                pointGsap('right left', { opacity: 0, ease: 'none' }),
              ]),
            ]"
            :options="{ scrub: true }"
            style="background: red"
            >垂直滚动 1</GsapEl
          >
        </div>
        <div class="vertical-item">
          <h2>垂直滚动 2</h2>
        </div>
        <div class="vertical-item">
          <h2>垂直滚动 3</h2>
        </div>
      </SimpleVerticalScroll>
    </div>

    <div>
      <div class="section">
        <GsapEl
          tag="span"
          :keyframe="[
            frameGsap([
              pointGsap('center 100%', { fontSize: 12, opacity: 0 }),
              pointGsap('center 50%', { fontSize: 50, opacity: 1 }),
              pointGsap('center 0%', { fontSize: 12, opacity: 0 }),
            ]),
          ]"
        >
          第2屏
        </GsapEl>
      </div>
    </div>

    <!-- 横向滚动部分 -->
    <div>
      <SimpleHorizontalScroll>
        <div class="horizontal-item">123</div>
        <div class="horizontal-item">
          <h2>横向滚动 2</h2>
        </div>
        <div class="horizontal-item">
          <h2>横向滚动 3</h2>
        </div>
      </SimpleHorizontalScroll>
    </div>

    <!-- 其他内容 -->
  </ScrollBase>
</template>

<script setup lang="ts">
import { ScrollBase, rangeGsap, pointGsap, frameGsap } from "next-portfolio";
</script>

<style scoped>
.section {
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
