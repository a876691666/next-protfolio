import { waitForTrue } from "../utils";
import { init, markers } from "../store/global";
import { gsap } from 'gsap'
import type { DirectiveBinding } from "vue";

export const HorizontalScroll = {
	mounted(el: HTMLElement, binding: DirectiveBinding) {
		waitForTrue(init).then(() => {

			if (el.children.length > 1) {
				console.warn('v-horizontal-scroll 指令只能包含一个子元素')
				return
			}

			const container = el.children[0] as HTMLElement

			if (!container) {
				console.warn('v-horizontal-scroll 指令需要一个子元素')
				return
			}

			// 获取配置选项，如果没有提供则使用默认值
			const options = binding.value || {}
			const {
				start = 'top top',
				scrub = true,
				pin = true,
				anticipatePin = 1,
				invalidateOnRefresh = true,
			} = options

			const tl = gsap.to(container, {
				x: () => -(container.offsetWidth - window.innerWidth),
				ease: 'none',
				scrollTrigger: {
					trigger: el,
					start,
					end: () => `+=${container.offsetWidth - window.innerWidth}`,
					scrub,
					pin,
					anticipatePin,
					invalidateOnRefresh,
					markers: markers.value,
				},
			})
		})
	}
}

export const VerticalScroll = {
	mounted(el: HTMLElement, binding: DirectiveBinding) {
		waitForTrue(init).then(() => {
			if (el.children.length > 1) {
				console.warn('v-vertical-scroll 指令只能包含一个子元素')
				return
			}

			const container = el.children[0] as HTMLElement

			if (!container) {
				console.warn('v-vertical-scroll 指令需要一个子元素')
				return
			}

			// 获取配置选项，如果没有提供则使用默认值
			const options = binding.value || {}
			const {
				start = 'top top',
				scrub = true,
				pin = true,
				anticipatePin = 1,
				invalidateOnRefresh = true,
			} = options

			const tl = gsap.to(container, {
				y: () => -(container.offsetHeight - window.innerHeight),
				ease: 'none',
				scrollTrigger: {
					trigger: el,
					start,
					end: () => `+=${container.offsetHeight - window.innerHeight}`,
					scrub,
					pin,
					anticipatePin,
					invalidateOnRefresh,
					markers: markers.value
				},
			})
		})
	}
}
