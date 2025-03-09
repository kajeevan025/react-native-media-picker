import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  StyleSheet,
} from "react-native";
import { useMediaPickerContext } from "../context/MediaPickerContext";
import { useMediaPicker } from "../hook/useMediaPicker";

const MediaPicker: React.FC = () => {
  const { selectedFile, isModalVisible } = useMediaPickerContext();
  const { selectImage, selectSingleDocument, closePreview } = useMediaPicker();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select an Image or Document</Text>

      {/* Button to select image */}
      <TouchableOpacity style={styles.button} onPress={selectImage}>
        <Text style={styles.buttonText}>Select Image</Text>
      </TouchableOpacity>

      {/* Button to select document */}
      <TouchableOpacity style={styles.button} onPress={selectSingleDocument}>
        <Text style={styles.buttonText}>Select Document</Text>
      </TouchableOpacity>

      {/* Modal for previewing selected file */}
      <Modal
        visible={isModalVisible}
        onRequestClose={closePreview}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedFile &&
            "mime" in selectedFile &&
            (selectedFile.mime === "image/jpeg" ||
              selectedFile.mime === "image/png") ? (
              <Image
                source={{ uri: selectedFile?.path }}
                style={styles.previewImage}
              />
            ) : (
              <Text style={styles.previewText}>
                Preview not available for this document type.
              </Text>
            )}
            <TouchableOpacity style={styles.closeButton} onPress={closePreview}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
  },
  previewImage: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  previewText: {
    fontSize: 16,
    textAlign: "center",
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#FF0000",
    padding: 10,
    borderRadius: 5,
  },
});

export default MediaPicker;
