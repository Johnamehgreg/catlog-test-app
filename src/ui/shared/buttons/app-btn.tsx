import { HStack } from '@/components/ui/hstack';
import { Spinner } from '@/components/ui/spinner';
import { useHapticFeedback } from '@core/hooks/logic/use-haptic-feedback';
import { regularFontFamily, textStyles } from '@core/styles/text-style';
import { s } from '@core/utils/scale';

import React, { useMemo } from 'react';

import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

interface Props {
  onPress?: () => void;
  title?: string;
  className?: string;
  loading?: boolean;
  variant?: 'primary' | 'outline';
  isDisabled?: boolean;
  btnStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  textClassName?: string;
  loaderColor?: string;
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
}

export const AppBtn: React.FC<Props> = ({
  onPress,
  variant,
  className,
  title,
  loading,
  isDisabled,
  btnStyle,
  textStyle,
  textClassName,
  loaderColor,
  leftSection,
  rightSection,
}) => {
  const getLoaderColor = useMemo(() => {
    if (loaderColor) {
      return loaderColor;
    }
    return '#fff';
  }, [loaderColor]);
  const getStyle = () => {
    switch (variant) {
      case 'primary':
        return {
          btnContainerClass: 'bg-[rgb(51,32,137)]',
          textClassName: 'text-white',
        };
      case 'outline':
        return {
          textClassName: 'text-primary-0 ',
          btnContainerClass: 'bg-transparent border-[1px] border-primary-0  ',
        };
      default:
        return {
          btnContainerClass: 'bg-[rgb(51,32,137)]',
          textClassName: 'text-white',
        };
    }
  };

  const { onHaptic } = useHapticFeedback();

  const style = getStyle();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={isDisabled || loading}
      onPress={() => {
        onPress?.();
        onHaptic();
      }}
      className={`${style.btnContainerClass} ${
        isDisabled && '!bg-[#D0D5DD]'
      }  ${className} `}
      style={[styles.buttonContainer, btnStyle]}
    >
      {loading ? (
        <Spinner size="small" color={getLoaderColor} />
      ) : (
        <HStack
          style={{
            gap: s(8),
          }}
          className="items-center"
        >
          {leftSection}
          <Text
            numberOfLines={1}
            className={`${style.textClassName} ${
              isDisabled && 'text-[#707070]'
            } ${textClassName}`}
            style={[
              textStyles.textBase,
              textStyle,
              { fontFamily: regularFontFamily },
            ]}
          >
            {title}
          </Text>
          {rightSection}
        </HStack>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    height: s(50),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: s(20),
    borderRadius: s(12),
  },
});
