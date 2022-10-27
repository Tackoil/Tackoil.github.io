import { defineUserConfig } from 'vuepress';

import { anemosTheme } from "vuepress-theme-anemos";

export default defineUserConfig({
    title: "Tackoil's WebSite",
    theme: anemosTheme({
        navs: [
            { name: '首页', path: "/", icon: "icon-home" },
            // { name: '分类', path: "/categories", icon: "icon-appstore"},
            { name: '关于', path: "/about", icon: "icon-user" },
            { name: '友链', path: "/links", icon: "icon-link" },
        ],
        subtitle: "We're here."
    }),
    head: [
        ['link', { rel: 'icon', href: '/assets/avatar.png' }],
        ['link', { rel: 'apple-touch-icon', href: `/assets/avatar.png` }],
    ],
})
