import { Divider } from '@/components/ui/divider';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { useDarkMode } from '@core/hooks/logic/use-dark-mode';
import { useExpenses } from '@core/hooks/logic/use-expense';
import {
  useGetExpensesCategories,
  useGetRecipients,
} from '@core/hooks/query/use-get-expenses';
import { interRegularFontFamily, textStyles } from '@core/styles/text-style';
import { resColor } from '@core/utils/helpers';
import { s } from '@core/utils/scale';
import { CategoryModel, Recipient } from '@core/utils/types';
import { initialValues, validationSchemas } from '@core/validators';
import { AppBtn } from '@ui/shared/buttons/app-btn';
import { AppCheckbox } from '@ui/shared/buttons/app-checkbox';
import { AvatarCard } from '@ui/shared/cards/avatar-card';
import AppInput from '@ui/shared/inputs/app-input';
import { ActionSheetProvider } from '@ui/shared/others/action-sheet-provider';
import { useFormik } from 'formik';
import React, { useMemo, useState } from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-date-picker';

interface Props {
  open: boolean;
  onClose: () => void;
  setOpen: (value: React.SetStateAction<boolean>) => void;
}

export const RecordExpenseSheet: React.FC<Props> = ({
  open,
  onClose,
  setOpen,
}) => {
  const { isPending, mutate } = useExpenses({ onClose });
  const { isDark } = useDarkMode();

  const { queryData, categories } = useGetExpensesCategories();
  const { queryData: queryRecipient, recipients } = useGetRecipients();

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
      mutate(payload)
    },
  });


  const [showCategory, setShowCategory] = useState(false);
  const [showRecipient, setShowRecipient] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const catValue = useMemo(() => {
    return categories?.find(
      category => category.key.toString() === formik.values.category,
    )?.description;
  }, [formik.values.category, categories]);

  const recipientValue = useMemo(() => {
    return recipients?.find(
      recipient => recipient.id.toString() === formik.values.recipient,
    )?.name;
  }, [formik.values.recipient, recipients]);


  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`;
  };

  const handleDateConfirm = (date: Date) => {
    formik.setFieldValue('date', date.toISOString());
    setShowDatePicker(false);
  };



  return (
    <>
      <ActionSheetProvider
        title="Record an Expense Manually"
        onClose={onClose}
        open={open}
        hideSearch
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack
            style={{
              gap: s(10),
            }}
          >
            <AppInput
              onChangeText={formik.handleChange('amount')}
              onBlur={formik.handleBlur('amount')}
              errorMessage={formik.errors.amount}
              value={formik.values.amount}
              placeholder="Amount"
              touched={formik.touched.amount}
              keyboardType="numeric"
              currency="NGN"
            />
            <AppInput
              onChangeText={formik.handleChange('amount_paid')}
              onBlur={formik.handleBlur('amount_paid')}
              errorMessage={formik.errors.amount_paid}
              value={formik.values.amount_paid}
              placeholder="Amount Paid"
              touched={formik.touched.amount_paid}
              keyboardType="numeric"
              currency="NGN"
            />
            <AppInput
              isSelect
              onPress={() => setShowRecipient(true)}
              errorMessage={formik.errors.recipient}
              value={recipientValue || ''}
              placeholder="Recipient"
              touched={formik.touched.recipient}
            />
            <AppInput
              isSelect
              onPress={() => {
                setShowCategory(true);
                onClose();
              }}
              errorMessage={formik.errors.category}
              value={catValue || ''}
              placeholder="Category"
              touched={formik.touched.category}
            />

            <AppInput
              isTextArea
              onChangeText={formik.handleChange('description')}
              onBlur={formik.handleBlur('description')}
              errorMessage={formik.errors.description}
              value={formik.values.description}
              placeholder="description"
              touched={formik.touched.description}
            />

            <AppInput
              isDate
              onPress={() => setShowDatePicker(true)}
              errorMessage={formik.errors.date}
              value={formik.values.date ? formatDate(formik.values.date) : ''}
              placeholder="Date"
              touched={formik.touched.date}
            />
          </VStack>
        </ScrollView>

        <AppBtn
          title="Record Expense"
          onPress={formik.handleSubmit}
          loading={isPending}
        />
      </ActionSheetProvider>
      <ActionSheetProvider
        queryData={queryRecipient}
        list={recipients}
        searchPlaceholder="Search for recipient"
        title="Select Recipient"
        onClose={() => {
          setShowRecipient(false);
          setOpen(true);

        }}
        open={showRecipient}
        listWrapperStyle={{
          paddingVertical: s(10),
        }}
        listItem={item => {
          return (
            <ResItem
              onPress={(resData: Recipient) => {
                setShowRecipient(false);
                setOpen(true);
                formik?.setFieldValue('recipient', resData?.id);
              }}
              active={

                formik.values.recipient === item.id
              }
              recipient={item}
            />
          );
        }}

      />
      <ActionSheetProvider
        queryData={queryData}
        list={categories}
        title="Select Category"
        searchPlaceholder="Search for Category"
        onClose={() => {
          setShowCategory(false);
          setOpen(true);
        }}
        open={showCategory}
        listWrapperStyle={{
          paddingVertical: s(10),
          gap: s(10),
        }}
        listItem={(item: CategoryModel) => {
          return (
            <CheckItemCard
              active={
                formik.values.category === item.key
              }
              onPress={(catData: CategoryModel) => {
                setShowCategory(false);
                setOpen(true);
                formik?.setFieldValue('category', catData?.key);
              }}
              category={item}
            />
          );
        }}

      />

      <DatePicker
        modal
        open={showDatePicker}
        date={formik.values.date ? new Date(formik.values.date) : new Date()}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={() => setShowDatePicker(false)}
        theme={isDark ? 'dark' : 'light'}
      />
    </>
  );
};

const ResItem = ({
  recipient,
  onPress,
  active,
}: {
  recipient: Recipient;
  onPress: (item: Recipient) => void;
  active: boolean;
}) => {
  return (
    <TouchableOpacity onPress={() => onPress(recipient)}>
      <>
        <HStack style={{ gap: s(10) }} className="items-center justify-between ">
          <HStack className="items-center gap-2 flex-1 ">
            <AvatarCard
              style={{
                backgroundColor: resColor,
              }}
              name={recipient?.name}
              size="smd"
            />

            <Text
              numberOfLines={2}
              className="default-text capitalize font-medium"
              style={[
                textStyles.textSm,
                {
                  fontFamily: interRegularFontFamily,
                },
              ]}
            >
              {recipient?.name}
            </Text>
          </HStack>

          <AppCheckbox checked={active} />
        </HStack>

        <Divider
          className="!bg-[#E5E5E5]"
          style={{
            marginVertical: s(15),
          }}
        />
      </>
    </TouchableOpacity>
  );
};
const CheckItemCard = ({
  category,
  onPress,
  active,
}: {
  category: CategoryModel;
  onPress: (item: CategoryModel) => void;
  active: boolean;
}) => {
  return (
    <TouchableOpacity onPress={() => onPress(category)}>
      <>
        <HStack style={{ gap: s(10) }} className="items-center justify-between ">
          <HStack className="items-center gap-2 flex-1">
            <Text
              numberOfLines={1}
              className="default-text font-medium"
              style={[
                textStyles.textSm,
                {
                  fontFamily: interRegularFontFamily,
                },
              ]}
            >
              {category?.description}
            </Text>
          </HStack>

          <AppCheckbox checked={active} />
        </HStack>

        <Divider
          className="!bg-[#E5E5E5]"
          style={{
            marginVertical: s(15),
          }}
        />
      </>
    </TouchableOpacity>
  );
};
