import apis from '@core/utils/api-services';
import {
  CategoryModel,
  ExpenseModel,
  OrderPageQuery,
  Recipient,
} from '@core/utils/types';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';

export type SettingsObject = {
  [key: string]: boolean;
};

export type SettingItem = {
  id: string;
  label: string;
  value: boolean;
};

const fetchItems = async (pageParam: OrderPageQuery) => {
  const res = await apis.expenses.getAllExpenses(pageParam);
  return res.data;
};

export const useGetAllExpenses = () => {
  const queryData = useInfiniteQuery({
    queryKey: ['get-all-expenses'],
    queryFn: ({ pageParam = 1 }) =>
      fetchItems({ page: pageParam, per_page: 10 }),
    staleTime: 0,
    refetchOnMount: true,
    refetchIntervalInBackground: true,
    initialPageParam: 1,

    getNextPageParam: lastPage => {
      const { next_page, page, total_pages } = lastPage.data;

      if (next_page) {
        return next_page;
      }

      if (page < total_pages) {
        return page + 1;
      }

      return undefined;
    },

    select: data => {
      const expenses: ExpenseModel[] = []; // Assuming TS, otherwise remove type
      let total = 0;

      data.pages.forEach(page => {
        // 2. FIXED: access 'page.data' directly (it is the array of expenses)
        if (Array.isArray(page.data)) {
          expenses.push(...page.data);
        }

        // 3. FIXED: access 'page.total' at the root level
        total = page.total;
      });

      return {
        expenses,
        total,
        pages: data.pages,
      };
    },
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = queryData;

  const expenses = useMemo(() => {
    return data?.expenses || [];
  }, [data?.expenses]) as ExpenseModel[];

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return {
    queryData,
    expenses,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    handleLoadMore,
  };
};

export const useGetExpensesCategories = () => {
  const queryData = useQuery({
    queryKey: ['get-expenses-categories'],
    queryFn: () => apis.expenses.getExpenseCategories(),
  });

  const categories = useMemo(() => {
    return queryData?.data?.data?.data || [];
  }, [queryData?.data?.data?.data]) as CategoryModel[];

  return {
    queryData,
    categories,
  };
};

export const useGetExpensesAnalytics = () => {
  const queryData = useQuery({
    queryKey: ['get-expenses-analytics'],
    queryFn: () => apis.expenses.getExpenseAnalytics(),
  });

  const analytic = useMemo(() => {
    return queryData?.data?.data?.data;
  }, [queryData?.data?.data]);

  console.log(analytic);

  return {
    queryData,
    analytic,
  };
};

export const useGetRecipients = () => {
  const queryData = useQuery({
    queryKey: ['get-recipients'],
    queryFn: () => apis.expenses.getRecipients(),
  });

  const recipients = useMemo(() => {
    return queryData?.data?.data?.data || [];
  }, [queryData?.data?.data]) as Recipient[];

  return {
    queryData,
    recipients,
  };
};
