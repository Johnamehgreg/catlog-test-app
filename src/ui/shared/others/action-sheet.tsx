import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
} from '@/components/ui/actionsheet';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { IconCloseCircle } from '@assets/svgs/icon-close-circle';
import { useDarkMode } from '@core/hooks/logic/use-dark-mode';
import { useKeyboard } from '@core/hooks/logic/use-keyboard';
import { textStyles } from '@core/styles/text-style';
import { s } from '@core/utils/scale';
import React from 'react';
import { Pressable } from 'react-native';

interface Props {
  open: boolean;
  close: () => void;
  children: React.ReactNode;
  classNameContent?: string;
  hideIndicator?: boolean;
}
export const ActionSheetComponent: React.FC<Props> = ({
  open,
  close,
  children,
  classNameContent,
  hideIndicator,
}) => {
  const { keyboardHeight } = useKeyboard();
  const {isDark} = useDarkMode()

  return (
    <Actionsheet isOpen={open} onClose={() => { }}>
      <ActionsheetBackdrop className="!backdrop-blur-sm bg-black/50 h-dvh" />
      <ActionsheetContent
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 180,
        }}
        style={{
          paddingBottom: keyboardHeight ? s(keyboardHeight) : s(100),
          overflow: 'visible',
        }}
        className={`w-full border-transparent max-h-[80vh]   outline-none  ${classNameContent}`}
      >

        <Pressable
          className='z-[200] primary-bg absolute rounded-full'
          style={{
            height: s(30),
            width: s(73),
            top: s(-50),
            right: s(10),
          }}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          onPress={() => close()}>
          <Box className='flex-row h-full items-center justify-center '
            style={{
              gap: s(3)
            }}
          >
            <IconCloseCircle className='size-4' fill={isDark ? 'white' : 'black'} />
            <Text style={textStyles?.textSm} className='text-center   default-text'>
              Close
            </Text>
          </Box>
        </Pressable>

        {!hideIndicator && (
          <ActionsheetDragIndicatorWrapper
            style={{
              marginVertical: s(10),
            }}
          >
            <ActionsheetDragIndicator className="w-12 h-[5px] bg-[#C2C2C2] rounded-[30px] " />
          </ActionsheetDragIndicatorWrapper>
        )}



        {children}
      </ActionsheetContent>
    </Actionsheet>
  );
};
