import { useToast } from '@/components/ui/toast';
import { ToastModel } from '@core/utils/types';
import { ErrorCard } from '@ui/shared/cards/error-card';
import React from 'react';

export const useAppToast = () => {
  const toast = useToast();
  const [toastId, setToastId] = React.useState<string | number>(0);
  const showToast = (value: ToastModel) => {
    if (!toast.isActive(toastId as string)) {
      showNewToast(value);
    }
  };
  const showNewToast = ({ message, variant, isLoading }: ToastModel) => {
    const newId = Math.random();
    setToastId(newId);
    toast.show({
      id: `${newId}`,
      placement: 'top',
      duration: 5000,
      render: ({ id }) => {
        const uniqueToastId = 'toast-' + id;
        return (
          <ErrorCard
            id={id}
            toast={toast}
            isLoading={isLoading}
            message={message}
            variant={variant}
            uniqueToastId={uniqueToastId}
          />
        );
      },
    });
  };
  return {
    showToast,
  };
};
