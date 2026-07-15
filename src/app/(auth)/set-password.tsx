import { useState } from "react";
import { View, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { Button, Typography } from "@/components/ui";
import { AuthHeader, PasswordField } from "@/components/auth";
import { useAuth } from "@/features/auth/hooks";
import { useFormError } from "@/features/auth/hooks";
import { colors, font } from "@/theme/tokens";

export default function SetPasswordScreen() {
  const { email, otp } = useLocalSearchParams<{ email: string; otp: string }>();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { setPassword: setNewPassword, setPasswordState } = useAuth();
  const { fieldErrors, globalError } = useFormError(setPasswordState.error);

  const handleSubmit = async () => {
    try {
      await setNewPassword({ email, otp, password, confirmPassword });
    } catch {
      // errors handled by useFormError
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6" contentContainerStyle={{ paddingBottom: 32 }} showsVerticalScrollIndicator={false}>

        <AuthHeader title="Reset Password" />

        <View className="h-4" />

        <Typography variant="description" color="ink">
          Choose a strong password to keep your account and health data secure. Do not share it with anyone.
        </Typography>

        <View className="h-8" />

        <View className="gap-4">
          <PasswordField
            label="New Password"
            placeholder="Enter your new password"
            value={password}
            onChangeText={setPassword}
            error={fieldErrors.password}
          />
          <PasswordField
            label="Confirm New Password"
            placeholder="Re-enter your new password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            error={fieldErrors.confirmPassword}
          />
        </View>

        {globalError ? (
          <View className="mt-4 bg-muted rounded-xl px-4 py-3">
            <Text style={{ fontFamily: font.family.light, fontSize: 13, color: colors.error }}>
              {globalError}
            </Text>
          </View>
        ) : null}

        <View className="h-10" />

        <Button
          label="Reset Password"
          variant="primary"
          loading={setPasswordState.isLoading}
          onPress={handleSubmit}
        />

      </ScrollView>
    </SafeAreaView>
  );
}
