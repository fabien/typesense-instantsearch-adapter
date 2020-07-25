import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import { uglify } from "rollup-plugin-uglify";

let name = "dist/typesense-instantsearch-adapter.js";

const plugins = [commonjs(), resolve(), babel({ babelHelpers: "bundled" })];

if (!process.env.DEVELOPMENT) {
  plugins.push(uglify());
} else {
  name = "dist/typesense-instantsearch-adapter.development.js";
}

const config = {
  input: "src/TypesenseInstantsearchAdapter.js",
  output: {
    file: name,
    format: "umd",
    name: "TypesenseInstantsearchAdapter"
  },
  plugins,
  external: ["typesense"]
};

export default config;
