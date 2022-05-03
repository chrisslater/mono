import path from "path"
import { fileURLToPath } from "url"
import nodeExternals from 'webpack-node-externals'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default {
    mode: "development",
    devtool: 'inline-source-map',
  entry: './src/main.ts',
  module: {
    rules: [{ 
        test: /\.ts$/, 
        loader: 'ts-loader', 
        exclude: /node_modules/,
        options: {
            // configFile: './tsconfig.build.json', 
            projectReferences: true,
        } 
    }],
  },
  resolve: {
    alias: {
      "@snapperfish/entities": '../../../packages/entities/ts'
    },
    extensions: [".ts"]
  },

  externals: [
    nodeExternals(),
  ],

  experiments: {
    outputModule: true,
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    // library: { type: 'module' },
    // chunkFormat: "module"
    module: true,
  },
  target: 'es2020'
};