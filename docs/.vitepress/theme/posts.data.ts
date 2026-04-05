import { createAnemosPostLoader } from "vitepress-theme-anemos";
import type { AnemosPost } from "vitepress-theme-anemos";

declare const data: AnemosPost[];
export { data };

export default createAnemosPostLoader("**/*.md");
