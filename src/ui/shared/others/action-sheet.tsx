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
import { useKeyboard } from '@core/hooks/logic/use-keyboard';
import { s } from '@core/utils/scale';
import React from 'react';
import { TouchableOpacity } from 'react-native';

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

  return (
    <Actionsheet isOpen={open} onClose={close}>
      <ActionsheetBackdrop  className="!backdrop-blur-sm bg-black/50 h-dvh" />

      <ActionsheetContent
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 180,
        }}
        style={{
          paddingBottom: keyboardHeight ? s(keyboardHeight) : s(100),
        }}
        className={`w-full border-transparent max-h-[80vh]   outline-none  ${classNameContent}`}>
        <TouchableOpacity onPress={close}>
          <Box className='primary-bg z-20 py-1.5 px-2 absolute flex-row rounded-full items-center justify-center ' style={{
            top: s(-45),
            right: s(-175),
            gap: s(3)
          }}>
            <IconCloseCircle className='size-4' fill={'black'} />

            <Text className='text-center text-base  default-text'>

              Close
            </Text>
          </Box>
        </TouchableOpacity>
        {!hideIndicator && (
          <ActionsheetDragIndicatorWrapper
            style={{
              marginVertical: s(10),
            }}>


            <ActionsheetDragIndicator className="w-12 h-[5px] bg-[#C2C2C2] rounded-[30px] " />
          </ActionsheetDragIndicatorWrapper>
        )}

        {children}
      </ActionsheetContent>
    </Actionsheet>
  );
};
