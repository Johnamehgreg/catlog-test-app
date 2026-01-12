import { useDarkMode } from "@core/hooks/logic/use-dark-mode";
import { s } from "@core/utils/scale";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

interface Props {
  count?: number;
}

export const DashboardGridSkeleton: React.FC<Props> = ({ count = 4 }) => {
  const { isDark } = useDarkMode()
  const opacity = useRef(new Animated.Value(0.3)).current;

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

  const skeletonBackground = isDark ? '#2A2A2A' : '#E5E7EB';

  return (
    <View style={styles.grid}>
      {Array.from({ length: count }).map((_, index) => (
        <Animated.View
          key={index}
          style={[
            styles.card,
            {
              backgroundColor: skeletonBackground,
              opacity,
            },
          ]}
        >
          {/* Icon Skeleton */}
          <Animated.View
            style={[
              styles.iconSkeleton,
              {
                backgroundColor: isDark ? '#1F1F1F' : '#D1D5DB',
                opacity,
              },
            ]}
          />

          {/* Content Skeleton */}
          <View style={styles.content}>
            {/* Title Skeleton */}
            <Animated.View
              style={[
                styles.titleSkeleton,
                {
                  backgroundColor: isDark ? '#1F1F1F' : '#D1D5DB',
                  opacity,
                },
              ]}
            />

            {/* Value Skeleton */}
            <Animated.View
              style={[
                styles.valueSkeleton,
                {
                  backgroundColor: isDark ? '#1F1F1F' : '#D1D5DB',
                  opacity,
                },
              ]}
            />
          </View>
        </Animated.View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: s(16),
    marginBottom: s(24),
  },
  card: {
    width: '48%',
    borderRadius: s(12),
    padding: s(16),
    height: s(140),
    justifyContent: 'space-between',
  },
  iconSkeleton: {
    width: s(48),
    height: s(48),
    borderRadius: s(24),
    marginBottom: s(12),
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    gap: s(8),
  },
  titleSkeleton: {
    height: s(12),
    width: '70%',
    borderRadius: s(4),
  },
  valueSkeleton: {
    height: s(20),
    width: '60%',
    borderRadius: s(4),
  },
});
