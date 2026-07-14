import { uiIcons } from "@/assets/icons/icons";
import { Button, Typography } from "@/components/ui";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

export default function WelcomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6">

        {/* Logo — takes all remaining space, centred */}
        <View className="flex-1 items-center justify-center">
          <uiIcons.LogoWithTextSvg size={200} />
        </View>

        {/* Description + buttons pinned to bottom */}
        <View className="pb-10">
          <View className="px-[62px]">
            <Typography variant="description" color="ink" center>
              Your skin deserves expert care. Connect with top dermatologists and
              get personalized treatment from the comfort of your home.
            </Typography>
          </View>
          <View className="h-12" />
          <View className="px-14">
            <Button label="Log In" variant="primary" onPress={() => router.push("/(auth)/login")} />
            <View className="h-3" />
            <Button label="Sign Up" variant="tertiary" onPress={() => router.push("/(auth)/signup")} />
          </View>
        </View>

      </View>
    </SafeAreaView>
  );
}
