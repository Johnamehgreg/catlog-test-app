import { useDarkMode } from "@core/hooks/logic/use-dark-mode";
import { interBlackFontFamily, regularFontFamily, textStyles } from "@core/styles/text-style";
import { formatNumber } from "@core/utils/helpers";
import { s } from "@core/utils/scale";
import { Recipient } from "@core/utils/types";
import React, { useMemo } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface Props {
  analytic: any
}

export const DashbordGrid: React.FC<Props> = ({ analytic }) => {

  const { isDark } = useDarkMode()


  const lastestRes = useMemo(() => {
    return analytic?.top_10_recipients?.[0]
  }, [analytic]) as Recipient | undefined
  
   const currency = useMemo(() => {
    return analytic?.available_currencies?.[0] || 'NGN'
  },[analytic]) as string | undefined


  const dashboardList = useMemo(() => {
    return [
      {
        name: 'Total Expenses',
        value: `${currency} ${formatNumber(analytic?.total_expenses?.value ||0)}`,
        icon: <Image source={require('@assets/pngs/total_expenses.png')} style={{ width: s(48), height: s(48) }} />,
      },
      {
        name: 'Average Value',
        value:`${currency} ${formatNumber(analytic?.average_expense_value?.value ||0)}`,
        icon: <Image source={require('@assets/pngs/average_value.png')} style={{ width: s(48), height: s(48) }} />,
      },
      {
        name: 'Pending Payments',
        value:`${currency} ${formatNumber(analytic?.pending_payments?.value ||0)}`,
        icon: <Image source={require('@assets/pngs/pending_payments.png')} style={{ width: s(48), height: s(48) }} />,
      },
      {
        name: 'Largest Recipient',
        value: `${lastestRes?.name || 'N/A'}`,
        icon: <Image source={require('@assets/pngs/largest_recipient.png')} style={{ width: s(48), height: s(48) }} />,
      },
    ];
  }, [analytic]);



  return (
    <View style={styles.grid} className="flex-row flex-wrap" >
      {dashboardList.map((item, index) => {
        return <ItemCard key={index} item={item} isDark={isDark} index={index} />;
      })}
    </View>
  );
};

const ItemCard: React.FC<{ item: any; isDark: boolean; index: number }> = ({ item, isDark, index }) => {
  // Determine which corner to round based on position in 2x2 grid
  // 0: top-left, 1: top-right, 2: bottom-left, 3: bottom-right
  const getBorderRadius = () => {
    switch (index) {
      case 0: // top-left
        return { borderTopLeftRadius: s(12) };
      case 1: // top-right
        return { borderTopRightRadius: s(12) };
      case 2: // bottom-left
        return { borderBottomLeftRadius: s(12) };
      case 3: // bottom-right
        return { borderBottomRightRadius: s(12) };
      default:
        return {};
    }
  };

  return (
    <View
      style={[
        styles.card,
        {
          borderWidth: 0.5,
          borderColor: isDark ? '#374151' : '#E5E5E5',
        },
        getBorderRadius(),
      ]}
      className="app-card"
    >
      {/* Icon */}
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: item.iconBg,
          }
        ]}
      >
        {item.icon}
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text
          className="default-text"
          style={[
            textStyles.textSm,
            {
              fontFamily: regularFontFamily,
            }
          ]}
          numberOfLines={2}
        >
          {item.name}
        </Text>
        <Text
          className="default-text"
          style={[
            textStyles.textXl,
            { fontFamily: interBlackFontFamily }
          ]}
          numberOfLines={1}
        >
          {item.value}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    rowGap: s(0),
    columnGap: s(0),
    marginBottom: s(24),
  },
  card: {
    width: '49%',
    padding: s(16),
    height: s(140),
    justifyContent: 'space-between',
  },
  iconContainer: {
    width: s(48),
    height: s(48),
    borderRadius: s(24),
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});
