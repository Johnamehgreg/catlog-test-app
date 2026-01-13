import { useHapticFeedback } from '@core/hooks/logic/use-haptic-feedback';
import { mediumFontFamily, textStyles } from '@core/styles/text-style';
import { s } from '@core/utils/scale';
import { TabItem } from '@core/utils/types';
import React, { useState } from 'react';
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

interface TabProps {
  tabs: TabItem[];
  variant?: 'primary' | 'secondary' | 'underline' | 'pill' | 'unstyled';
  activeTab?: string;
  onTabChange?: (value: string) => void;
  className?: string;
  tabClassName?: string;
  activeTabClassName?: string;
  inactiveTabClassName?: string;
  textClassName?: string;
  activeTextClassName?: string;
  inactiveTextClassName?: string;
  iconClassName?: string;
  activeIconClassName?: string;
  inactiveIconClassName?: string;
  spacing?: number;
  tabWrapperClassName?: string;
  wrapperStyle?: StyleProp<ViewStyle>;
  tabStyle?: StyleProp<ViewStyle>;
  activeTabStyle?: StyleProp<ViewStyle>;
  inactiveTabStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  activeTextStyle?: StyleProp<TextStyle>;
  inactiveTextStyle?: StyleProp<TextStyle>;
  activeIndicator?: React.ReactNode;
}

const AppTab = ({
  tabs,
  variant = 'primary',
  activeTab: controlledActiveTab,
  onTabChange,
  className = '',
  tabClassName = '',
  activeTabClassName = '',
  inactiveTabClassName = '',
  textClassName = '',
  activeTextClassName = '',
  inactiveTextClassName = '',
  iconClassName = '',
  activeIconClassName = '',
  inactiveIconClassName = '',
  tabWrapperClassName = '',
  spacing = 8,
  wrapperStyle,
  tabStyle,
  activeTabStyle,
  inactiveTabStyle,
  textStyle,
  activeTextStyle,
  inactiveTextStyle,
  activeIndicator,
}: TabProps) => {
  const [internalActiveTab, setInternalActiveTab] = useState(tabs[0]?.value);
  const isControlled = controlledActiveTab !== undefined;
  const activeTab = isControlled ? controlledActiveTab : internalActiveTab;

  const { onHaptic } = useHapticFeedback();
  const handlePress = (value: string) => {
    onHaptic();
    if (!isControlled) {
      setInternalActiveTab(value);
    }
    onTabChange?.(value);
  };

  const getVariantClasses = (isActive: boolean) => {
    switch (variant) {
      case 'primary':
        return {
          tab: `rounded-full ${
            isActive ? 'secondary-bg ' : 'bg-background-gray1'
          } ${tabClassName} ${
            isActive ? activeTabClassName : inactiveTabClassName
          }`,
          text: `${isActive ? ' text-primary-0' : ' '} ${textClassName} ${
            isActive ? activeTextClassName : inactiveTextClassName
          }`,
          icon: `${
            isActive ? 'text-white' : 'text-gray-500'
          } ${iconClassName} ${
            isActive ? activeIconClassName : inactiveIconClassName
          }`,
        };
      case 'secondary':
        return {
          tab: `rounded-full border ${
            isActive ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
          } ${tabClassName} ${
            isActive ? activeTabClassName : inactiveTabClassName
          }`,
          text: `${
            isActive ? 'text-blue-600' : 'text-gray-600'
          } ${textClassName} ${
            isActive ? activeTextClassName : inactiveTextClassName
          }`,
          icon: `${
            isActive ? 'text-blue-500' : 'text-gray-400'
          } ${iconClassName} ${
            isActive ? activeIconClassName : inactiveIconClassName
          }`,
        };
      case 'underline':
        return {
          tab: `border-b-2 ${
            isActive ? 'border-blue-500' : 'border-transparent'
          } ${tabClassName} ${
            isActive ? activeTabClassName : inactiveTabClassName
          }`,
          text: `${
            isActive ? 'text-blue-600 font-semibold' : 'text-gray-500'
          } ${textClassName} ${
            isActive ? activeTextClassName : inactiveTextClassName
          }`,
          icon: `${
            isActive ? 'text-blue-500' : 'text-gray-400'
          } ${iconClassName} ${
            isActive ? activeIconClassName : inactiveIconClassName
          }`,
        };
      case 'pill':
        return {
          tab: `rounded-full ${
            isActive ? 'bg-blue-100' : 'bg-gray-100'
          } ${tabClassName} ${
            isActive ? activeTabClassName : inactiveTabClassName
          }`,
          text: `${
            isActive ? 'text-blue-700 font-medium' : 'text-gray-600'
          } ${textClassName} ${
            isActive ? activeTextClassName : inactiveTextClassName
          }`,
          icon: `${
            isActive ? 'text-blue-500' : 'text-gray-400'
          } ${iconClassName} ${
            isActive ? activeIconClassName : inactiveIconClassName
          }`,
        };
      case 'unstyled':
        return {
          tab: `${tabClassName} ${
            isActive ? activeTabClassName : inactiveTabClassName
          }`,
          text: `${textClassName} ${
            isActive ? activeTextClassName : inactiveTextClassName
          }`,
          icon: `${iconClassName} ${
            isActive ? activeIconClassName : inactiveIconClassName
          }`,
        };
      default:
        return {
          tab: `${tabClassName} ${
            isActive ? activeTabClassName : inactiveTabClassName
          }`,
          text: `${textClassName} ${
            isActive ? activeTextClassName : inactiveTextClassName
          }`,
          icon: `${iconClassName} ${
            isActive ? activeIconClassName : inactiveIconClassName
          }`,
        };
    }
  };

  const getIconPositionClass = (
    position?: 'left' | 'right' | 'top' | 'bottom',
  ) => {
    switch (position) {
      case 'left':
        return 'flex-row items-center';
      case 'right':
        return 'flex-row-reverse items-center';
      case 'top':
        return 'flex-col items-center';
      case 'bottom':
        return 'flex-col-reverse items-center';
      default:
        return 'flex-row items-center';
    }
  };

  const getSpacingClass = (position?: 'left' | 'right' | 'top' | 'bottom') => {
    switch (position) {
      case 'left':
        return `mr-${spacing}`;
      case 'right':
        return `ml-${spacing}`;
      case 'top':
        return `mb-${spacing}`;
      case 'bottom':
        return `mt-${spacing}`;
      default:
        return `mr-${spacing}`;
    }
  };

  return (
    <View
      style={[
        {
          gap: s(10),
        },
        wrapperStyle,
      ]}
      className={`flex-row ${className}`}
    >
      {tabs.map((tab, index) => {
        const isActive = activeTab === tab.value;
        const variantClasses = getVariantClasses(isActive);
        const iconPositionClass = getIconPositionClass(tab.iconPosition);
        const spacingClass = getSpacingClass(tab.iconPosition);

        if (!tab.hide)
          return (
            <TouchableOpacity
              key={`${tab.value}-${index}`}
              onPress={() => handlePress(tab.value)}
              style={[
                {
                  paddingVertical: s(8),
                  paddingHorizontal: s(16),
                  gap: s(5),
                },
                tabStyle,
                isActive ? activeTabStyle : inactiveTabStyle,
              ]}
              className={`justify-center ${variantClasses.tab} ${tabWrapperClassName}`}
              activeOpacity={0.7}
            >
              <View className={iconPositionClass}>
                {tab.icon && (
                  <View className={`${variantClasses.icon} ${spacingClass}`}>
                    {tab.icon}
                  </View>
                )}
                <Text
                  className={`${variantClasses.text} font-nourd-medium font-medium`}
                  style={[
                    textStyles.textXs,
                    { fontFamily: mediumFontFamily },
                    textStyle,
                    isActive ? activeTextStyle : inactiveTextStyle,
                    !isActive && variant === 'primary'
                      ? { color: '#707070' }
                      : undefined,
                  ]}
                >
                  {tab.label}
                </Text>
              </View>

              {isActive ? activeIndicator : <></>}
            </TouchableOpacity>
          );

        return null;
      })}
    </View>
  );
};

export default AppTab;
