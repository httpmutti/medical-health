import { useState } from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Button, Typography, ComingSoonModal } from "@/components/ui";
import { AuthHeader, InputField, PasswordField, SocialSection, AuthFooter } from "@/components/auth";
import { useAuth } from "@/features/auth/hooks";
import { useFormError } from "@/features/auth/hooks";
import { textStyles, colors, font } from "@/theme/tokens";

export default function SignUpScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [legalModal, setLegalModal] = useState<"terms" | "privacy" | null>(null);

  const { register, registerState } = useAuth();
  const { fieldErrors, globalError } = useFormError(registerState.error);

  const handleRegister = async () => {
    try {
      await register({ firstName, lastName, email, phone, password });
    } catch {
      // errors handled by useFormError
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6" contentContainerStyle={{ paddingBottom: 32 }} showsVerticalScrollIndicator={false}>

        <AuthHeader title="Create Account" />

        <View className="h-6" />

        <View className="gap-4">
          <InputField
            label="First Name"
            placeholder="Enter your first name"
            autoCapitalize="words"
            value={firstName}
            onChangeText={setFirstName}
            error={fieldErrors.firstName}
          />
          <InputField
            label="Last Name"
            placeholder="Enter your last name"
            autoCapitalize="words"
            value={lastName}
            onChangeText={setLastName}
            error={fieldErrors.lastName}
          />
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
          <InputField
            label="Mobile Number"
            placeholder="Enter your mobile number"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
            error={fieldErrors.phone}
          />
          <PasswordField
            label="Password"
            placeholder="Create a strong password"
            value={password}
            onChangeText={setPassword}
            error={fieldErrors.password}
          />
        </View>

        {globalError ? (
          <View className="mt-4 bg-muted rounded-xl px-4 py-3">
            <Text style={{ fontFamily: font.family.light, fontSize: 13, color: colors.error }}>
              {globalError}
            </Text>
          </View>
        ) : null}

        <View className="h-6" />

        <View className="items-center">
          <Text style={[textStyles.description, { color: colors.ink, textAlign: "center" }]}>
            By continuing, you agree to{"\n"}
            <Text style={{ color: colors.primary }} onPress={() => setLegalModal("terms")}>Terms of Use</Text>
            <Text> and </Text>
            <Text style={{ color: colors.primary }} onPress={() => setLegalModal("privacy")}>Privacy Policy</Text>
            <Text>.</Text>
          </Text>
        </View>

        <ComingSoonModal
          visible={legalModal !== null}
          title={legalModal === "terms" ? "Terms of Use" : "Privacy Policy"}
          message={
            legalModal === "terms"
              ? "Our full Terms of Use are being finalized. They will be available before the official launch."
              : "Our Privacy Policy is being finalized. We are committed to protecting your health data and personal information."
          }
          onClose={() => setLegalModal(null)}
        />

        <View className="h-6" />

        <Button
          label="Sign Up"
          variant="primary"
          loading={registerState.isLoading}
          onPress={handleRegister}
        />

        <View className="h-6" />

        <SocialSection label="or sign up with" showGoogle showFacebook showFingerprint />

        <View className="h-6" />

        <AuthFooter
          label="Already have an account?"
          linkLabel="Log in"
          onPress={() => router.push("/(auth)/login")}
        />

      </ScrollView>
    </SafeAreaView>
  );
}
