require('dotenv').config();
const _env = require('dotenv-webpack');
const path = require('path');
const withPlugins = require('next-compose-plugins');

const getBuildConfig = (...args) => {
    const nextConfig = {
        webpack(config) {
            config.module.rules.push({});
            config.plugins = config.plugins || [];
            config.plugins = [
                ...config.plugins,

                // Read the .env file
                new _env({
                    path: path.join(__dirname, '.env'),
                    systemvars: true,
                }),
            ];
            return config;
        },
        typescript: {
            ignoreBuildErrors: true,
        },
        reactStrictMode: true,
        i18n: {
            locales: ['en', 'jp'],
            defaultLocale: 'jp',
            localeDetection: false,
        },
    };
    return withPlugins([], nextConfig)(...args);
};

module.exports = (phase, ...rest) => {
    return getBuildConfig(phase, ...rest);
};
