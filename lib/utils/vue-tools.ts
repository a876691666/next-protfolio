import type { Ref } from "vue";
import { watch } from "vue";

/**
 * Waits for a ref value to become truthy
 * @param ref The ref to watch
 * @returns Promise that resolves when the ref value becomes truthy
 */
export const waitForTrue = <T>(ref: Ref<T | null | undefined>): Promise<T> => {
  return new Promise((resolve) => {
    // If value is already truthy, resolve immediately
    if (ref.value) {
      resolve(ref.value);
      return;
    }

    // Otherwise watch for changes until value becomes truthy
    const stopWatch = watch(
      ref,
      (newVal) => {
        if (newVal) {
          stopWatch();
          resolve(newVal);
        }
      },
      { immediate: true }
    );
  });
};
