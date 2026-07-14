import { View, TouchableOpacity } from "react-native";
import { Typography } from "@/components/ui";

interface AuthFooterProps {
  label: string;
  linkLabel: string;
  onPress: () => void;
}

export function AuthFooter({ label, linkLabel, onPress }: AuthFooterProps) {
  return (
    <View className="flex-row items-center justify-center gap-1">
      <Typography variant="description" color="ink">{label}</Typography>
      <TouchableOpacity onPress={onPress} hitSlop={{ top: 8, bottom: 8, left: 4, right: 4 }}>
        <Typography variant="value" color="primary">{linkLabel}</Typography>
      </TouchableOpacity>
    </View>
  );
}
