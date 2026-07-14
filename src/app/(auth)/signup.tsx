import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Button, Typography } from "@/components/ui";
import { AuthHeader, InputField, PasswordField, SocialSection, AuthFooter } from "@/components/auth";
import { textStyles, colors } from "@/theme/tokens";

export default function SignUpScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6" contentContainerStyle={{ paddingBottom: 32 }} showsVerticalScrollIndicator={false}>

        <AuthHeader title="New Account" />

        <View className="h-6" />

        {/* Fields */}
        <View className="gap-4">
          <InputField
            label="Full name"
            placeholder="example@example.com"
            autoCapitalize="words"
          />
          <PasswordField
            label="Password"
            placeholder="••••••••••••"
          />
          <InputField
            label="Email"
            placeholder="example@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <InputField
            label="Mobile Number"
            placeholder="example@example.com"
            keyboardType="phone-pad"
          />
          <InputField
            label="Date Of Birth"
            placeholder="DD / MM / YYY"
          />
        </View>

        <View className="h-6" />

        {/* Terms */}
        <View className="items-center">
          <Text style={[textStyles.description, { color: colors.ink, textAlign: "center" }]}>
            By continuing, you agree to{"\n"}
            <Text style={{ color: colors.primary }}>Terms of Use</Text>
            <Text> and </Text>
            <Text style={{ color: colors.primary }}>Privacy Policy</Text>
            <Text>.</Text>
          </Text>
        </View>

        <View className="h-6" />

        <Button label="Sign Up" variant="primary" />

        <View className="h-6" />

        <SocialSection label="or sign up with" showGoogle showFacebook showFingerprint />

        <View className="h-6" />

        <AuthFooter
          label="already have an account?"
          linkLabel="Log in"
          onPress={() => router.push("/(auth)/login")}
        />

      </ScrollView>
    </SafeAreaView>
  );
}
