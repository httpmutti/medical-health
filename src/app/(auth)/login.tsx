import { useState } from "react";
import { View, ScrollView, TouchableOpacity, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Button, Typography } from "@/components/ui";
import { AuthHeader, InputField, PasswordField, SocialSection, AuthFooter } from "@/components/auth";
import { useAuth } from "@/features/auth/hooks";
import { useFormError } from "@/features/auth/hooks";
import { colors, font } from "@/theme/tokens";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, loginState } = useAuth();
  const { fieldErrors, globalError } = useFormError(loginState.error);

  const handleLogin = async () => {
    try {
      await login({ email, password });
    } catch {
      // errors handled by useFormError
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6" contentContainerStyle={{ paddingBottom: 32 }} showsVerticalScrollIndicator={false}>

        <AuthHeader title="Sign In" />

        <View className="h-8" />

        <Typography variant="title" color="primary">Welcome Back</Typography>
        <View className="h-2" />
        <Typography variant="description" color="ink">
          Sign in to access your dermatology care, appointments, and health records.
        </Typography>

        <View className="h-8" />

        <View className="gap-4">
          <InputField
            label="Email Address"
            placeholder="Enter your email address"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            value={email}
            onChangeText={setEmail}
            error={fieldErrors.email}
          />
          <PasswordField
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            error={fieldErrors.password}
          />
        </View>

        <View className="h-2" />
        <TouchableOpacity className="items-end" onPress={() => router.push("/(auth)/forgot-password")}>
          <Typography variant="value" color="primary">Forgot Password?</Typography>
        </TouchableOpacity>

        {globalError ? (
          <View className="mt-4 bg-muted rounded-xl px-4 py-3">
            <Text style={{ fontFamily: font.family.light, fontSize: 13, color: colors.error }}>
              {globalError}
            </Text>
          </View>
        ) : null}

        <View className="h-8" />

        <Button
          label="Log In"
          variant="primary"
          loading={loginState.isLoading}
          onPress={handleLogin}
        />

        <View className="h-6" />

        <SocialSection label="or sign in with" showGoogle showFacebook showFingerprint />

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
