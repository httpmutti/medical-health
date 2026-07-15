import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppSelector } from '@/store/store.hooks';
import { selectCurrentUser, selectIsInitializing } from '@/features/auth/auth.slice';
import { useAuth } from '@/features/auth/hooks';
import { Button, Typography, HomeSkeleton } from '@/components/ui';

export default function HomeScreen() {
  const user = useAppSelector(selectCurrentUser);
  const isInitializing = useAppSelector(selectIsInitializing);
  const { logout, logoutState } = useAuth();

  if (isInitializing || !user) return <HomeSkeleton />;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6 justify-center items-center gap-4">
        <Typography variant="heading" color="primary">
          Welcome, {user.firstName}!
        </Typography>
        <Typography variant="description" color="ink">{user.email}</Typography>
        <View className="h-8" />
        <Button
          label="Sign Out"
          variant="ghost"
          loading={logoutState.isLoading}
          onPress={logout}
        />
      </View>
    </SafeAreaView>
  );
}
