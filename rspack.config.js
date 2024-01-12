const rspack = require("@rspack/core");
/** @type {import('@rspack/cli').Configuration} */
const config = {
  entry: {
    // otherLargeEntry: '...',
    main: "./src/index.tsx"
  },
  output: {
    path: 'build',
    publicPath: `//localhost:8083/assets/rspack/`,
    filename: '[name].rspack_bundle.js',
  },
  target: 'web',
  experiments: {
    rspackFuture: {
      disableApplyEntryLazily: true,
    },
  },
  resolve: {
    // Defaults with custom 'esnext' field
    mainFields: ['esnext', 'browser', 'module', 'main'],
    // Do not resolve symlinks to their real path
    symlinks: false,
    // comment out for demo purposes
    // alias: {
    //   client: 'client',
    //   store_app: path.resolve('client', 'disorganized', 'store_app'),
    //   history: path.resolve('.', 'app', 'assets', 'javascripts', 'vendor', 'history.js'),
    //   'react-router': path.resolve(
    //     '.',
    //     'app',
    //     'assets',
    //     'javascripts',
    //     'vendor',
    //     'react-router.js'
    //   ),
    //   'react-router-dom': path.resolve(
    //     '.',
    //     'app',
    //     'assets',
    //     'javascripts',
    //     'vendor',
    //     'react-router-dom.js'
    //   ),
    //   store$: 'store/dist/store.modern',
    // },
    // modules: [
    //   'client/disorganized,
    //   'client,
    //   path.resolve('.', 'app', 'assets', 'fonts'),
    //   path.resolve('.', 'app', 'assets', 'javascripts'),
    //   path.resolve('.', 'app', 'assets', 'images'),
    //   path.resolve('javascript-libs/modules'),
    //   path.resolve('javascript-libs/packages'),
    //   'node_modules',
    // ],
    extensions: [
      // mjs
      '.mjs', // https://github.com/graphql/graphql-js/issues/1272#issuecomment-377384574

      // JSX
      '.jsx',

      // javascript
      '.js',
      '.json',

      // typescript
      '.ts',
      '.tsx',

      // images
      '.png',
      '.svg',
      '.jpg',
      '.gif',
      '.jpeg',

      // fonts
      '.woff',
      '.woff2',
      '.eot',
      '.ttf',
      '.otf',

      // svg animations
      '.lottie',
    ],
  },
  module: {
    rules: [
      {
        test: /\.tsx$/,
        use: {
          loader: 'builtin:swc-loader',
          options: {
            sourceMap: true,
            jsc: {
              parser: {
                syntax: 'typescript',
                jsx: true,
                decorators: true,
              },
              externalHelpers: true,
              preserveAllComments: false,
              transform: {
                legacyDecorator: true,
                react: {
                  runtime: 'automatic',
                  throwIfNamespace: true,
                  useBuiltins: false,
                },
              },
            },
            rspackExperiments: {
              emotion: true,
            },
          },
        },
        type: 'javascript/auto',
      },
      {
        test: /\.jsx$/,
        use: {
          loader: 'builtin:swc-loader',
          options: {
            sourceMap: true,
            jsc: {
              parser: {
                syntax: 'ecmascript',
                jsx: true,
                decorators: true,
              },
              externalHelpers: true,
              preserveAllComments: false,
              transform: {
                legacyDecorator: true,
                react: {
                  runtime: 'automatic',
                  throwIfNamespace: true,
                  useBuiltins: false,
                },
              },
            },
            rspackExperiments: {
              emotion: true,
            },
          },
        },
        type: 'javascript/auto',
      },
      {
        test: /\.ts$/,
        use: {
          loader: 'builtin:swc-loader',
          options: {
            sourceMap: true,
            jsc: {
              parser: {
                syntax: 'typescript',
              },
              externalHelpers: true,
              preserveAllComments: false,
            },
            rspackExperiments: {
              emotion: true,
            },
          },
        },
        type: 'javascript/auto',
      },
      {
        test: /\.js$/,
        use: {
          loader: 'builtin:swc-loader',
          options: {
            sourceMap: true,
            jsc: {
              parser: {
                syntax: 'ecmascript',
                decorators: true,
              },
              externalHelpers: true,
              preserveAllComments: false,
              transform: {
                legacyDecorator: true,
              },
            },
            rspackExperiments: {
              emotion: true,
            },
          },
        },
        type: 'javascript/auto',
      },
      {
        test: new RegExp(
          '.(png|svg|jpg|jpeg|gif|woff|woff2|eot|ttf|otf|css|ico|xml|lottie)$'
        ),
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]-[hash].[ext]',
            },
          },
        ],
        // comment out for demo
        // exclude: /node_modules(?!\/snacks)/,
        // include: [
        //   CLIENT_DISORGANIZED_ROOT,
        //   CLIENT_ROOT,
        //   LEGACY_CONTENT_ROOT,
        //   JAVASCRIPT_LIB_MODULES,
        //   path.resolve(APP_ROOT, 'app', 'assets', 'images'),
        //   path.resolve(APP_ROOT, 'app', 'assets', 'fonts'),
        //   path.resolve('node_modules', 'ic-snacks'),
        // ],
      },
    ]
  },
  optimization: {
    moduleIds: 'deterministic',
    chunkIds: 'deterministic',
    splitChunks: {
      chunks: 'all', // This indicates which chunks will be selected for optimization.
      maxAsyncRequests: 5, // Maximum number of parallel requests when on-demand loading.
      maxInitialRequests: 5, // Maximum number of parallel requests at an entry point.
      minChunks: 1, // Minimum number of chunks that must share a module before splitting.
      minSize: 50000, // Minimum size, in bytes, for a chunk to be generated.
      name: false,
    },
  },
};
module.exports = config;