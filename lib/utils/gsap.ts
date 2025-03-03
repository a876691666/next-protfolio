import gsap from 'gsap'

interface AnimationConfig {
  duration?: number
  ease?: string
  delay?: number
}

export class GsapAnimation {
  /**
   * 淡入动画
   * @param element DOM元素或选择器
   * @param config 动画配置
   */
  static fadeIn(element: Element | string, config: AnimationConfig = {}) {
    return gsap.to(element, {
      opacity: 1,
      duration: config.duration || 0.5,
      ease: config.ease || 'power2.out',
      delay: config.delay || 0
    })
  }

  /**
   * 淡出动画
   * @param element DOM元素或选择器
   * @param config 动画配置
   */
  static fadeOut(element: Element | string, config: AnimationConfig = {}) {
    return gsap.to(element, {
      opacity: 0,
      duration: config.duration || 0.5,
      ease: config.ease || 'power2.out',
      delay: config.delay || 0
    })
  }

  /**
   * 从下方滑入
   * @param element DOM元素或选择器
   * @param config 动画配置
   */
  static slideInUp(element: Element | string, config: AnimationConfig = {}) {
    return gsap.from(element, {
      y: 50,
      opacity: 0,
      duration: config.duration || 0.8,
      ease: config.ease || 'power2.out',
      delay: config.delay || 0
    })
  }

  /**
   * 从上方滑入
   * @param element DOM元素或选择器
   * @param config 动画配置
   */
  static slideInDown(element: Element | string, config: AnimationConfig = {}) {
    return gsap.from(element, {
      y: -50,
      opacity: 0,
      duration: config.duration || 0.8,
      ease: config.ease || 'power2.out',
      delay: config.delay || 0
    })
  }

  /**
   * 创建时间轴动画
   * @returns GSAP时间轴实例
   */
  static createTimeline() {
    return gsap.timeline()
  }

  /**
   * 自定义动画
   * @param element DOM元素或选择器
   * @param props 动画属性
   * @param config 动画配置
   */
  static animate(
    element: Element | string,
    props: gsap.TweenVars,
    config: AnimationConfig = {}
  ) {
    return gsap.to(element, {
      ...props,
      duration: config.duration || 0.5,
      ease: config.ease || 'power2.out',
      delay: config.delay || 0
    })
  }
} 