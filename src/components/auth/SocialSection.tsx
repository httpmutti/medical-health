import { View } from "react-native";
import { Typography } from "@/components/ui";
import { socialIcons } from "@/assets/icons/icons";
import { SocialButton } from "./SocialButton";

interface SocialSectionProps {
  label?: string;
  showGoogle?: boolean;
  showFacebook?: boolean;
  showFingerprint?: boolean;
}

export function SocialSection({
  label = "or sign up with",
  showGoogle = true,
  showFacebook = true,
  showFingerprint = true,
}: SocialSectionProps) {
  return (
    <View className="items-center gap-4">
      <Typography variant="description" color="ink" center>{label}</Typography>
      <View className="flex-row gap-4">
        {showGoogle && (
          <SocialButton icon={<socialIcons.GoogleSocialSvg size={22} />} />
        )}
        {showFacebook && (
          <SocialButton icon={<socialIcons.FacebookSocialSvg size={22} />} />
        )}
        {showFingerprint && (
          <SocialButton icon={<socialIcons.FingerPrintSocialSvg size={22} />} />
        )}
      </View>
    </View>
  );
}
