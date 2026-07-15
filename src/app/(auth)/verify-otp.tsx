import { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { Button, Typography } from "@/components/ui";
import { AuthHeader, OtpInput } from "@/components/auth";
import { useAuth } from "@/features/auth/hooks";
import { useFormError } from "@/features/auth/hooks";
import { colors, font } from "@/theme/tokens";

export default function VerifyOtpScreen() {
  const { email } = useLocalSearchParams<{ email: string }>();
  const [otp, setOtp] = useState("");

  const { verifyOtp, verifyOtpState, forgotPassword, forgotPasswordState } = useAuth();
  const { globalError } = useFormError(verifyOtpState.error);

  const handleVerify = async () => {
    if (otp.length !== 6) return;
    try {
      await verifyOtp({ email, otp });
      router.push({ pathname: "/(auth)/set-password", params: { email, otp } });
    } catch {
      // errors handled by useFormError
    }
  };

  const handleResend = async () => {
    try {
      await forgotPassword({ email });
    } catch {
      // silent — same "check your email" UX regardless
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6">

        <AuthHeader title="Verify Your Email" />

        <View className="h-4" />

        <Typography variant="description" color="ink">
          We've sent a 6-digit verification code to{" "}
          <Text style={{ color: colors.primary }}>{email}</Text>. Please check your inbox.
        </Typography>

        <View className="h-10" />

        <OtpInput length={6} onComplete={setOtp} />

        <View className="h-4" />

        <View className="flex-row justify-center">
          <Typography variant="description" color="ink">Didn't receive a code? </Typography>
          <TouchableOpacity
            hitSlop={{ top: 8, bottom: 8, left: 4, right: 4 }}
            onPress={handleResend}
            disabled={forgotPasswordState.isLoading}
          >
            <Typography variant="value" color="primary">
              {forgotPasswordState.isLoading ? "Sending…" : "Resend"}
            </Typography>
          </TouchableOpacity>
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
          label="Verify"
          variant="primary"
          loading={verifyOtpState.isLoading}
          disabled={otp.length !== 6}
          onPress={handleVerify}
        />

      </View>
    </SafeAreaView>
  );
}
