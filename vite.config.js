/// <reference types="vitest" />
import fs from 'node:fs';
import path from 'node:path';
import { builtinModules } from 'node:module';
import dts from 'vite-plugin-dts';
import { defineConfig } from 'vite';

const PACKAGE_ROOT = process.cwd();
const packageJson = JSON.parse(
  fs.readFileSync(path.resolve(PACKAGE_ROOT, 'package.json'), 'utf8'),
);
const externalPackages = [
  ...Object.keys(packageJson.dependencies || {}),
  ...Object.keys(packageJson.peerDependencies || {}),
  ...Object.keys(packageJson.optionalDependencies || {}),
];
const externalModules = [
  ...externalPackages,
  ...builtinModules,
  ...builtinModules.map((moduleName) => `node:${moduleName}`),
];

function isExternal(id) {
  return externalModules.some((dependency) => id === dependency || id.startsWith(`${dependency}/`));
}

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'docx-math-converter',
      formats: ['esm', 'cjs'],
      fileName: (format) => `docx-math-converter.${format}.js`,
    },
    minify: false,
    rollupOptions: {
      external: isExternal,
    },
  },
  test: {
    includeSource: ['src/**/*.{js,ts}'],
  },
  define: {
    'import.meta.vitest': 'undefined',
  },
  plugins: [
    dts({ rollupTypes: true }),
  ],
});
