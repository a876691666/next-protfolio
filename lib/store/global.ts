import { shallowRef } from "vue";

export const init = shallowRef(false);

export const markers = shallowRef(process.env.NODE_ENV === 'development');
