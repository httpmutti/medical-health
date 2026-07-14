import { colors, textStyles } from "@/theme/tokens";
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  type TouchableOpacityProps,
} from "react-native";

type Variant = "primary" | "secondary" | "tertiary" | "ghost";

interface ButtonProps extends TouchableOpacityProps {
  label: string;
  variant?: Variant;
  loading?: boolean;
}

export function Button({ label, variant = "primary", loading = false, disabled, ...rest }: ButtonProps) {
  const isDisabled = disabled || loading;

  if (variant === "secondary") {
    return (
      <TouchableOpacity
        activeOpacity={0.82}
        disabled={isDisabled}
        className="w-full bg-secondary rounded-full py-4 items-center justify-center"
        {...rest}
      >
        {loading && <ActivityIndicator size="small" color={colors.primary} />}
        <Text className="text-primary" style={textStyles.button}>{label}</Text>
      </TouchableOpacity>
    );
  }

  if (variant === "tertiary") {
    return (
      <TouchableOpacity
        activeOpacity={0.82}
        disabled={isDisabled}
        className="w-full bg-tertiary rounded-full py-4 items-center justify-center"
        {...rest}
      >
        {loading && <ActivityIndicator size="small" color={colors.primary} />}
        <Text className="text-primary" style={textStyles.button}>{label}</Text>
      </TouchableOpacity>
    );
  }

  if (variant === "ghost") {
    return (
      <TouchableOpacity
        activeOpacity={0.82}
        disabled={isDisabled}
        className="w-full bg-white border border-primary rounded-full py-4 items-center justify-center"
        {...rest}
      >
        {loading && <ActivityIndicator size="small" color={colors.primary} />}
        <Text className="text-primary" style={textStyles.button}>{label}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      activeOpacity={0.82}
      disabled={isDisabled}
      className="w-full bg-primary rounded-full py-4 items-center justify-center"
      {...rest}
    >
      {loading && <ActivityIndicator size="small" color={colors.white} />}
      <Text className="text-white" style={textStyles.button}>{label}</Text>
    </TouchableOpacity>
  );
}
