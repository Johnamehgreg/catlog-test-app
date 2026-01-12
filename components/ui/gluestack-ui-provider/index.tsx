import React, { useEffect } from 'react';
import { config } from './config';
import { View, ViewProps, useColorScheme as useRNColorScheme } from 'react-native';
import { OverlayProvider } from '@gluestack-ui/core/overlay/creator';
import { ToastProvider } from '@gluestack-ui/core/toast/creator';
import { useColorScheme } from 'nativewind';

export type ModeType = 'light' | 'dark' | 'system';

export function GluestackUIProvider({
  mode = 'system',
  ...props
}: {
  mode?: ModeType;
  children?: React.ReactNode;
  style?: ViewProps['style'];
}) {
  const { colorScheme, setColorScheme } = useColorScheme();
  const systemColorScheme = useRNColorScheme();

  // Resolve system mode to actual color scheme before setting
  const resolvedMode = mode === 'system' 
    ? (systemColorScheme || 'light')
    : mode;

  useEffect(() => {
    // Only set valid 'light' or 'dark' values, never 'system'
    if (resolvedMode === 'light' || resolvedMode === 'dark') {
      setColorScheme(resolvedMode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolvedMode, mode]);

  // Get the current resolved color scheme
  const currentColorScheme = mode === 'system' 
    ? (systemColorScheme || 'light')
    : (colorScheme || resolvedMode || 'light');

  return (
    <View
      style={[
        config[currentColorScheme as 'light' | 'dark'] || config.light,
        { flex: 1, height: '100%', width: '100%' },
        props.style,
      ]}
    >
      <OverlayProvider>
        <ToastProvider>{props.children}</ToastProvider>
      </OverlayProvider>
    </View>
  );
}
