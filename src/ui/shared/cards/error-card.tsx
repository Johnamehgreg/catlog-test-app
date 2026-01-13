import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { CloseIcon, Icon } from '@/components/ui/icon';
import { Pressable } from '@/components/ui/pressable';
import { Toast, ToastDescription } from '@/components/ui/toast';
import { textStyles } from '@core/styles/text-style';
import { s } from '@core/utils/scale';
import { ToastVariant } from '@core/utils/types';
import React from 'react';

interface Props {
  uniqueToastId?: string;
  variant: ToastVariant;
  message?: string;
  isLoading?: boolean;
  toast?: any;
  id?: string;
}

export const ErrorCard: React.FC<Props> = ({
  uniqueToastId,
  message,
  variant,
  toast,
  id,
}) => {
  const getVariantStyle = (variant: ToastVariant) => {
    switch (variant) {
      case 'error':
        return {
          messageClassName: ' text-[#F9B3B3]',
          wrapperClassName: ' bg-[#401A1A] border-[#401A1A]  ',
          closeIconColor: '#F9B3B3',
          message: message || 'Something went wrong',
        };
      case 'success':
        return {
          messageClassName: 'dark:text-[#137C5A] text-[#A1F1C2]',
          wrapperClassName: ' bg-[#1A4032] border-[#1A4032]  ',
          closeIconColor: '#01E17B',
          message: message,
        };
      case 'info':
        return {
          messageClassName: 'text-[#B3D9FF]',
          wrapperClassName: ' bg-[#1C2C40] border-[#1C2C40]  ',
          closeIconColor: '#B3D9FF',
          message: message,
        };
      default:
        return {
          messageClassName: ' text-[#A1F1C2]',
          wrapperClassName: ' bg-[#1A4032] border-[#1A4032]  ',
          closeIconColor: '#01E17B',
          message: message,
        };
    }
  };

  const content = getVariantStyle(variant);

  return (
    <Box className="relative z-50   max-w-[343px] overflow-visible">
      <Toast
        action="error"
        variant="outline"
        nativeID={uniqueToastId}
        style={{
          borderRadius: s(16),
          paddingVertical: s(12),
          paddingHorizontal: s(16),
          gap: s(20),
        }}
        className={`w-full flex-row justify-between items-center gap-6 shadow-hard-5 bg-white dark:bg-neutral-900 ${content?.wrapperClassName}`}
      >
        <HStack space="md" className="items-center flex-[0.93]">
          <ToastDescription
            className={`!font-nourd-medium capitalize text-base ${content.messageClassName}`}
            style={[textStyles.textSm]}
          >
            {message}
          </ToastDescription>
        </HStack>

        <Pressable onPress={() => toast?.close(id)} className="p-1">
          <Icon
            as={CloseIcon}
            color={content.closeIconColor || 'white'}
            style={{ width: s(20), height: s(20) }}
          />
        </Pressable>
      </Toast>
    </Box>
  );
};
