import { useDarkMode } from '@core/hooks/logic/use-dark-mode';
import routes from '@core/navigations/routes';
import { useUserStore } from '@core/store/user.store';
import { boldFontFamily, regularFontFamily } from '@core/styles/text-style';
import { resetNavigation } from '@core/utils/helpers';
import { rfs, s } from '@core/utils/scale';
import { useEffect, useRef } from 'react';
import {
  Animated,
  StatusBar,
  StyleSheet,
  View
} from 'react-native';

const SplashUi = () => {

  const { token } = useUserStore()
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  const { isDark } = useDarkMode()
  // Professional color scheme
  const primaryColor = 'rgb(51, 32, 137)';
  const primaryColorLight = 'rgba(51, 32, 137, 0.08)';
  const screenBackgroundColor = isDark ? '#0F0F15' : '#F8F9FA';
  const textColor = isDark ? '#FFFFFF' : primaryColor;
  const accentColor = primaryColor;
  const subtitleColor = isDark ? '#9CA3AF' : '#6B7280';

  useEffect(() => {
    // Smooth entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Navigate after 2 seconds
    const timer = setTimeout(async () => {
      const initialRoute = token ? routes.expenses : routes.login;

      resetNavigation([{ name: initialRoute }]);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: screenBackgroundColor }]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={screenBackgroundColor}
        translucent={false}
      />

      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        {/* Logo Container */}
        <View style={styles.logoContainer}>
          <View style={[styles.logoCircle, { backgroundColor: primaryColorLight }]}>
            <View style={[styles.logoInnerCircle, { backgroundColor: accentColor }]} />
          </View>
        </View>

        {/* Brand Name */}
        <Animated.Text style={[styles.brandName, { color: textColor }]}>
          CatLog
        </Animated.Text>

        {/* Tagline */}
        <Animated.Text style={[styles.tagline, { color: subtitleColor }]}>
          Track your expenses with ease
        </Animated.Text>
      </Animated.View>

      {/* Bottom Accent Line */}
      <View style={[styles.bottomAccent, { backgroundColor: accentColor }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: s(40),
  },
  logoContainer: {
    marginBottom: s(32),
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoCircle: {
    width: s(80),
    height: s(80),
    borderRadius: s(40),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: s(8),
  },
  logoInnerCircle: {
    width: s(56),
    height: s(56),
    borderRadius: s(28),
  },
  brandName: {
    fontFamily: boldFontFamily,
    fontSize: rfs(42),
    letterSpacing: s(-0.8),
    marginBottom: s(12),
    textAlign: 'center',
  },
  tagline: {
    fontFamily: regularFontFamily,
    fontSize: rfs(16),
    letterSpacing: s(0.2),
    textAlign: 'center',
    lineHeight: s(24),
  },
  bottomAccent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: s(4),
  },
});

export default SplashUi;
