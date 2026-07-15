import { useState } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Button, Typography } from "@/components/ui";
import { AuthHeader, InputField } from "@/components/auth";
import { useAuth } from "@/features/auth/hooks";
import { useFormError } from "@/features/auth/hooks";
import { colors, font } from "@/theme/tokens";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");

  const { forgotPassword, forgotPasswordState } = useAuth();
  const { fieldErrors, globalError } = useFormError(forgotPasswordState.error);

  const handleSend = async () => {
    try {
      await forgotPassword({ email });
      router.push({ pathname: "/(auth)/verify-otp", params: { email } });
    } catch {
      // errors handled by useFormError
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6">

        <AuthHeader title="Forgot Password" />

        <View className="h-4" />

        <Typography variant="description" color="ink">
          Enter your registered email address and we'll send a 6-digit verification code to reset your password.
        </Typography>

        <View className="h-8" />

        <InputField
          label="Email Address"
          placeholder="Enter your registered email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          value={email}
          onChangeText={setEmail}
          error={fieldErrors.email}
        />

        {globalError ? (
          <View className="mt-4 bg-muted rounded-xl px-4 py-3">
            <Text style={{ fontFamily: font.family.light, fontSize: 13, color: colors.error }}>
              {globalError}
            </Text>
          </View>
        ) : null}

        <View className="h-10" />

        <Button
          label="Send Code"
          variant="primary"
          loading={forgotPasswordState.isLoading}
          onPress={handleSend}
        />

      </View>
    </SafeAreaView>
  );
}
