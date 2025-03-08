import { shallowRef } from "vue";

export const init = shallowRef(false);

export const markers = shallowRef(process.env.NODE_ENV === 'development');

export const progress = shallowRef(0);

export const timelineArray: gsap.core.Timeline[] = [];

export const refreshAllTimelines = () => {
	timelineArray.forEach((timeline) => {
		timeline.scrollTrigger?.refresh();
	});
};
