import { View, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Typography } from "@/components/ui";
import { colors } from "@/theme/tokens";

interface AuthHeaderProps {
  title: string;
}

export function AuthHeader({ title }: AuthHeaderProps) {
  return (
    <View className="flex-row items-center justify-center py-4">
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute left-0 p-1"
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Ionicons name="chevron-back" size={24} color={colors.primary} />
      </TouchableOpacity>
      <Typography variant="heading" color="primary">{title}</Typography>
    </View>
  );
}
