/** @type {import('next').NextConfig} */
const withAntdLess = require('next-plugin-antd-less');
const withPlugins = require('next-compose-plugins');

const moduleExports = withPlugins(
    [
        [
            withAntdLess,
        ],
    ],
    {
        publicRuntimeConfig: {
            FRONTEND_URL: process.env.FRONTEND_URL,
            BACKEND_URL: process.env.BACKEND_URL,
        },
        webpack(config) {
            const webpack = require('webpack');
            config.module.rules.push({
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            });
            config.plugins.push(new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en|el/));
            return config;
        },
        eslint: {
            ignoreDuringBuilds: true,
        },
    },
);

module.exports = moduleExports;
