import { createGsapTimeline } from "../utils"
import type { GsapType } from "../helper"
import { shallowRef, type ShallowRef } from "vue"

export const useGsap = <T extends Record<string, any>>(keyframe: GsapType, options: ScrollTrigger.Vars, customReactiveState?: ShallowRef<T>) => {
	const reactiveState = customReactiveState || shallowRef<T>({} as T)

	createGsapTimeline(keyframe, {
		updateCallback: (progress: number, state) => {
			reactiveState.value = { ...state } as T
		}, options
	})

	return reactiveState
}
