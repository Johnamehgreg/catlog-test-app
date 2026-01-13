import { getServer, getServerPublic } from './axios-utils';
import { ExpenseValue, FormSignInValue, OrderPageQuery } from './types';

const apis = {
  auth: {
    login: (data: FormSignInValue) =>
      getServerPublic().post('/users/login', data),
  },

  expenses: {
    getAllExpenses: (params: OrderPageQuery) =>
      getServer().get('/bookkeeping/expenses', { params }),
    createExpense: (data: ExpenseValue) =>
      getServer().post('/bookkeeping/expenses', data),
    getExpenseAnalytics: () =>
      getServer().get('/bookkeeping/expenses/analytics?currency=NGN'),
    getExpenseCategories: () =>
      getServer().get('/bookkeeping/expenses/categories'),
    getRecipients: () => getServer().get('/bookkeeping/recipients'),
  },

  recipients: {
    getAllRecipients: () => getServer().get('/bookkeeping/recipients'),
  },
};

export default apis;
