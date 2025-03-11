const { getDefaultConfig } = require('./$node_modules/expo/metro-config.js');
const { withNativeWind } = require('./$node_modules/nativewind/dist/metro/index.js');

// eslint-disable-next-line no-undef
const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: './global.css' });
