import * as React from 'react';
import Svg, {Line, SvgProps} from 'react-native-svg';
export const IconNotFound = (props: SvgProps) => (
  <Svg width={15} height={8} viewBox="0 0 15 8" fill="none" {...props}>
    <Line
      x1={1}
      y1={7}
      x2={14}
      y2={7}
      stroke="#A0A0A0"
      strokeWidth={2}
      strokeLinecap="round"
    />
    <Line
      x1={4}
      y1={4}
      x2={14}
      y2={4}
      stroke="#A0A0A0"
      strokeWidth={2}
      strokeLinecap="round"
    />
    <Line
      x1={10.003}
      y1={1.00304}
      x2={14.003}
      y2={1.01516}
      stroke="#A0A0A0"
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Svg>
);
