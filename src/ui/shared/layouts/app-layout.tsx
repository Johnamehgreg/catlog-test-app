import { Box } from '@/components/ui/box';
import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface AppLayoutProps {
  children: React.ReactNode;
  wrapperClassName?: string;
  className?: string;
  header?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  scrollable?: boolean;
  statusBarStyle?: 'light-content' | 'dark-content';
  keyboardAvoiding?: boolean;
  bgBarStyle?: string;
  isOverLayLoading?: boolean;
  bottomComponent?: React.ReactNode;
  refreshControl?: React.ReactNode;
  scrollRef?: any;
}

export const AppLayout = ({
  children,
  className = '',
  header,
  style,
  contentStyle,
  scrollable = true,
  statusBarStyle = 'dark-content',
  bgBarStyle,
  keyboardAvoiding = true,
  wrapperClassName,
  bottomComponent,
  scrollRef,
}: AppLayoutProps) => {


  const renderContent = () => (
    <View
      style={[
        styles.container,
        bgBarStyle ? { backgroundColor: bgBarStyle } : {},
        contentStyle,
      ]}>
      <StatusBar
        backgroundColor={bgBarStyle || 'transparent'}
        barStyle={statusBarStyle}
        translucent={Platform.OS === 'android' ? false : undefined}
      />
      {header && <View style={styles.header}>{header}</View>}
      {scrollable ? (
        <ScrollView
          ref={scrollRef}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          style={styles.scrollView}>
          <Box style={[styles.content, style]} className={className}>
            {children}
          </Box>
        </ScrollView>
      ) : (
        <Box style={[styles.content, style]} className={className}>
          {children}
        </Box>
      )}
      {bottomComponent}
    </View>
  );

  return (
    <SafeAreaView
      edges={['top']}
      style={[
        styles.safeArea,
        bgBarStyle ? { backgroundColor: bgBarStyle } : {},
      ]}
      className={wrapperClassName}>
      {keyboardAvoiding ? (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.select({
            ios: 0,
            android: StatusBar.currentHeight,
          })}
          style={[
            styles.container,
            bgBarStyle ? { backgroundColor: bgBarStyle } : {},
          ]}>
          {renderContent()}
        </KeyboardAvoidingView>
      ) : (
        renderContent()
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    zIndex: 10,
  },
  scrollView: {
    flex: 1,
    flexGrow: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
  },
});
