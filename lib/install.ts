import type { App } from 'vue'
import * as components from './components'
import { vGsap } from './directives'

export function install(app: App) {
  // 注册所有组件
  Object.entries(components).forEach(([name, component]) => {
    app.component(name, component)
  })

  // 注册所有指令
  app.directive('gsap', vGsap)

  return app
} 