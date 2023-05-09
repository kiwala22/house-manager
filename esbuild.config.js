const typescriptPlugin = require("esbuild-plugin-tsc").default;

module.exports = {
  entryPoints: ["./app/javascript/application.tsx"],
  bundle: true,
  outfile: "./app/assets/builds/application.js",
  plugins: [typescriptPlugin()],
  target: "es2020",
};
