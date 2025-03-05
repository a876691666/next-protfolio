import type { Ref } from "vue";
import { watch } from "vue";

/**
 * Waits for a ref value to become non-null and non-undefined
 * @param ref The ref to watch
 * @returns Promise that resolves when the ref value is valid
 */
export const waitForTrue = <T>(ref: Ref<T | null | undefined>): Promise<T> => {
  return new Promise((resolve) => {
    // If value is already valid, resolve immediately
    if (ref.value) {
      resolve(ref.value);
      return;
    }

    // Otherwise watch for changes
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
