const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');
const { withNativeWind } = require('nativewind/metro');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  resolver: {
    extraNodeModules: {
      '@ui': path.resolve(__dirname, 'src/ui'),
      '@core': path.resolve(__dirname, 'src/core'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@': path.resolve(__dirname, './'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-native'),
    },
  },
};

const mergedConfig = mergeConfig(getDefaultConfig(__dirname), config);

module.exports = withNativeWind(mergedConfig, { input: './global.css' });
