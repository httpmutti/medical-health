import { useState } from "react";
import { View } from "react-native";
import { Typography } from "@/components/ui/Typography";
import { ComingSoonModal } from "@/components/ui/ComingSoonModal";
import { socialIcons } from "@/assets/icons/icons";
import { SocialButton } from "./SocialButton";

interface SocialSectionProps {
  label?: string;
  showGoogle?: boolean;
  showFacebook?: boolean;
  showFingerprint?: boolean;
}

const MODAL_CONTENT: Record<string, { title: string; message: string }> = {
  google: {
    title: "Google Sign-In Coming Soon",
    message: "Sign in with Google will be available in a future update. Please use your email and password for now.",
  },
  facebook: {
    title: "Facebook Sign-In Coming Soon",
    message: "Sign in with Facebook will be available in a future update. Please use your email and password for now.",
  },
  biometric: {
    title: "Biometric Login Coming Soon",
    message: "Fingerprint and Face ID authentication will be available in a future update.",
  },
};

export function SocialSection({
  label = "or sign up with",
  showGoogle = true,
  showFacebook = true,
  showFingerprint = true,
}: SocialSectionProps) {
  const [activeModal, setActiveModal] = useState<keyof typeof MODAL_CONTENT | null>(null);

  return (
    <>
      <View className="items-center gap-4">
        <Typography variant="description" color="ink" center>{label}</Typography>
        <View className="flex-row gap-4">
          {showGoogle && (
            <SocialButton
              icon={<socialIcons.GoogleSocialSvg size={22} />}
              onPress={() => setActiveModal("google")}
            />
          )}
          {showFacebook && (
            <SocialButton
              icon={<socialIcons.FacebookSocialSvg size={22} />}
              onPress={() => setActiveModal("facebook")}
            />
          )}
          {showFingerprint && (
            <SocialButton
              icon={<socialIcons.FingerPrintSocialSvg size={22} />}
              onPress={() => setActiveModal("biometric")}
            />
          )}
        </View>
      </View>

      <ComingSoonModal
        visible={activeModal !== null}
        title={activeModal ? MODAL_CONTENT[activeModal].title : undefined}
        message={activeModal ? MODAL_CONTENT[activeModal].message : undefined}
        onClose={() => setActiveModal(null)}
      />
    </>
  );
}
