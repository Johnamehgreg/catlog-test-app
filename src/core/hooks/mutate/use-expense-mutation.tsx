import apis from "@core/utils/api-services";
import { queryClient } from "@core/utils/helpers";
import { ExpenseValue } from "@core/utils/types";
import { useMutation } from "@tanstack/react-query";
import { useError } from "../logic/use-error";
import { useAppToast } from "../logic/use-toast";

export const useExpenseMutation = ({onClose, onSuccess}: {onClose: () => void; onSuccess?: () => void}) => {

  const { showToast } = useAppToast();


  const { handleError } = useError()
  return useMutation({
    mutationFn: (body: ExpenseValue) => apis.expenses.createExpense(body),
    onSuccess: async () => {
      showToast({
        variant: 'success',
        isLoading: false,
        message: 'Expense created successfully',
      });
      queryClient.invalidateQueries({
        queryKey: ['get-all-expenses'],
      });
      onSuccess?.();
      onClose()
    },
    onError(error: any) {
      const err = { ...error };
      handleError(err);

    },
  });
}