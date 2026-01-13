/* eslint-disable prettier/prettier */
import { s } from '@core/utils/scale';
import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  appHorizontalPadding: {
    paddingHorizontal: s(20),
  },
  appContainer: {
    paddingHorizontal: s(15),
  },
  autTopPadding: {
    paddingTop: s(20),
  },
  autBottomPadding: {
    paddingBottom: s(50),
  },

  appTopPadding: {
    paddingTop: s(40),
  },

  actionSheetListWrapper: {
    borderRadius: s(12),
    paddingVertical: s(15),
    paddingHorizontal: s(5),
    gap: s(0),
  },
});
