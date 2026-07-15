import "../../global.css";
import { Stack, useRouter, useSegments } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "@expo-google-fonts/league-spartan";
import {
  LeagueSpartan_300Light,
  LeagueSpartan_400Regular,
  LeagueSpartan_500Medium,
  LeagueSpartan_600SemiBold,
  LeagueSpartan_700Bold,
} from "@expo-google-fonts/league-spartan";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { PostHogProvider } from "posthog-react-native";
import { store } from "@/store";
import { useAppSelector } from "@/store/store.hooks";
import { selectIsAuthenticated, selectIsInitializing } from "@/features/auth/auth.slice";
import { useAuthInit } from "@/features/auth/hooks/useAuthInit";
import { useScreenTracking } from "@/features/analytics/hooks/useScreenTracking";
import { POSTHOG_API_KEY, POSTHOG_HOST } from "@/lib/posthog";

SplashScreen.preventAutoHideAsync();

function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const segments = useSegments();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isInitializing = useAppSelector(selectIsInitializing);

  useAuthInit();
  useScreenTracking();

  useEffect(() => {
    if (isInitializing) return;

    const segment = segments[0] as string;
    const inAuthGroup = segment === '(auth)';
    const inHomeGroup = segment === '(home)';

    if (!isAuthenticated && inHomeGroup) {
      router.replace('/(auth)/login');
    } else if (isAuthenticated && inAuthGroup) {
      router.replace('/(home)');
    }
  }, [isAuthenticated, isInitializing, segments, router]);

  if (isInitializing) return null;

  return <>{children}</>;
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "LeagueSpartan-Light":    LeagueSpartan_300Light,
    "LeagueSpartan-Regular":  LeagueSpartan_400Regular,
    "LeagueSpartan-Medium":   LeagueSpartan_500Medium,
    "LeagueSpartan-SemiBold": LeagueSpartan_600SemiBold,
    "LeagueSpartan-Bold":     LeagueSpartan_700Bold,
  });

  useEffect(() => {
    if (loaded || error) SplashScreen.hideAsync();
  }, [loaded, error]);

  if (!loaded && !error) return null;

  return (
    <PostHogProvider
      apiKey={POSTHOG_API_KEY}
      options={{ host: POSTHOG_HOST }}
    >
      <Provider store={store}>
        <SafeAreaProvider>
          <AuthGuard>
            <Stack screenOptions={{ headerShown: false }} />
          </AuthGuard>
        </SafeAreaProvider>
      </Provider>
    </PostHogProvider>
  );
}
