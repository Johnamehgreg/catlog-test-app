import { useAppToast } from './use-toast';

export const useError = () => {
  const { showToast } = useAppToast();

  const handleError = (error: any, option?: any) => {
    const message = error?.response?.data?.message || 'Something went wrong';

    showToast({
      variant: 'error',
      isLoading: false,
      message: message,
    });
  };

  return {
    handleError,
  };
};
