import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Typography } from "@/components/ui";
import { AuthHeader, PasswordField } from "@/components/auth";

export default function SetPasswordScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6" contentContainerStyle={{ paddingBottom: 32 }} showsVerticalScrollIndicator={false}>

        <AuthHeader title="Set Password" />

        <View className="h-4" />

        <Typography variant="description" color="ink">
          Create a strong password to keep your account and health data secure.
        </Typography>

        <View className="h-8" />

        <View className="gap-4">
          <PasswordField
            label="Password"
            placeholder="••••••••••••"
          />
          <PasswordField
            label="Confirm Password"
            placeholder="••••••••••••"
          />
        </View>

        <View className="h-10" />

        <Button label="Create New Password" variant="primary" />

      </ScrollView>
    </SafeAreaView>
  );
}
