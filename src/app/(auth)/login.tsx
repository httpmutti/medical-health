import { View, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Button, Typography } from "@/components/ui";
import { AuthHeader, InputField, PasswordField, SocialSection, AuthFooter } from "@/components/auth";

export default function LoginScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6" contentContainerStyle={{ paddingBottom: 32 }} showsVerticalScrollIndicator={false}>

        <AuthHeader title="Log In" />

        <View className="h-8" />

        {/* Welcome */}
        <Typography variant="title" color="primary">Welcome</Typography>
        <View className="h-2" />
        <Typography variant="description" color="ink">
          Sign in to access your personalized dermatology care, appointments, and health records.
        </Typography>

        <View className="h-8" />

        {/* Fields */}
        <View className="gap-4">
          <InputField
            label="Email or Mobile Number"
            placeholder="example@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <PasswordField
            label="Password"
            placeholder="••••••••••••"
          />
        </View>

        {/* Forgot password */}
        <View className="h-2" />
        <TouchableOpacity className="items-end" onPress={() => router.push("/(auth)/forgot-password")}>
          <Typography variant="value" color="primary">Forget Password</Typography>
        </TouchableOpacity>

        <View className="h-8" />

        <Button label="Log In" variant="primary" />

        <View className="h-6" />

        <SocialSection label="or sign up with" showGoogle showFacebook showFingerprint />

        <View className="h-6" />

        <AuthFooter
          label="Don't have an account?"
          linkLabel="Sign Up"
          onPress={() => router.push("/(auth)/signup")}
        />

      </ScrollView>
    </SafeAreaView>
  );
}
