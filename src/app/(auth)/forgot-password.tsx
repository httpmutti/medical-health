import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Button, Typography } from "@/components/ui";
import { AuthHeader, InputField } from "@/components/auth";

export default function ForgotPasswordScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6">

        <AuthHeader title="Forgot Password" />

        <View className="h-4" />

        <Typography variant="description" color="ink">
          Enter your registered email address. We'll send you a verification code to reset your password.
        </Typography>

        <View className="h-8" />

        <InputField
          label="Email Address"
          placeholder="example@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
        />

        <View className="h-10" />

        <Button
          label="Send Code"
          variant="primary"
          onPress={() => router.push("/(auth)/verify-otp")}
        />

      </View>
    </SafeAreaView>
  );
}
