import { Text, type TextProps } from "react-native";
import { textStyles } from "@/theme/tokens";

type Variant = keyof typeof textStyles;
type Color = "ink" | "primary" | "secondary" | "muted" | "white";

interface TypographyProps extends TextProps {
  variant?: Variant;
  color?: Color;
  center?: boolean;
}

const colorClass: Record<Color, string> = {
  ink:       "text-ink",
  primary:   "text-primary",
  secondary: "text-secondary",
  muted:     "text-muted",
  white:     "text-white",
};

export function Typography({
  variant = "description",
  color = "ink",
  center = false,
  style,
  children,
  ...rest
}: TypographyProps) {
  return (
    <Text
      className={colorClass[color]}
      style={[textStyles[variant], center && { textAlign: "center" }, style]}
      {...rest}
    >
      {children}
    </Text>
  );
}
