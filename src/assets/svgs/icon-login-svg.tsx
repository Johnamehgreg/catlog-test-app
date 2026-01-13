import { s } from '@core/utils/scale';
import * as React from 'react';
import { Image, ImageProps, View } from 'react-native';

interface IconLoginSvgProps {
  width?: number;
  height?: number;
  style?: ImageProps['style'];
}

export const IconLoginSvg = ({ width, height, style }: IconLoginSvgProps) => {
  const iconSize = width || s(120);

  return (
    <View style={[{ width: iconSize, height: iconSize }, style]}>
      <Image
        source={require('./LOGIN.svg')}
        style={{
          width: iconSize,
          height: iconSize,
        }}
        resizeMode="contain"
      />
    </View>
  );
};
