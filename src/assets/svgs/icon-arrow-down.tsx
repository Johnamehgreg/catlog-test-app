import { s } from '@core/utils/scale';
import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

export const IconArrowDown = (props: SvgProps) => (
  <Svg
    width={props.width || s(30)}
    height={props.height || s(29)}
    viewBox="0 0 30 29"
    fill="none"
    strokeWidth={0.5}
    {...props}
  >
    <Path
      d="M15.0705 18.8408L22.2209 11.6892L20.5386 10.0068L15.0657 15.4798L9.60111 10.0068L7.91878 11.6892L15.0705 18.8408Z"
      fill={props.fill || 'white'}
    />
  </Svg>
);
