import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { useDarkMode } from '@core/hooks/logic/use-dark-mode';
import { heavyFontFamily, textStyles } from '@core/styles/text-style';
import { s } from '@core/utils/scale';
import { ActionSheetComponent } from '@ui/shared/others/action-sheet';
import { Bell, Menu, Moon, Sun } from 'lucide-react-native';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export const Header = () => {
  const [showMenuSheet, setShowMenuSheet] = useState(false);

  const { setColorScheme, isDark } = useDarkMode();
  const toggleTheme = () => {
    setColorScheme(isDark ? 'light' : 'dark');
    setShowMenuSheet(false);
  };

  return (
    <>
      <HStack
        style={[
          {
            paddingHorizontal: s(16),
            paddingTop: s(30),
            paddingBottom: s(16),
          },
        ]}
        className="items-center secondary-bg app-border border-b-[0.5px]  justify-between"
      >
        <Text
          className="default-text"
          style={[
            // textStyles.textXl,
            { fontFamily: heavyFontFamily, fontSize: s(22) },
          ]}
        >
          Expenses
        </Text>

        <HStack style={{ gap: s(12) }} className="items-center">
          <TouchableOpacity
            style={{ position: 'relative' }}
            className="p-3 rounded-full bg-white dark:bg-gray-800"
          >
            <Bell
              size={s(20)}
              color={isDark ? '#FFFFFF' : '#000000'}
              strokeWidth={2}
            />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>4</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            className="p-3 rounded-full bg-white dark:bg-gray-800"
            onPress={() => setShowMenuSheet(true)}
          >
            <Menu
              size={s(20)}
              color={isDark ? '#FFFFFF' : '#000000'}
              strokeWidth={2}
            />
          </TouchableOpacity>
        </HStack>
      </HStack>

      {/* Menu Action Sheet */}
      <ActionSheetComponent
        open={showMenuSheet}
        close={() => setShowMenuSheet(false)}
      >
        <Box style={{ paddingHorizontal: s(20), paddingVertical: s(20) }}>
          {/* Theme Toggle */}
          <TouchableOpacity
            onPress={toggleTheme}
            style={[
              styles.menuItem,
              {
                backgroundColor: isDark ? '#1F2937' : '#F3F4F6',
              },
            ]}
            activeOpacity={0.7}
          >
            <HStack style={{ gap: s(12) }} className="items-center">
              {isDark ? (
                <Sun
                  size={s(24)}
                  color={isDark ? '#FFFFFF' : '#000000'}
                  strokeWidth={2}
                />
              ) : (
                <Moon
                  size={s(24)}
                  color={isDark ? '#FFFFFF' : '#000000'}
                  strokeWidth={2}
                />
              )}
              <Text className="default-text" style={[textStyles.textBase]}>
                {isDark ? 'Light Mode' : 'Dark Mode'}
              </Text>
            </HStack>
          </TouchableOpacity>
        </Box>
      </ActionSheetComponent>
    </>
  );
};

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: s(0),
    right: s(0),
    backgroundColor: '#BF0637',
    borderRadius: s(10),
    minWidth: s(20),
    height: s(20),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: s(4),
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: s(10),
    fontWeight: 'bold',
    fontFamily: heavyFontFamily,
  },
  menuItem: {
    paddingHorizontal: s(16),
    paddingVertical: s(16),
    borderRadius: s(12),
  },
});
