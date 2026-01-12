import { IconSearch } from '@assets/svgs/icon-search';
import { colors } from '@core/utils/app-config';
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import AppInput from './app-input';

export const SearchInput = ({
  value,
  onChangeText,
  placeholder,
  style,
}: {
  value?: string;
  onChangeText?: (val: string) => void;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
}) => {
  return (
    <AppInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      style={style}
      rightSection={<IconSearch fill={colors.brand['primary-100']} />}
    />

  );
};
