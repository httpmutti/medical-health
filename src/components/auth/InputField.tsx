import { View, TextInput, Text, type TextInputProps } from "react-native";
import { Typography } from "@/components/ui";
import { colors, font } from "@/theme/tokens";

interface InputFieldProps extends TextInputProps {
  label: string;
  error?: string;
}

export function InputField({ label, error, ...rest }: InputFieldProps) {
  return (
    <View className="gap-2">
      <Typography variant="label" color="ink">{label}</Typography>
      <TextInput
        className="bg-muted rounded-xl px-4"
        placeholderTextColor={colors.secondary}
        cursorColor={colors.ink}
        style={{
          fontFamily: font.family.light,
          fontSize: 20,
          height: 48,
          color: colors.secondary,
          borderWidth: 1.5,
          borderColor: error ? colors.error : "transparent",
          borderRadius: 12,
        }}
        {...rest}
      />
      {error ? (
        <Text style={{ fontFamily: font.family.light, fontSize: 13, color: colors.error }}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}
