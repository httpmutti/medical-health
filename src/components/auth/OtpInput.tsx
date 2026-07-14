import { useRef, useState } from "react";
import { View, TextInput, type NativeSyntheticEvent, type TextInputKeyPressEventData } from "react-native";
import { colors, font, radius } from "@/theme/tokens";

interface OtpInputProps {
  length?: number;
  onComplete?: (code: string) => void;
}

export function OtpInput({ length = 6, onComplete }: OtpInputProps) {
  const [values, setValues] = useState<string[]>(Array(length).fill(""));
  const inputs = useRef<(TextInput | null)[]>([]);

  const handleChange = (text: string, index: number) => {
    const digit = text.replace(/[^0-9]/g, "").slice(-1);
    const next = [...values];
    next[index] = digit;
    setValues(next);

    if (digit && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }

    if (next.every((v) => v !== "")) {
      onComplete?.(next.join(""));
    }
  };

  const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !values[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <View className="flex-row justify-between">
      {Array(length).fill(null).map((_, i) => (
        <TextInput
          key={i}
          ref={(ref) => { inputs.current[i] = ref; }}
          value={values[i]}
          onChangeText={(text) => handleChange(text, i)}
          onKeyPress={(e) => handleKeyPress(e, i)}
          keyboardType="number-pad"
          maxLength={1}
          style={{
            width: 48,
            height: 56,
            borderRadius: radius.lg,
            backgroundColor: colors.muted,
            borderWidth: 1.5,
            borderColor: values[i] ? colors.primary : "transparent",
            textAlign: "center",
            fontFamily: font.family.semibold,
            fontSize: 20,
            color: colors.primary,
          }}
        />
      ))}
    </View>
  );
}
