import { useEffect } from "react";
import Permissions from "react-native-permissions";
import ImagePicker from "react-native-image-crop-picker";
import DocumentPicker from "react-native-documents";
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
  const selectDocument = async (): Promise<void> => {
    try {
      const permissionStatus = await Permissions.request("storage");
      if (permissionStatus !== "granted") {
        alert("Permission Denied");
        return;
      }

      const res = await DocumentPicker.pick({
        type: [
          DocumentPicker.types.pdf,
          DocumentPicker.types.doc,
          DocumentPicker.types.text,
        ],
      });
      setSelectedFile(res);
      setIsModalVisible(true);
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.log("Document selection canceled");
      } else {
        console.error("Document selection error:", error);
      }
    }
  };

  // Close the preview modal
  const closePreview = (): void => {
    setIsModalVisible(false);
  };

  return { selectImage, selectDocument, closePreview };
};
