import { useEffect, useRef } from 'react';
import { Animated, View, type ViewStyle } from 'react-native';
import { colors } from '@/theme/tokens';

interface SkeletonProps {
  width?: number | `${number}%`;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
}

export function Skeleton({ width = '100%', height = 20, borderRadius = 12, style }: SkeletonProps) {
  const opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 750, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.4, duration: 750, useNativeDriver: true }),
      ]),
    );
    pulse.start();
    return () => pulse.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius,
          backgroundColor: colors.tertiary,
          opacity,
        },
        style,
      ]}
    />
  );
}

// ── Preset field skeleton ─────────────────────────────────────────

export function SkeletonField() {
  return (
    <View style={{ gap: 8 }}>
      <Skeleton width="35%" height={16} borderRadius={8} />
      <Skeleton width="100%" height={48} borderRadius={12} />
    </View>
  );
}
