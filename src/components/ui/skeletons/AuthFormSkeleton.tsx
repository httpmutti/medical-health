import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Skeleton, SkeletonField } from '../Skeleton';

interface AuthFormSkeletonProps {
  fields?: number;
}

export function AuthFormSkeleton({ fields = 2 }: AuthFormSkeletonProps) {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6">
        {/* Back arrow placeholder */}
        <View className="h-14 justify-center">
          <Skeleton width={32} height={32} borderRadius={16} />
        </View>

        {/* Title */}
        <Skeleton width="50%" height={28} borderRadius={8} style={{ marginBottom: 8 }} />
        {/* Subtitle */}
        <Skeleton width="90%" height={14} borderRadius={6} />
        <Skeleton width="70%" height={14} borderRadius={6} style={{ marginTop: 4, marginBottom: 32 }} />

        {/* Input fields */}
        <View style={{ gap: 16 }}>
          {Array.from({ length: fields }).map((_, i) => (
            <SkeletonField key={i} />
          ))}
        </View>

        <View style={{ marginTop: 40 }}>
          {/* Button */}
          <Skeleton width="100%" height={56} borderRadius={999} />
        </View>
      </View>
    </SafeAreaView>
  );
}
