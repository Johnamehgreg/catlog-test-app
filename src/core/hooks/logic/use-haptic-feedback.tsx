import {trigger} from 'react-native-haptic-feedback';

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

export const useHapticFeedback = () => {
  const onHaptic = () => {
    trigger('impactHeavy', options);
  };
  return {
    onHaptic,
  };
};
