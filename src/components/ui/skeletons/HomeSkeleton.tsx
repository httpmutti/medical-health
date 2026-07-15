import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Skeleton } from '../Skeleton';

export function HomeSkeleton() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6">
        {/* Header row */}
        <View className="flex-row items-center justify-between h-16">
          <View style={{ gap: 6 }}>
            <Skeleton width={120} height={14} borderRadius={6} />
            <Skeleton width={180} height={22} borderRadius={8} />
          </View>
          <Skeleton width={44} height={44} borderRadius={22} />
        </View>

        <View style={{ marginTop: 24, gap: 16 }}>
          {/* Stats row */}
          <View className="flex-row gap-4">
            <Skeleton width="48%" height={100} borderRadius={16} />
            <Skeleton width="48%" height={100} borderRadius={16} />
          </View>

          {/* Section title */}
          <Skeleton width="40%" height={18} borderRadius={6} style={{ marginTop: 8 }} />

          {/* Cards */}
          {[1, 2, 3].map((i) => (
            <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <Skeleton width={56} height={56} borderRadius={16} />
              <View style={{ flex: 1, gap: 6 }}>
                <Skeleton width="60%" height={16} borderRadius={6} />
                <Skeleton width="40%" height={12} borderRadius={6} />
              </View>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}
