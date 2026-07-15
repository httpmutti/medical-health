import { Modal, View, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { Typography } from "./Typography";
import { Button } from "./Button";
import { colors, font } from "@/theme/tokens";

interface ComingSoonModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

export function ComingSoonModal({
  visible,
  onClose,
  title = "Coming Soon",
  message = "This feature is not available yet. We're working hard to bring it to you soon.",
}: ComingSoonModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View
          className="flex-1 justify-end"
          style={{ backgroundColor: "rgba(7, 7, 7, 0.45)" }}
        >
          <TouchableWithoutFeedback>
            <View
              className="bg-white rounded-t-3xl px-6 pt-6 pb-10"
            >
              {/* Drag handle */}
              <View
                className="self-center rounded-full bg-tertiary mb-6"
                style={{ width: 40, height: 4 }}
              />

              {/* Icon */}
              <View
                className="self-center rounded-full bg-muted items-center justify-center mb-5"
                style={{ width: 64, height: 64 }}
              >
                <Typography
                  variant="heading"
                  style={{ fontSize: 28, lineHeight: 36 }}
                >
                  🚧
                </Typography>
              </View>

              {/* Title */}
              <Typography variant="heading" color="ink" center>
                {title}
              </Typography>

              <View className="h-3" />

              {/* Message */}
              <Typography variant="description" color="ink" center>
                {message}
              </Typography>

              <View className="h-8" />

              <Button label="Got It" variant="primary" onPress={onClose} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
