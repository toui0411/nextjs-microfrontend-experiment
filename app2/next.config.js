const { NextFederationPlugin } = require('@module-federation/nextjs-mf');
const TarWebpackPlugin = require('tar-webpack-plugin').default;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: 'build',
  webpack(config, options) {
    const { isServer } = options;
    config.plugins.push(
      new NextFederationPlugin({
        name: 'next2',
        remotes: {
          next1: `next1@http://localhost:3000/_next/static/${
            isServer ? 'ssr' : 'chunks'
          }/remoteEntry.js`,
        },
        filename: 'static/chunks/remoteEntry.js',
        exposes: {
          './app2Message': './components/App2Message',
        },
        shared: {
          // whatever else
        },
      })
    );
    config.plugins.push(
      new TarWebpackPlugin({
        action: 'c',
        file: 'public/next2-dts.tgz',
        cwd: '.wp_federation',
        fileList: ['next2'],
      }),
    );
    config.module.rules.push({
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'dts-loader',
          options: {
            name: 'next2', // The name configured in ModuleFederationPlugin
            exposes: {
              './index': './components/App2Message', //これがないと host の tsconfig でエラー
              './app2Message': './components/App2Message',
            },
            typesOutputDir: '.wp_federation', // Optional, default is '.wp_federation'
          },
        },
      ],
    });
    return config;
  },
};

module.exports = nextConfig;
