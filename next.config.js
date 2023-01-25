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
        },
    },
);

module.exports = moduleExports;
