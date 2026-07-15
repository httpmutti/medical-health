import { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, type TextInputProps } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Typography } from "@/components/ui";
import { colors, font } from "@/theme/tokens";

interface PasswordFieldProps extends TextInputProps {
  label: string;
  error?: string;
}

export function PasswordField({ label, error, ...rest }: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <View className="gap-2">
      <Typography variant="label" color="ink">{label}</Typography>
      <View
        className="bg-muted rounded-xl px-4 flex-row items-center"
        style={{ height: 48, borderWidth: 1.5, borderColor: error ? colors.error : "transparent", borderRadius: 12 }}
      >
        <TextInput
          className="flex-1"
          secureTextEntry={!visible}
          placeholderTextColor={colors.secondary}
          cursorColor={colors.ink}
          style={{ fontFamily: font.family.light, fontSize: 20, color: colors.secondary }}
          {...rest}
        />
        <TouchableOpacity onPress={() => setVisible(!visible)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Ionicons
            name={visible ? "eye-outline" : "eye-off-outline"}
            size={18}
            color={colors.ink}
          />
        </TouchableOpacity>
      </View>
      {error ? (
        <Text style={{ fontFamily: font.family.light, fontSize: 13, color: colors.error }}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}
