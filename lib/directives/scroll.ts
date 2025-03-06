import { waitForTrue } from "../utils";
import { init, markers } from "../store/global";
import { gsap } from "gsap";
import type { DirectiveBinding } from "vue";

export const HorizontalScroll = {
	mounted(el: HTMLElement, binding: DirectiveBinding) {
		waitForTrue(init).then(() => {
			if (el.children.length > 1) {
				console.warn("v-horizontal-scroll 指令只能包含一个子元素");
				return;
			}

			const container = el.children[0] as HTMLElement;

			if (!container) {
				console.warn("v-horizontal-scroll 指令需要一个子元素");
				return;
			}

			// 获取配置选项，如果没有提供则使用默认值
			const options = binding.value || {};
			const {
				scrub = 1,
				pin = true,
			} = options;

			const children = Array.from(container.children);
			const totalWidth = (children.length - 1) * window.innerHeight;

			gsap.to(children, {
				xPercent: -100 * (children.length - 1),
				ease: "none",
				scrollTrigger: {
					trigger: el,
					pin,
					scrub,
					snap: {
						snapTo: 1 / (children.length - 1),
						duration: 0.1,
						delay: 0.02,
						inertia: false,
						ease: "power1.inOut"
					},
					end: () => `+=${totalWidth}`,
					markers: markers.value
				},
			});
		});
	},
};

export const VerticalScroll = {
	mounted(el: HTMLElement, binding: DirectiveBinding) {
		waitForTrue(init).then(() => {
			if (el.children.length > 1) {
				console.warn("v-vertical-scroll 指令只能包含一个子元素");
				return;
			}

			const container = el.children[0] as HTMLElement;

			if (!container) {
				console.warn("v-vertical-scroll 指令需要一个子元素");
				return;
			}

			// 获取配置选项，如果没有提供则使用默认值
			const options = binding.value || {};
			const {
				scrub = 1,
				pin = true,
			} = options;

			const children = Array.from(container.children);
			const totalHeight = (children.length - 1) * window.innerHeight;

			gsap.to(children, {
				yPercent: -100 * (children.length - 1),
				ease: "none",
				scrollTrigger: {
					trigger: el,
					pin,
					scrub,
					snap: {
						snapTo: 1 / (children.length - 1),
						duration: 0.1,
						delay: 0.02,
						inertia: false,
						ease: "power1.inOut"
					},
					end: () => `+=${totalHeight}`,
					markers: markers.value
				},
			});
		});
	},
};
