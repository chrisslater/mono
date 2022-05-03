import path from "path"
import { fileURLToPath } from "url"
import nodeExternals from 'webpack-node-externals'
import webpack from 'webpack';
import { RunScriptWebpackPlugin } from 'run-script-webpack-plugin';
import { WebpackPnpExternals } from 'webpack-pnp-externals'


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const outputDir = path.resolve(__dirname, 'dist')
const outputFilename = 'bundle.js'

export default {
    watch: true,
    watchOptions: {
      aggregateTimeout: 200,
      poll: 1000,
    },
    mode: "development",
    devtool: 'inline-source-map',
    target: 'node',
    // entry: ['webpack/hot/poll?100', './src/main.ts'],

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
        "@snapperfish/entities": path.join(__dirname, '../../packages/entities/ts'),
      },
      extensions: [".ts"]
    },

    externals: [
      WebpackPnpExternals()
    ],

    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.WatchIgnorePlugin({
        paths: [/\.js$/, /\.d\.ts$/],
      }),
      new RunScriptWebpackPlugin({ 
        name: outputFilename,
        nodeArgs: ['--inspect'] 
      }),
    ],

    // experiments: {
    //   outputModule: true,
    // },

    output: {
      path: outputDir,
      filename: outputFilename,
      // library: { type: 'module' },
      chunkFormat: false,
      // module: true,
    },
  };