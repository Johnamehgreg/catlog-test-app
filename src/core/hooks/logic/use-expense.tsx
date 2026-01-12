import { initialValues, validationSchemas } from '@core/validators';
import { useFormik } from 'formik';
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

  const formik = useFormik({
    initialValues: {
      ...initialValues.createExpense,
      currency: 'NGN', // Set default currency
    },
    validationSchema: validationSchemas.createExpense,
    enableReinitialize: true,
    onSubmit: values => {
      const payload = {
        ...values,
        amount: Number(values.amount),
        amount_paid: Number(values.amount_paid),
        currency: values.currency || 'NGN',
      };
      mutate(payload);
    },
  });

  React.useEffect(() => {
    formikRef.current = formik;
  }, [formik]);

  return {
    formik,
    isPending,
  };
};
