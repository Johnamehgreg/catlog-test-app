/* eslint-disable prettier/prettier */
import { rfs, s } from '@core/utils/scale';
import { Platform, StyleSheet } from 'react-native';

// FH Oscar font family - Use filename-based names for both platforms
// Android: Uses filename without extension
// iOS: Uses PostScript name (try filename pattern first, may need adjustment)
const getFontFamily = (weight: string) => {
  const fontName = `FHOscarTest-${weight}`;

  if (Platform.OS === 'android') {
    // Android: Use filename without extension
    return fontName;
  } else {
    // iOS: Try filename pattern (PostScript name might be different - check Font Book if this doesn't work)
    return fontName;
  }
};

export const regularFontFamily = getFontFamily('Regular');
export const lightFontFamily = getFontFamily('Light');
export const mediumFontFamily = getFontFamily('Medium');
export const semiBoldFontFamily = getFontFamily('SemiBold');
export const boldFontFamily = getFontFamily('Bold');
export const heavyFontFamily = getFontFamily('Black');

// Inter font family - Use filename-based names for both platforms
const getInterFontFamily = (weight: string) => {
  if (Platform.OS === 'android') {
    // Android: Use filename without extension
    return `Inter-${weight}`;
  } else {
    // iOS: Inter fonts can use either "Inter" with fontWeight or "Inter-{Weight}"
    // Try "Inter-{Weight}" first (filename pattern), which should work if fonts are properly linked
    return `Inter-${weight}`;
  }
};

export const interRegularFontFamily = getInterFontFamily('Regular');
export const interMediumFontFamily = getInterFontFamily('Medium');
export const interBoldFontFamily = getInterFontFamily('Bold');
export const interBlackFontFamily = getInterFontFamily('Black');

export const textStyles = StyleSheet.create({
  // Tailwind-like text sizes (scaled with rfs)
  textXs: { fontSize: rfs(12), flexShrink: 1 }, // ~12px (Tailwind: text-xs)
  textSm: { fontSize: rfs(14), flexShrink: 1 }, // ~14px (Tailwind: text-sm)
  textBase: { fontSize: rfs(16), flexShrink: 1 }, // ~16px (Tailwind: text-base)
  textLg: { fontSize: rfs(18), flexShrink: 1 }, // ~18px (Tailwind: text-lg)
  textXl: { fontSize: rfs(20), flexShrink: 1 }, // ~20px (Tailwind: text-xl)
  text2Xl: { fontSize: rfs(24), flexShrink: 1 }, // ~24px (Tailwind: text-2xl)
  text3Xl: { fontSize: rfs(28), flexShrink: 1 }, // ~28px (Tailwind: text-3xl)
  text4Xl: { fontSize: rfs(32), flexShrink: 1 }, // ~32px (Tailwind: text-4xl)
  text5Xl: { fontSize: rfs(36), flexShrink: 1 }, // ~36px (Tailwind: text-5xl)

  // Titles (aligned with Tailwind sizes)
  title: {
    fontSize: rfs(22), // ~22px (custom, between text-xl and text-2xl)
    fontFamily: boldFontFamily,
    flexShrink: 1,
  },
  subtitle: {
    fontSize: rfs(16), // text-base
    fontFamily: regularFontFamily,
    flexShrink: 1,
  },
  headerTitle: {
    fontSize: rfs(18), // text-lg
    fontFamily: regularFontFamily,
    flexShrink: 1,
  },

  // Paragraphs & Labels
  paragraph: {
    fontSize: rfs(16), // text-base
    fontFamily: regularFontFamily,
    flexShrink: 1,
  },
  caption: {
    fontSize: rfs(14), // text-sm
    fontFamily: regularFontFamily,
    flexShrink: 1,
  },
  label: {
    fontSize: rfs(14), // text-sm
    fontFamily: regularFontFamily,
    flexShrink: 1,
  },
  hint: {
    fontSize: rfs(12), // text-xs
    fontFamily: regularFontFamily,
    flexShrink: 1,
  },

  // Font weights
  regular: { fontFamily: regularFontFamily },
  semiBold: { fontFamily: semiBoldFontFamily },
  bold: { fontFamily: boldFontFamily },

  // Text alignment
  textCenter: { textAlign: 'center' },
  textLeft: { textAlign: 'left' },
  textRight: { textAlign: 'right' },

  actionSheetTitle: {
    fontFamily: boldFontFamily,
    fontSize: rfs(22),
    lineHeight: s(22),
    marginBottom: s(19),
    marginTop: s(15),
    flexShrink: 1,
  },

  welcomeText: {
    fontSize: rfs(18),
    textAlign: 'center',
    lineHeight: s(30),
    flexShrink: 1,
  },

  welcomeSubtitle: {
    marginBottom: s(32),
    fontSize: rfs(12),
    fontFamily: regularFontFamily,
    textAlign: 'center',
    flexShrink: 1,
  },
});
