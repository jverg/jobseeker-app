/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');
const withAntdLess = require('next-plugin-antd-less');
const nextComposePlugins = require('next-compose-plugins');
const { withPlugins } = nextComposePlugins.extend(() => ({}));

module.exports  = withPlugins(
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
        i18n,
        webpack(config) {
            const webpack = require('webpack');
            config.module.rules.push({
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            });
            config.plugins.push(new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en|el/));
            return config;
        },
    },
);
