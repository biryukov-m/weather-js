const path = require('path');

module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  // mode: 'production',
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist') // Serve files from the 'dist' directory
    },
    watchFiles: ['src/**/*.*'], // Watch SCSS files
    open: true
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: 'ts-loader'
      },
      // for styling in scss
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      // for tailwind init in css
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(jpg|png|svg|gif)$/,
        type: 'asset/inline'
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
};
