import { ref } from "vue";

const scrollerRef = ref<HTMLElement | null>(null);

export const useScrollBase = () => {
  return {
    scrollerRef,
  };
};
