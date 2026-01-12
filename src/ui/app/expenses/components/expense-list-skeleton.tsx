import { VStack } from "@/components/ui/vstack";
import { useDarkMode } from "@core/hooks/logic/use-dark-mode";
import { s } from "@core/utils/scale";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

interface Props {
  count?: number;
}

export const ExpenseListSkeleton: React.FC<Props> = ({ count = 4 }) => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  const { isDark } = useDarkMode()
  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [opacity]);


  return (
    <VStack style={{ gap: s(16) }}>
      <Animated.View
        className={'skeleton-bg'}
        style={[
          {
            height: s(24),
            width: s(120),
            borderRadius: s(4),
            opacity,
            marginBottom: s(8),
          },
        ]}
      />

      {Array.from({ length: count }).map((_, index) => (
        <Animated.View
          key={index}
          className={'skeleton-bg'}
          style={[
            styles.card,
            {
              opacity: 1,
            },
          ]}
        >
          <View style={styles.topRow}>
            <View style={{ flexDirection: 'row', gap: s(12), flex: 1 }}>
              {/* Receipt Icon Skeleton */}
              <Animated.View
                className={'skeleton-bg'}

                style={[
                  styles.receiptIconSkeleton,
                  {
                    opacity,
                  },
                ]}
              />

              {/* Title and Amount Skeleton */}
              <View style={{ flex: 1, gap: s(8) }}>
                <Animated.View
                  className={'skeleton-bg'}

                  style={[
                    styles.titleSkeleton,
                    {
                      opacity,
                    },
                  ]}
                />
                <Animated.View
                  style={[
                    styles.amountSkeleton,
                    {
                      opacity,
                    },
                  ]}
                />
              </View>
            </View>

            {/* Menu Icon Skeleton */}
            <Animated.View
              className={'skeleton-bg'}

              style={[
                styles.menuIconSkeleton,
                {
                  opacity,
                },
              ]}
            />
          </View>

          {/* Bottom Row Skeleton */}
          <View
            style={[
              styles.bottomRow,
              {
                borderTopColor: isDark ? '#374151' : '#F3F4F6',
              },
            ]}
          >
            <View style={{ flexDirection: 'row', gap: s(8), alignItems: 'center' }}>
              {/* Avatar Skeleton */}
              <Animated.View
                className={'skeleton-bg'}

                style={[
                  styles.avatarSkeleton,
                  {
                    opacity,
                  },
                ]}
              />

              {/* Recipient Name Skeleton */}
              <Animated.View
                className={'skeleton-bg'}

                style={[
                  styles.recipientNameSkeleton,
                  {
                    opacity,
                  },
                ]}
              />
            </View>

            {/* Tag Skeleton (sometimes shown) */}
            {index % 3 !== 0 && (
              <Animated.View
                className={'skeleton-bg'}

                style={[
                  styles.tagSkeleton,
                  {
                    opacity,
                  },
                ]}
              />
            )}
          </View>
        </Animated.View>
      ))}
    </VStack>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: s(12),
    padding: s(16),
    marginBottom: s(12),
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: s(12),
  },
  receiptIconSkeleton: {
    width: s(40),
    height: s(40),
    borderRadius: s(8),
  },
  titleSkeleton: {
    height: s(16),
    width: '80%',
    borderRadius: s(4),
  },
  amountSkeleton: {
    height: s(18),
    width: '50%',
    borderRadius: s(4),
  },
  menuIconSkeleton: {
    width: s(20),
    height: s(20),
    borderRadius: s(4),
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: s(12),
    borderTopWidth: 1,
  },
  avatarSkeleton: {
    width: s(32),
    height: s(32),
    borderRadius: s(16),
  },
  recipientNameSkeleton: {
    height: s(14),
    width: s(100),
    borderRadius: s(4),
  },
  tagSkeleton: {
    height: s(20),
    width: s(80),
    borderRadius: s(12),
  },
});
