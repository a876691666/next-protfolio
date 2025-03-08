<template>
  <component :is="tag" ref="slotRef">
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
import { onMounted, shallowRef, watch } from "vue";
import { waitForTrue } from "../utils";
import { init } from "../store/global";
import { useGsap } from "../core/useGsap";
import { type GsapType } from "../helper";
import gsap from "gsap";

const props = withDefaults(
  defineProps<{
    tag?: string;
    defaultState?: Record<string, any>;
    keyframe: GsapType[];
    options?: ScrollTrigger.Vars;
  }>(),
  {
    tag: "div",
    options: () => ({}),
    defaultState: () => ({}),
  }
);

const slotRef = shallowRef();

const state = shallowRef(props.defaultState);

onMounted(async () => {
  await waitForTrue(init);

  watch(
    state,
    (newVal) => {
      gsap.set(slotRef.value, newVal);
    },
    { immediate: true }
  );

  props.keyframe.forEach((keyframe) => {
    useGsap(
      keyframe,
      {
        trigger: slotRef.value!,
        ...props.options,
      },
      state
    );
  });
});
</script>

<style scoped></style>
