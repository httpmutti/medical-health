import { View, TextInput, type TextInputProps } from "react-native";
import { Typography } from "@/components/ui";
import { colors, font } from "@/theme/tokens";

interface InputFieldProps extends TextInputProps {
  label: string;
}

export function InputField({ label, ...rest }: InputFieldProps) {
  return (
    <View className="gap-2">
      <Typography variant="label" color="ink">{label}</Typography>
      <TextInput
        className="bg-muted rounded-xl px-4"
        placeholderTextColor={colors.secondary}
        cursorColor={colors.ink}
        style={{ fontFamily: font.family.light, fontSize: 20, height: 48, color: colors.secondary }}
        {...rest}
      />
    </View>
  );
}
