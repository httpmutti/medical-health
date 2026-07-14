import { TouchableOpacity, type TouchableOpacityProps } from "react-native";
import { type ReactNode } from "react";

interface SocialButtonProps extends TouchableOpacityProps {
  icon: ReactNode;
}

export function SocialButton({ icon, ...rest }: SocialButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      className="bg-muted rounded-full items-center justify-center"
      style={{ width: 48, height: 48 }}
      {...rest}
    >
      {icon}
    </TouchableOpacity>
  );
}
