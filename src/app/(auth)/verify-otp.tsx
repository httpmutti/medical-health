import { View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Button, Typography } from "@/components/ui";
import { AuthHeader, OtpInput } from "@/components/auth";

export default function VerifyOtpScreen() {
  const handleComplete = (code: string) => {
    console.log("OTP entered:", code);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6">

        <AuthHeader title="Verify Code" />

        <View className="h-4" />

        <Typography variant="description" color="ink">
          Enter the 6-digit code we sent to your email address.
        </Typography>

        <View className="h-10" />

        <OtpInput length={6} onComplete={handleComplete} />

        <View className="h-4" />

        {/* Resend */}
        <View className="flex-row justify-center">
          <Typography variant="description" color="ink">Didn't receive a code? </Typography>
          <TouchableOpacity hitSlop={{ top: 8, bottom: 8, left: 4, right: 4 }}>
            <Typography variant="value" color="primary">Resend</Typography>
          </TouchableOpacity>
        </View>

        <View className="h-10" />

        <Button
          label="Verify"
          variant="primary"
          onPress={() => router.push("/(auth)/set-password")}
        />

      </View>
    </SafeAreaView>
  );
}
