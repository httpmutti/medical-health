import "../../global.css";
import { Stack } from "expo-router";
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

SplashScreen.preventAutoHideAsync();

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
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaProvider>
  );
}
