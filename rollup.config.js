import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

const umd = {
  format: 'umd',
  name: 'A11yTabs',
  exports: 'default',
};
const es = {
  format: 'es',
};
const minify = {
  plugins: [terser()],
  banner: () => `/*! a11y-tabs ${pkg.version} — © 2021 by Rob Levin */`,
};

export default {
  input: 'a11y-tabs.js',
  output: [
    { file: 'dist/a11y-tabs.js', ...umd },
    { file: 'dist/a11y-tabs.esm.js', ...es },
    { file: 'dist/a11y-tabs.min.js', ...umd, ...minify },
    { file: 'dist/a11y-tabs.esm.min.js', ...es, ...minify },
    { file: 'cypress/fixtures/a11y-tabs.js', ...umd },
  ],
  plugins: [nodeResolve(), commonjs({ include: 'node_modules/**' })],
};
