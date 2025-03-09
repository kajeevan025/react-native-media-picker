"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
var MediaPickerContext_1 = require("../context/MediaPickerContext");
var useMediaPicker_1 = require("../hook/useMediaPicker");
var MediaPicker = function () {
    var _a = (0, MediaPickerContext_1.useMediaPickerContext)(), selectedFile = _a.selectedFile, isModalVisible = _a.isModalVisible;
    var _b = (0, useMediaPicker_1.useMediaPicker)(), selectImage = _b.selectImage, selectSingleDocument = _b.selectSingleDocument, closePreview = _b.closePreview;
    return (<react_native_1.View style={styles.container}>
      <react_native_1.Text style={styles.title}>Select an Image or Document</react_native_1.Text>

      {/* Button to select image */}
      <react_native_1.TouchableOpacity style={styles.button} onPress={selectImage}>
        <react_native_1.Text style={styles.buttonText}>Select Image</react_native_1.Text>
      </react_native_1.TouchableOpacity>

      {/* Button to select document */}
      <react_native_1.TouchableOpacity style={styles.button} onPress={selectSingleDocument}>
        <react_native_1.Text style={styles.buttonText}>Select Document</react_native_1.Text>
      </react_native_1.TouchableOpacity>

      {/* Modal for previewing selected file */}
      <react_native_1.Modal visible={isModalVisible} onRequestClose={closePreview} transparent={true} animationType="slide">
        <react_native_1.View style={styles.modalContainer}>
          <react_native_1.View style={styles.modalContent}>
            {selectedFile &&
            "mime" in selectedFile &&
            (selectedFile.mime === "image/jpeg" ||
                selectedFile.mime === "image/png") ? (<react_native_1.Image source={{ uri: selectedFile === null || selectedFile === void 0 ? void 0 : selectedFile.path }} style={styles.previewImage}/>) : (<react_native_1.Text style={styles.previewText}>
                Preview not available for this document type.
              </react_native_1.Text>)}
            <react_native_1.TouchableOpacity style={styles.closeButton} onPress={closePreview}>
              <react_native_1.Text style={styles.buttonText}>Close</react_native_1.Text>
            </react_native_1.TouchableOpacity>
          </react_native_1.View>
        </react_native_1.View>
      </react_native_1.Modal>
    </react_native_1.View>);
};
var styles = react_native_1.StyleSheet.create({
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
exports.default = MediaPicker;
