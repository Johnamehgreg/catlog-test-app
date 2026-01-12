import { Center } from '@/components/ui/center';
import { Text } from '@/components/ui/text';
import { textStyles } from '@core/styles/text-style';
import { s } from '@core/utils/scale';
import {
  InfiniteData,
  UseInfiniteQueryResult,
  UseQueryResult,
} from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  FlatList,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';
import { AppBtn } from '../buttons/app-btn';
import { NotItemFound } from '../others/not-item-found';

interface Props {
  children?: React.ReactNode;
  queryData:
  | UseQueryResult<AxiosResponse<any, any>, Error>
  | UseInfiniteQueryResult<InfiniteData<any, unknown>, Error>
  | any;
  loaderComponent?: React.ReactNode;
  isRefreshing?: boolean;
  onRefresh?: () => void;
  enableDragRefresh?: boolean;
  isEmptyList?: boolean;
  emptyListMessage?: string;
  emptyListComponent?: React.ReactNode;
  list?: any[];
  renderListItem?: ({ item }: { item: any }) => React.JSX.Element;
  handleLoadMore?: () => void;
  isFlatList?: boolean;
  renderFooterList?: React.ReactNode;
  ListHeaderComponent?: React.ReactNode;
}

export const LoaderLayout: React.FC<Props> = ({
  children,
  queryData,
  loaderComponent,
  isRefreshing,
  enableDragRefresh = false,
  onRefresh,
  isEmptyList,
  emptyListMessage,
  emptyListComponent,
  list,
  renderListItem,
  handleLoadMore,
  isFlatList,
  renderFooterList,
  ListHeaderComponent
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [pullDistance] = useState(new Animated.Value(0));


  useEffect(() => {
    if (queryData?.isSuccess && queryData?.isFetched) {
      setIsLoaded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    queryData?.isSuccess,
    queryData?.data,
    queryData?.isFetched,
    queryData?.isFetching,
  ]);

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY < 0) {
      pullDistance.setValue(Math.abs(offsetY));
    } else {
      pullDistance.setValue(0);
    }
  };

  const keyExtractor = useCallback(
    (item: any, index: number) => `${item.order_id}-${index}`,
    [],
  );

  const renderFooter = useCallback(() => {
    if (!queryData?.isFetchingNextPage) return null;
    if (!isEmptyList)
      return (
        <>
          <ActivityIndicator
            size={30}
            color={
              '#000'
            }
          />
        </>
      );
  }, [queryData?.isFetchingNextPage, isEmptyList]);

  const renderEmptyComponent = useCallback(() => {
    if (isEmptyList && !queryData?.isFetching)
      return (
        <>
          {emptyListComponent ? (
            emptyListComponent
          ) : (
            <NotItemFound message={emptyListMessage} />
          )}
        </>
      );
  }, [
    isEmptyList,
    queryData?.isFetching,
    emptyListComponent,
    emptyListMessage,
  ]);

  if (queryData?.isLoading && !isLoaded && loaderComponent) {
    return loaderComponent;
  }

  if (queryData?.isError)
    return <ErrorLoaderComponent onRefresh={queryData?.refetch} />;
  return (
    <>
      {enableDragRefresh ? (
        <>
          {isFlatList ? (
            <View className="flex-1">
              <FlatList

                data={list}
                renderItem={renderListItem}
                keyExtractor={keyExtractor}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                ListHeaderComponent={() => {
                  return ListHeaderComponent
                }}
                ListFooterComponent={() => {
                  return (
                    <>
                      {renderFooter} {renderFooterList}
                    </>
                  );
                }}
                ListEmptyComponent={renderEmptyComponent}
                showsVerticalScrollIndicator={false}
                refreshControl={
                  <RefreshControl
                    refreshing={queryData?.isFetching || !!isRefreshing}
                    onRefresh={() => {
                      queryData?.refetch?.();
                      onRefresh?.();
                    }}
                    tintColor={
                      '#00'
                    }
                    progressBackgroundColor="#ffffff"
                  />
                }
                contentContainerStyle={{
                  gap: s(12),
                  flexGrow: 1,
                }}
              />
            </View>
          ) : (
            <ScrollView
              className="flex-1 "
              refreshControl={
                enableDragRefresh ? (
                  <RefreshControl
                    refreshing={queryData?.isFetching || !!isRefreshing}
                    onRefresh={() => {
                      queryData?.refetch?.();
                      onRefresh?.();
                    }}
                    tintColor={
                      '#fff'
                    }
                    progressBackgroundColor="#ffffff"
                  />
                ) : undefined
              }
              onScroll={enableDragRefresh ? handleScroll : undefined}
              scrollEventThrottle={16}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              keyboardShouldPersistTaps="handled">
              {renderEmptyComponent()}
              {children}
            </ScrollView>
          )}
        </>
      ) : (
        children
      )}
    </>
  );
};

export const RefreshControlComponent = ({
  isFetching,
  onRefresh,
}: {
  isFetching: boolean;
  onRefresh: () => void;
}) => {
  return (
    <RefreshControl
      refreshing={isFetching}
      onRefresh={() => {
        onRefresh?.();
      }}
      tintColor={
        '#000'}
      progressBackgroundColor="#ffffff"
    />
  );
};

export const ErrorLoaderComponent = ({ onRefresh }: { onRefresh: () => void }) => {
  return (
    <View
      className="flex-1 "
      style={{
        height: s(100),
      }}>
      <Center className="flex items-center justify-center h-full gap-3 ">

        <Text
          style={[
            textStyles.textBase,
            {
              marginBottom: s(10),
            },
          ]}>
          Something went wrong try again
        </Text>
        <AppBtn
          onPress={onRefresh}
          btnStyle={{ height: s(35) }}
          title="Try again"
        />
      </Center>
    </View>
  );
};
