import { Center } from '@/components/ui/center';
import { Spinner } from '@/components/ui/spinner';
import { Text } from '@/components/ui/text';
import { textStyles } from '@core/styles/text-style';
import { s } from '@core/utils/scale';
import { UseQueryResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import React from 'react';
import { View } from 'react-native';
import { AppBtn } from '../buttons/app-btn';

interface Props {
  children: React.ReactNode;
  queryData?: UseQueryResult<AxiosResponse<any, any>, Error> | undefined | null;
}

export const ActionSheetLoaderWrapper: React.FC<Props> = ({
  queryData,
  children,
}) => {

  if (queryData?.isLoading)
    return (
      <View
        style={{
          height: s(100),
        }}>
        <Center className="flex items-center justify-center h-full ">
          <Spinner size="large" color="#000" />
        </Center>
      </View>
    );
  if (queryData?.isError)
    return (
      <View
        style={{
          height: s(100),
          marginBottom: s(30),
        }}>
        <Center className="flex items-center justify-center h-full gap-3 ">
          <Text style={textStyles.textSm}>Something went wrong try again</Text>
          <AppBtn
            onPress={queryData?.refetch}
            btnStyle={{height: s(35)}}
            title="Try again"
          />
        </Center>
      </View>
    );
  return <>{children}</>;
};
