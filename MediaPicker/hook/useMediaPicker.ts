import { useEffect } from "react";
import Permissions, { PERMISSIONS } from "react-native-permissions";
import ImagePicker from "react-native-image-crop-picker";
import { pick, types } from "@react-native-documents/picker";
import { useMediaPickerContext } from "../context/MediaPickerContext";
import { Platform } from "react-native";

// Custom hook to handle media picking logic
export const useMediaPicker = () => {
  const { setSelectedFile, setIsModalVisible } = useMediaPickerContext();

  // Handle image selection
  const selectImage = async (): Promise<void> => {
    try {
      const permissionStatus = await Permissions.request(
        Platform.OS === "android"
          ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
          : PERMISSIONS.IOS.PHOTO_LIBRARY
      );
      if (permissionStatus !== "granted") {
        alert("Permission Denied");
        return;
      }

      const image = await ImagePicker.openPicker({
        cropping: true,
        mediaType: "photo",
      });
      const selectedFile = {
        uri: image.path,
        type: image.mime,
        name: image.filename || "image.jpg",
      };
      setSelectedFile(selectedFile);
      setIsModalVisible(true);
    } catch (error) {
      console.error("Image selection error:", error);
    }
  };

  // Handle document selection
  const selectSingleDocument = async (): Promise<void> => {
    try {
      const permissionStatus = await Permissions.request(
        Platform.OS === "android"
          ? PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
          : PERMISSIONS.IOS.MEDIA_LIBRARY
      );
      if (permissionStatus !== "granted") {
        alert("Permission Denied");
        return;
      }
      const res = await pick();
      setSelectedFile(res[0]);
      setIsModalVisible(true);
    } catch (error) {
      console.error("Document selection error:", error);
    }
  };

  // Close the preview modal
  const closePreview = (): void => {
    setIsModalVisible(false);
  };

  return { selectImage, selectSingleDocument, closePreview };
};
