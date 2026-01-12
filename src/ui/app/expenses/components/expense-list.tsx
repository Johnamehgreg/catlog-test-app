import { VStack } from "@/components/ui/vstack"
import { mediumFontFamily, textStyles } from "@core/styles/text-style"
import { s } from "@core/utils/scale"
import { ExpenseModel } from "@core/utils/types"
import React from "react"
import { Text } from "react-native"
import { ExpenseCardItem } from "./expense-card"

interface Props {
  expenses: ExpenseModel[]
}

export const ExpenseList: React.FC<Props> = ({ expenses }) => {
  return (
    <VStack style={{ gap: s(16) }}>
      <Text
        className="default-text"
        style={[
          textStyles.textXl,
          {
            fontFamily: mediumFontFamily,
            marginBottom: s(8),
          }
        ]}
      >
        All Expenses
      </Text>

      <VStack style={{
        gap: s(20)
      }}>
        {expenses?.map((expense) => (
          <ExpenseCardItem key={expense.id} expense={expense} />
        ))}</VStack>
    </VStack>
  );
};



