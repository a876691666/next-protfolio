import { install } from './install'

// 导出所有组件
export * from './components'

// 导出所有工具函数
export * from './utils'

// 导出所有指令
export * from './directives'

// 导出所有组合式函数
export * from './composables'

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
    PageBase: typeof import('./components')['PageBase']
    // 在这里添加其他组件的类型声明
  }

  export interface ComponentCustomProperties {
    vGsap: typeof import('./directives')['vGsap']
  }
} 