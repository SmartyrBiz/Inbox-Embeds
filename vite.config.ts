import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import postcss from "postcss";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

// Scopes all generated CSS to [data-embed] so embed styles don't leak to the host page.
// - Bare utilities like .flex, .grid, .container become [data-embed] .flex etc.
// - :root/:host CSS variable blocks are moved onto [data-embed] (still inherited by children)
// - @keyframes and @font-face rules are left untouched
const embedScopePlugin = {
  postcssPlugin: "embed-scope",
  Rule(rule: any) {
    let node = rule.parent;
    while (node) {
      if (
        node.type === "atrule" &&
        /^(-webkit-)?keyframes$/i.test(node.name)
      ) {
        return;
      }
      node = node.parent;
    }
    rule.selectors = rule.selectors.map((sel: string) => {
      const s = sel.trim();
      if (s === ":root" || s === ":host") return "[data-embed]";
      if (s.startsWith("[data-embed]")) return sel;
      return `[data-embed] ${sel}`;
    });
  },
};

function scopeEmbedCSS(): Plugin {
  return {
    name: "scope-embed-css",
    apply: "build",
    async writeBundle(options) {
      const outDir = options.dir ?? "dist";
      const cssPath = join(outDir, "index.css");
      if (!existsSync(cssPath)) return;
      const css = readFileSync(cssPath, "utf8");
      const result = await postcss([embedScopePlugin]).process(css, {
        from: undefined,
      });
      writeFileSync(cssPath, result.css);
    },
  };
}

export default defineConfig({
  define: {
    "process.env.NODE_ENV": '"production"',
  },
  plugins: [react(), tailwindcss(), scopeEmbedCSS()],
  build: {
    outDir: "dist",
    lib: {
      entry: "src/index.tsx",
      formats: ["iife"],
      name: "SmartyrEmbeds",
      fileName: () => "index.js",
    },
    rollupOptions: {
      output: {
        assetFileNames: "index[extname]",
      },
    },
    sourcemap: false,
  },
});
