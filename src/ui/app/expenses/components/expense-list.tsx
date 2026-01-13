import { VStack } from '@/components/ui/vstack';
import { useDarkMode } from '@core/hooks/logic/use-dark-mode';
import { mediumFontFamily, textStyles } from '@core/styles/text-style';
import { s } from '@core/utils/scale';
import { ExpenseModel } from '@core/utils/types';
import React from 'react';
import { Text } from 'react-native';
import { ExpenseCardItem } from './expense-card';

interface Props {
  expenses: ExpenseModel[];
}

export const ExpenseList: React.FC<Props> = ({ expenses }) => {
  const { isDark } = useDarkMode();
  return (
    <VStack style={{ gap: s(16) }}>
      {/* Section Title */}
      <Text
        className="default-text"
        style={[
          textStyles.textXl,
          {
            fontFamily: mediumFontFamily,
            marginBottom: s(8),
          },
        ]}
      >
        All Expenses
      </Text>

      <VStack
        style={{
          gap: s(20),
        }}
      >
        {expenses?.map(expense => (
          <ExpenseCardItem key={expense.id} expense={expense} />
        ))}
      </VStack>
    </VStack>
  );
};
