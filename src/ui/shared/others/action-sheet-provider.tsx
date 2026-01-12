import { UseQueryResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, StyleProp, View, ViewStyle } from 'react-native';

import { Box } from '@/components/ui/box';
import { s } from '@core/utils/scale';

import { Text } from '@/components/ui/text';
import { boldFontFamily, textStyles } from '@core/styles/text-style';
import { SearchInput } from '../inputs/search-input';
import { ActionSheetComponent } from './action-sheet';
import { ActionSheetLoaderWrapper } from './action-sheet-loader';
import { NotItemFound } from './not-item-found';

interface Props {
  open: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  topComponent?: React.ReactNode;
  emptyComponent?: React.ReactNode;
  topListComponent?: React.ReactNode;
  listFooterComponent?: React.ReactNode;
  list?: any[];
  listItem?: (item: any) => React.ReactNode;
  hideSearch?: boolean;
  queryData?: UseQueryResult<AxiosResponse<any, any>, Error> | null | undefined;
  listClassNameWrapper?: string;
  listWrapperStyle?: StyleProp<ViewStyle>;
  searchPlaceholder?: string;
  emptyMessage?: string;
  extraData?: any;
}

export const ActionSheetProvider: React.FC<Props> = ({
  open,
  onClose,
  title,
  children,
  list,
  listItem,
  hideSearch,
  queryData,
  topComponent,
  emptyComponent,
  topListComponent,
  listFooterComponent,
  listWrapperStyle,
  listClassNameWrapper,
  emptyMessage,
  searchPlaceholder = 'Search...',
  extraData,
}) => {
  const [queryText, setQueryText] = useState('');
  const filteredList = useMemo(() => {
    if (!queryText) return list;

    const query = queryText.toLowerCase();

    return list?.filter(({ name, label, description }) =>
      [name, label, description].some(
        field => field?.toLowerCase().includes(query)
      )
    );
  }, [list, queryText]);

  const renderList = useCallback(() => {
    if (filteredList?.length === 0) {
      return (
        emptyComponent || (
          <NotItemFound message={emptyMessage || 'No item found'} />
        )
      );
    }
    return (
      <View className={`${listClassNameWrapper} `}>
        <FlatList
          key={`flatlist-${extraData}`}
          data={filteredList}
          keyExtractor={(item, index) => `${item?.id} ${index} `}
          extraData={extraData}
          ListHeaderComponent={() => {
            return <>{topListComponent}</>;
          }}
          ListFooterComponent={() => {
            return <>{listFooterComponent}</>;
          }}
          contentContainerStyle={[
            { paddingBottom: s(150), flexGrow: 1 },
            listWrapperStyle,
          ]}
           className='bg-[#FAFAFA] dark:bg-[#1f2937f7] rounded-2xl p-4 mt-4'
          renderItem={({ item }) => (
            <Box className="!w-full">{listItem?.(item)}</Box>
          )}
          showsVerticalScrollIndicator={false}
          initialNumToRender={20}
          maxToRenderPerBatch={50}
          windowSize={10}
        />
      </View>
    );
  }, [filteredList, extraData, listItem, topListComponent, listFooterComponent, listWrapperStyle, listClassNameWrapper, emptyComponent, emptyMessage]);

  return (
    <ActionSheetComponent open={open} close={onClose}>
      <Box className="!w-full !h-full">
        {title && (
          <Box>
            <Text
              style={[textStyles.textBase, {
                fontFamily: boldFontFamily,
                marginBottom: s(15)
              }]}
              className="action-sheet-title-text">
              {title}
            </Text>
          </Box>
        )}

        {topComponent}

        {!hideSearch && (
          <SearchInput
            style={{ marginBottom: s(25) }}
            value={queryText}
            onChangeText={setQueryText}
            placeholder={searchPlaceholder}
          />
        )}

        <ActionSheetLoaderWrapper queryData={queryData}>
          {list && renderList()}
          {children}
        </ActionSheetLoaderWrapper>
      </Box>
    </ActionSheetComponent>
  );
};
