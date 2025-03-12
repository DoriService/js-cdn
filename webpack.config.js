import path from "path";
import TerserPlugin from "terser-webpack-plugin";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Get the directory name from the module URL
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  entry: "./src/wrapper.js",
  output: {
    filename: "script.js",
    path: path.resolve(__dirname, "dist"),
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
};
