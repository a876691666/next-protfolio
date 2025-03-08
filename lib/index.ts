import { install } from './install'
import { SimpleHorizontalScroll, SimpleVerticalScroll, GsapEl } from './components'

// 导出所有组件
export * from './core'

// 导出所有工具函数
export * from './utils'

// 导出所有辅助函数
export * from './helper'

// 导出版本信息
export const version = '0.0.0'

export default {
  install,
  version
}


// 声明模块扩展
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    ScrollBase: typeof import("./core")["ScrollBase"];
    SimpleHorizontalScroll: typeof SimpleHorizontalScroll;
    SimpleVerticalScroll: typeof SimpleVerticalScroll;
    GsapEl: typeof GsapEl;
  }
} 