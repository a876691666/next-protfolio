import type { App } from "vue";
import * as coreComponents from "./core";
import { vGsap, vGsapStyle, vGsapAttrs, vGsapProps } from "./directives";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export function install(app: App) {
  gsap.registerPlugin(ScrollTrigger);

  // 注册所有组件
  Object.entries(coreComponents).forEach(([name, component]) => {
    app.component(name, component);
  });

  // 注册所有指令
  app.directive("gsap", vGsap);
  app.directive("gsap-style", vGsapStyle);
  app.directive("gsap-attrs", vGsapAttrs);
  app.directive("gsap-props", vGsapProps);

  return app;
}
