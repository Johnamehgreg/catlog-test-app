import { Divider } from '@/components/ui/divider';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { useDarkMode } from '@core/hooks/logic/use-dark-mode';
import { useExpenses } from '@core/hooks/logic/use-expense';
import {
  useGetExpensesCategories,
  useGetRecipients,
} from '@core/hooks/query/use-get-expenses';
import { regularFontFamily, textStyles } from '@core/styles/text-style';
import { resColor } from '@core/utils/helpers';
import { s } from '@core/utils/scale';
import { CategoryModel, Recipient } from '@core/utils/types';
import { AppBtn } from '@ui/shared/buttons/app-btn';
import { AppCheckbox } from '@ui/shared/buttons/app-checkbox';
import { AvatarCard } from '@ui/shared/cards/avatar-card';
import AppInput from '@ui/shared/inputs/app-input';
import { ActionSheetProvider } from '@ui/shared/others/action-sheet-provider';
import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text } from 'react-native';
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
  const [showCategory, setShowCategory] = useState(false);
  const [showRecipient, setShowRecipient] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryModel | null>(null);
  const [selectedRecipient, setSelectedRecipient] =
    useState<Recipient | null>(null);
  const [tempSelectedRecipient, setTempSelectedRecipient] =
    useState<Recipient | null>(null);
  const [tempSelectedCategory, setTempSelectedCategory] =
    useState<CategoryModel | null>(null);

  const handleReset = () => {
    setSelectedCategory(null);
    setSelectedRecipient(null);
  };

  const { isPending, formik } = useExpenses({
    onClose,
    onReset: handleReset,
  });

  const { queryData, categories } = useGetExpensesCategories();
  const { queryData: queryRecipient, recipients } = useGetRecipients();
  const { isDark } = useDarkMode();

  useEffect(() => {
    if (formik.values.recipient && !selectedRecipient && recipients) {
      const recipient = recipients.find(
        r => r.id === formik.values.recipient,
      );
      if (recipient) {
        setSelectedRecipient(recipient);
      }
    }
    if (formik.values.category && !selectedCategory && categories) {
      const category = categories.find(c => c.id === formik.values.category || c.key === formik.values.category);
      if (category) {
        setSelectedCategory(category);
      }
    }
    if (!formik.values.recipient && selectedRecipient) {
      setSelectedRecipient(null);
    }
    if (!formik.values.category && selectedCategory) {
      setSelectedCategory(null);
    }
  }, [
    formik.values.recipient,
    formik.values.category,
    recipients,
    categories,
    selectedRecipient,
    selectedCategory,
  ]);

  // Format date for display
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

  const handleRecipientConfirm = () => {
    if (tempSelectedRecipient) {
      setSelectedRecipient(tempSelectedRecipient);
      formik.setFieldValue('recipient', tempSelectedRecipient.id);
      setShowRecipient(false);
   
      setTimeout(() => {
        setOpen(true);
      }, 100);
    }
  };

  const handleCategoryConfirm = () => {
    if (tempSelectedCategory) {
      setSelectedCategory(tempSelectedCategory);
      formik.setFieldValue('category', tempSelectedCategory.id);
      setShowCategory(false);
      
      setTimeout(() => {
        setOpen(true);
      }, 100);
    }
  };

  useEffect(() => {
    if (showRecipient) {
      setTempSelectedRecipient(selectedRecipient);
    } else {
      setTempSelectedRecipient(null);
    }
  }, [showRecipient, selectedRecipient]);

  useEffect(() => {
    if (showCategory) {
      setTempSelectedCategory(selectedCategory);
    } else {
      setTempSelectedCategory(null);
    }
  }, [showCategory, selectedCategory]);

  return (
    <>
      {/* Main Form Action Sheet */}
      <ActionSheetProvider
        title="Record an Expense Manually"
        onClose={() => {
          setOpen(false);
          onClose();
        }}
        open={open}
        hideSearch
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack
            style={{
              gap: s(10),
              marginBottom: s(10),
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
            />
            <AppInput
              onChangeText={formik.handleChange('amount_paid')}
              onBlur={formik.handleBlur('amount_paid')}
              errorMessage={formik.errors.amount_paid}
              value={formik.values.amount_paid}
              placeholder="Amount Paid"
              touched={formik.touched.amount_paid}
              keyboardType="numeric"
            />
            <AppInput
              isSelect
              onPress={() => {
                setOpen(false);
                setShowRecipient(true);
              }}
              errorMessage={formik.errors.recipient}
              value={selectedRecipient?.name}
              placeholder="Recipient"
              touched={formik.touched.recipient}
            />
            <AppInput
              isSelect
              onPress={() => {
                setOpen(false);
                setShowCategory(true);
              }}
              errorMessage={formik.errors.category}
              value={selectedCategory?.description}
              placeholder="Category"
              touched={formik.touched.category}
            />
            <AppInput
              isTextArea
              onChangeText={formik.handleChange('description')}
              onBlur={formik.handleBlur('description')}
              errorMessage={formik.errors.description}
              value={formik.values.description}
              placeholder="Description"
              touched={formik.touched.description}
            />
            <AppInput
              isDate
              onPress={() => setShowDatePicker(true)}
              errorMessage={formik.errors.date}
              value={
                formik.values.date ? formatDate(formik.values.date) : ''
              }
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
          setTempSelectedRecipient(selectedRecipient);
          setShowRecipient(false);
          setTimeout(() => {
            setOpen(true);
          }, 100);
        }}
        open={showRecipient}
        extraData={tempSelectedRecipient?.id || 'none'}
        listWrapperStyle={{
          paddingVertical: s(10),
        }}
        listFooterComponent={
          <AppBtn
            title="Select Recipient"
            onPress={handleRecipientConfirm}
            isDisabled={!tempSelectedRecipient}
            btnStyle={{
              marginTop: s(20),
            }}
          />
        }
        listItem={item => {
          const isActive = tempSelectedRecipient?.id === item.id;
          return (
            <ResItem
              onPress={() => {
                setTempSelectedRecipient(item);
              }}
              active={isActive}
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
          setTempSelectedCategory(selectedCategory);
          setShowCategory(false);
          setTimeout(() => {
            setOpen(true);
          }, 100);
        }}
        open={showCategory}
        extraData={tempSelectedCategory?.id || 'none'}
        listWrapperStyle={{
          paddingVertical: s(10),
          gap: s(10),
        }}
        listFooterComponent={
          <AppBtn
            title="Select Category"
            onPress={handleCategoryConfirm}
            isDisabled={!tempSelectedCategory}
            btnStyle={{
              marginTop: s(20),
            }}
          />
        }
        listItem={(item: CategoryModel) => {
          const isActive = tempSelectedCategory?.id === item.id;
          return (
            <CheckItemCard
              active={isActive}
              onPress={() => {
                setTempSelectedCategory(item);
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
  onPress: () => void;
  active: boolean;
}) => {
  return (
    <Pressable onPress={onPress}>
      <HStack
        style={{ gap: s(10) }}
        className="items-center justify-between"
      >
        <HStack className="items-center gap-2">
          <AvatarCard
            style={{
              backgroundColor: resColor,
            }}
            size={"smd"}
            name={recipient?.name}
          />
          <Text
            className="default-text capitalize"
            style={[
              textStyles.textSm,
              {
                fontFamily: regularFontFamily,
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
    </Pressable>
  );
};

const CheckItemCard = ({
  category,
  onPress,
  active,
}: {
  category: CategoryModel;
  onPress: () => void;
  active: boolean;
}) => {
  return (
    <Pressable onPress={onPress}>
      <HStack
        style={{ gap: s(10) }}
        className="items-center justify-between"
      >
        <HStack className="items-center gap-2">
          <Text
            className="default-text"
            style={[
              textStyles.textSm,
              {
                fontFamily: regularFontFamily,
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
    </Pressable>
  );
};
