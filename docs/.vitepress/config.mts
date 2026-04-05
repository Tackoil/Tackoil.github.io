import {
  defineAnemosConfig,
  defineAnemosVitePressConfig,
} from "vitepress-theme-anemos";

export default defineAnemosVitePressConfig({
  title: "Tackoil's Website",
  description: "We're here.",
  vite: {
    ssr: {
      noExternal: ["vitepress-theme-anemos"],
    },
  },
  head: [
    ["link", { rel: "icon", href: "/assets/avatar.png" }],
    ["link", { rel: "apple-touch-icon", href: "/assets/avatar.png" }],
  ],
  themeConfig: defineAnemosConfig({
    navs: [
      { name: "首页", path: "/", icon: "icon-home" },
      { name: "关于", path: "/about", icon: "icon-user" },
      { name: "友链", path: "/links", icon: "icon-link" },
    ],
    subtitle: "We're here.",
  }),
});
