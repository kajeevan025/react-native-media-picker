import { useEffect } from "react";
import Permissions from "react-native-permissions";
import ImagePicker from "react-native-image-crop-picker";
import { pick, types } from "@react-native-documents/picker";
import { useMediaPickerContext } from "../context/MediaPickerContext";

// Custom hook to handle media picking logic
export const useMediaPicker = () => {
  const { setSelectedFile, setIsModalVisible } = useMediaPickerContext();

  // Handle image selection
  const selectImage = async (): Promise<void> => {
    try {
      const permissionStatus = await Permissions.request("photo");
      if (permissionStatus !== "granted") {
        alert("Permission Denied");
        return;
      }

      const image = await ImagePicker.openPicker({
        cropping: true,
        mediaType: "photo",
      });
      setSelectedFile(image);
      setIsModalVisible(true);
    } catch (error) {
      console.error("Image selection error:", error);
    }
  };

  // Handle document selection
  const selectSingleDocument = async (): Promise<void> => {
    try {
      const permissionStatus = await Permissions.request("storage");
      if (permissionStatus !== "granted") {
        alert("Permission Denied");
        return;
      }
      const res = await pick();
      setSelectedFile(res);
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
