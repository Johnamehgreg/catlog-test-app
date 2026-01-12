'use client';

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { queryClient } from '@core/utils/helpers';
import { QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function TanstackQueryProvider({ children }: { children: React.ReactNode }) {

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <TanstackQueryProvider>
      <SafeAreaProvider>
        <GluestackUIProvider>
          {children}
        </GluestackUIProvider>
      </SafeAreaProvider>
    </TanstackQueryProvider>
  );
};

export default Providers;
