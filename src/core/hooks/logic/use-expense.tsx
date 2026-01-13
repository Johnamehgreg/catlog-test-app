import React from 'react';
import { useExpenseMutation } from '../mutate/use-expense-mutation';

export const useExpenses = ({
  onClose,
  onReset,
}: {
  onClose: () => void;
  onReset?: () => void;
}) => {
  const formikRef = React.useRef<any>(null);

  const { mutate, isPending } = useExpenseMutation({
    onClose,
    onSuccess: () => {
      // Reset form after successful submission
      if (formikRef.current) {
        formikRef.current.resetForm();
      }
      // Clear any additional state
      onReset?.();
    },
  });

 
 

  return {
    mutate,
    isPending,
  };
};
