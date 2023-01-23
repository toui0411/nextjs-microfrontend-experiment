const { NextFederationPlugin } = require('@module-federation/nextjs-mf');
const WebpackRemoteTypesPlugin = require('webpack-remote-types-plugin').default;

/** @type {import('next').NextConfig} */
const path = require('path');
const nextConfig = {
  reactStrictMode: true,
  distDir: 'build',
  webpack(config, options) {
    const { isServer } = options;
    config.plugins.push(
      new NextFederationPlugin({
        name: 'next1',
        filename: 'static/chunks/remoteEntry.js',
        remotes: {
          next2: `next2@http://localhost:3001/_next/static/${
            isServer ? 'ssr' : 'chunks'
          }/remoteEntry.js`,
        },
      })
    );
    config.plugins.push(
      new WebpackRemoteTypesPlugin({
        remotes: {
          remote: 'next2@http://localhost:3001/',
        },
        outputDir: 'node_modules/@types', // supports [name] as the remote name
        remoteFileName: 'next2-dts.tgz', // default filename is [name]-dts.tgz where [name] is the remote name, for example, `app` with the above setup
      }),
    );

    return config;
  },
};

module.exports = nextConfig;
