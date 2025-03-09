import React, { createContext, useContext, useState } from "react";
import { Image } from "react-native";
import { DocumentPickerResponse } from "@react-native-documents/picker";

type MediaType = {
  uri: string;
  type: string;
  name: string;
};

export type SelectedFile = MediaType | Image | DocumentPickerResponse | null;

interface MediaPickerContextProps {
  selectedFile: SelectedFile;
  isModalVisible: boolean;
  setSelectedFile: React.Dispatch<React.SetStateAction<SelectedFile>>;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const MediaPickerContext = createContext<MediaPickerContextProps | undefined>(
  undefined
);

export const useMediaPickerContext = (): MediaPickerContextProps => {
  const context = useContext(MediaPickerContext);
  if (!context) {
    throw new Error(
      "useMediaPickerContext must be used within a MediaPickerProvider"
    );
  }
  return context;
};

interface MediaPickerProviderProps {
  children: React.ReactNode;
}

export const MediaPickerProvider: React.FC<MediaPickerProviderProps> = ({
  children,
}) => {
  const [selectedFile, setSelectedFile] = useState<SelectedFile>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  return (
    <MediaPickerContext.Provider
      value={{
        selectedFile,
        isModalVisible,
        setSelectedFile,
        setIsModalVisible,
      }}
    >
      {children}
    </MediaPickerContext.Provider>
  );
};
