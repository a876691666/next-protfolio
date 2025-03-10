import type { App } from "vue";
import * as coreComponents from "./core";
import * as components from "./components";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export function install(app: App) {
  gsap.registerPlugin(ScrollTrigger);

  // 注册所有组件
  Object.entries(coreComponents).forEach(([name, component]) => {
    app.component(name, component);
  });

  Object.entries(components).forEach(([name, component]) => {
    app.component(name, component);
  });

  return app;
}
