import { Box } from '@/components/ui/box';
import {
  FormControl,
  FormControlError,
  FormControlErrorText
} from '@/components/ui/form-control';
import { EyeIcon, EyeOffIcon } from '@/components/ui/icon';
import { Input, InputIcon, InputSlot } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { MoneyTextInput } from '@alexzunik/react-native-money-input';
import { IconArrowDown } from '@assets/svgs/icon-arrow-down';
import { useDarkMode } from '@core/hooks/logic/use-dark-mode';
import { regularFontFamily, textStyles } from '@core/styles/text-style';
import { s } from '@core/utils/scale';
import { Calendar } from 'lucide-react-native';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import {
  Animated,
  StyleProp,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

interface Props {
  label?: string;
  isAmount?: boolean;
  isSecure?: boolean;
  leftSection?: ReactNode;
  bottomSection?: ReactNode;
  rightSection?: ReactNode;
  subLabelSection?: ReactNode;
  placeholder?: string;
  isRequired?: boolean;
  isTextArea?: boolean;
  errorMessage?: string;
  name?: string;
  value?: string;
  maxLength?: number;
  minNumber?: number;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<ViewStyle>;
  innerInputStyle?: StyleProp<ViewStyle> | StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
  onBlur?: (e: any) => void;
  onFocus?: () => void;
  onChangeText?: (value: string) => void;
  onPress?: () => void;
  inputClassName?: string;
  touched?: any;
  isSelect?: boolean;
  isReadOnly?: boolean;
  ref?: any;
  keyboardType?:
  | 'default'
  | 'number-pad'
  | 'decimal-pad'
  | 'numeric'
  | 'email-address'
  | 'phone-pad'
  | 'url'
  | 'ascii-capable'
  | 'numbers-and-punctuation'
  | 'name-phone-pad'
  | 'twitter'
  | 'web-search';

  isDisable?: boolean;
  innerInputClassName?: string;
  labelClassName?: string;
  maximumFractionalDigits?: number;
  prefix?: string;
  isDate?: boolean;
  mask?: string;
  currency?: string
}

const AppInput: React.FC<Props> = props => {
  const {
    leftSection,
    isTextArea,
    rightSection,
    isSecure,
    placeholder,
    onBlur,
    onChangeText,
    keyboardType,
    value,
    inputStyle,
    isSelect,
    errorMessage,
    maxLength,
    isDisable,
    onFocus,
    innerInputStyle,
    touched,
    ref,
    innerInputClassName,
    inputClassName,
    labelClassName,
    onPress,
    isReadOnly,
    isAmount,
    bottomSection,
    isDate,
    mask,
    currency
  } = props;

  const [show, setShow] = React.useState(false);
  const [isFocus, setIsFocus] = useState(false);

  const { isDark } = useDarkMode();
  // Floating label animation - initialize with current value state
  const shouldShowLabel = isFocus || !!value;
  const animatedValue = useRef(
    new Animated.Value(shouldShowLabel ? 1 : 0),
  ).current;

  useEffect(() => {
    // Animate smoothly when focus or value changes
    Animated.timing(animatedValue, {
      toValue: shouldShowLabel ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [shouldShowLabel, animatedValue]);

  const labelTranslateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -s(28)],
  });

  const labelScale = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.85],
  });

  const labelOpacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const handleClick = () => {
    return onPress?.();
  };

  return (
    <Box
      style={{
        minHeight: s(50),
      }}
    >
      <FormControl
        onTouchStart={() => (!isDisable ? handleClick() : null)}
        className="h-auto "
        // isRequired={isRequired}
        isInvalid={errorMessage ? true : false}
      >


        <View style={{ position: 'relative', marginTop: s(8) }}>
          {/* Floating Label */}
          {placeholder && (
            <Animated.Text
              style={{
                position: 'absolute',
                left: s(12),
                top: isTextArea ? s(26) : s(24),
                transform: [
                  { translateY: labelTranslateY },
                  { scale: labelScale },
                ],
                fontFamily: regularFontFamily,
                opacity: shouldShowLabel ? labelOpacity : 0,
                fontSize: shouldShowLabel ? s(12) : s(14),
                color: isFocus
                  ? isDark
                    ? '#FFFFFF'
                    : 'rgb(51, 32, 137)'
                  : isDark
                    ? '#9CA3AF'
                    : '#707070',
                paddingHorizontal: s(4),
                backgroundColor: isDark ? '#000000' : '#FFFFFF',
                zIndex: 1,
              }}
              pointerEvents="none"
            >
              {placeholder}
            </Animated.Text>
          )}

          <Input
            isReadOnly={isReadOnly || isSelect}
            isDisabled={isDisable}
            style={[
              {
                height: isTextArea ? s(144) : s(50),
                borderWidth: 1,
                borderRadius: s(12),
                paddingHorizontal: s(12),
                gap: s(10),
                backgroundColor: isDark ? '#000000' : '#FFFFFF',
                borderColor: isFocus
                  ? isDark
                    ? '#FFFFFF'
                    : 'rgb(51, 32, 137)'
                  : isDark
                    ? '#374151'
                    : '#E5E7EB',
              },
              inputStyle,
            ]}
            className={`app-input ${inputClassName} 
            ${isFocus ? '!border-primary-0 dark:!border-primary-0' : 'border-outline-300 dark:border-outline-700'}
            `}
          >
            {leftSection && <InputSlot>{leftSection}</InputSlot>}
            {
              currency && (
                <InputSlot>
                  <Box style={{
                    minHeight: s(50),
                  }} className='currency-card'>
                    <Text className='text-[#656565] dark:text-[#dcdcdc]' style={textStyles.textSm}>
                      {currency}
                    </Text>
                  </Box>
                </InputSlot>
              )
            }
            {isAmount && (
              <MoneyTextInput
                keyboardType={keyboardType || 'default'}
                returnKeyType="done"
                readOnly={isReadOnly || isDate}
                selectionColor="white"
                onBlur={onBlur}
                style={[
                  textStyles.textSm,
                  innerInputStyle,
                  {
                    minHeight: isTextArea ? s(144) : s(50),
                    paddingVertical: isTextArea ? s(12) : 0,
                  },
                ]}
                className={`border-none outline-none default-text   flex-1 ${isTextArea ? '' : '!line-clamp-1'} ${innerInputClassName}`}
                onChangeText={(_, extracted) => {
                  onChangeText?.(extracted as string);
                }}
                placeholder="0.00"
                groupingSeparator={','}
                fractionSeparator="."
              />
            )}

            {!isAmount && (
              <TextInput
                returnKeyType="done"
                ref={ref}
                readOnly={isReadOnly || isSelect || isDate}
                placeholder={shouldShowLabel ? '' : placeholder}
                placeholderTextColor="#9CA3AF"
                value={value}
                onBlur={e => {
                  setIsFocus(false);
                  onBlur?.(e);
                }}
                onFocus={() => {
                  setIsFocus(true);
                  onFocus?.();
                }}
                numberOfLines={isTextArea ? 10 : 1}
                keyboardType={keyboardType || 'default'}
                secureTextEntry={show && isSecure}
                maxLength={maxLength}
                multiline={isTextArea}
                textAlignVertical={isTextArea ? 'top' : 'center'}
                onChangeText={text => {
                  onChangeText?.(text);
                }}
                style={[
                  textStyles.textSm,
                  innerInputStyle,
                  {
                    minHeight: isTextArea ? s(144) : s(50),
                    paddingVertical: isTextArea ? s(12) : 0,
                    textAlignVertical: isTextArea ? 'top' : 'center',
                  },
                ]}
                className={`border-none outline-none  default-text  flex-1  ${isTextArea ? '' : '!line-clamp-1'} ${innerInputClassName}`}
              />
            )}

            {rightSection && <InputSlot>{rightSection}</InputSlot>}

            {isSecure && (
              <InputSlot className="pr-3" onPress={() => setShow(!show)}>
                <InputIcon
                  color="rgb(51, 32, 137)"
                  as={show ? EyeIcon : EyeOffIcon}
                />
              </InputSlot>
            )}
            {isDate && (
              <InputSlot
                style={{}}
                onPress={() => setShow(!show)}
                className="rounded-full p-2 bg-background-gray1"
              >
                <Calendar size={s(18)} color={isDark ? '#FFFFFF' : '#747478'} />
              </InputSlot>
            )}
            {isSelect && (
              <InputSlot
                style={{}}
                onPress={() => setShow(!show)}
                className="rounded-full bg-background-gray1"
              >
                <IconArrowDown
                  width={s(28)}
                  height={s(28)}
                  fill={isDark ? '#FFFFFF' : '#747478'}
                />
              </InputSlot>
            )}
          </Input>
        </View>

        {bottomSection && bottomSection}

        {touched && errorMessage ? (
          <FormControlError className="gap-2 my-3">
            <FormControlErrorText
              style={[textStyles.textSm]}
              className="flex-1 text-error-700  "
            >
              {errorMessage}
            </FormControlErrorText>
          </FormControlError>
        ) : (
          <></>
        )}
      </FormControl>
    </Box>
  );
};

export default AppInput;
