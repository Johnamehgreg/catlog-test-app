import { Text } from '@/components/ui/text';
import { IconNotFound } from '@assets/svgs/icon-not-found';
import { textStyles } from '@core/styles/text-style';
import { s } from '@core/utils/scale';
import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

interface Props {
  style?: StyleProp<ViewStyle>;
  message?: string;
}

export const NotItemFound: React.FC<Props> = ({message, style}) => {
  if (message)
    return (
      <View
        style={[
          style,
          {
            minHeight: s(130),
            gap: s(5),
          },
        ]}
        className="flex-row items-center justify-center ">
        <IconNotFound />
        <Text
          className="text-black dark:text-[#A0A0A0]"
          style={[{textAlign: 'center'}, textStyles.textXs]}>
          {message}
        </Text>
      </View>
    );
  return null;
};
