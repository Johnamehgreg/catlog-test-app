import { s } from '@core/utils/scale';
import * as React from 'react';
import Svg, { Circle, Path, Rect, SvgProps } from 'react-native-svg';

export const IconLogin = (props: SvgProps) => {
  const fillColor = props.fill || 'rgb(51, 32, 137)';
  const size = props.width || s(120);

  return (
    <Svg width={size} height={size} viewBox="0 0 80 80" fill="none" {...props}>
      <Rect width={80} height={80} fill={fillColor} rx={16} />
      {/* User profile circle head */}
      <Circle cx="40" cy="28" r="12" fill="white" />
      {/* User profile body */}
      <Path
        d="M16 70C16 60 22 52 30 52H50C58 52 64 60 64 70V80H16V70Z"
        fill="white"
      />
      {/* Key - overlapping lower right */}
      {/* Key head (circular part) */}
      <Circle cx="58" cy="58" r="7" fill={fillColor} />
      {/* Key hole in the head */}
      <Circle cx="58" cy="58" r="3" fill="white" />
      {/* Key shaft */}
      <Path d="M65 58L70 58L70 62L65 62L65 58Z" fill={fillColor} />
      {/* Key teeth */}
      <Path d="M70 62L70 66L67 66L67 64L70 64L70 62Z" fill={fillColor} />
    </Svg>
  );
};
