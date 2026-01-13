import routes from '@core/navigations/routes';
import { useUserStore } from '@core/store/user.store';
import apis from '@core/utils/api-services';
import { resetNavigation } from '@core/utils/helpers';
import { FormSignInValue } from '@core/utils/types';
import { useMutation } from '@tanstack/react-query';
import { useError } from '../logic/use-error';

export const useLoginMutation = () => {
  const { handleError } = useError();
  const { setUser, setToken } = useUserStore();
  return useMutation({
    mutationFn: (body: FormSignInValue) => apis.auth.login(body),
    onSuccess: async res => {
      const { user, token } = res?.data;

      setUser(user);
      setToken(token);
      resetNavigation([{ name: routes.expenses }]);
    },
    onError(error: any) {
      const err = { ...error };
      handleError(err);
    },
  });
};
