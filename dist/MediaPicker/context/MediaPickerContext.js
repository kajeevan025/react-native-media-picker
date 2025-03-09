"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaPickerProvider = exports.useMediaPickerContext = void 0;
var react_1 = __importStar(require("react"));
var MediaPickerContext = (0, react_1.createContext)(undefined);
var useMediaPickerContext = function () {
    var context = (0, react_1.useContext)(MediaPickerContext);
    if (!context) {
        throw new Error("useMediaPickerContext must be used within a MediaPickerProvider");
    }
    return context;
};
exports.useMediaPickerContext = useMediaPickerContext;
var MediaPickerProvider = function (_a) {
    var children = _a.children;
    var _b = (0, react_1.useState)(null), selectedFile = _b[0], setSelectedFile = _b[1];
    var _c = (0, react_1.useState)(false), isModalVisible = _c[0], setIsModalVisible = _c[1];
    return (<MediaPickerContext.Provider value={{
            selectedFile: selectedFile,
            isModalVisible: isModalVisible,
            setSelectedFile: setSelectedFile,
            setIsModalVisible: setIsModalVisible,
        }}>
      {children}
    </MediaPickerContext.Provider>);
};
exports.MediaPickerProvider = MediaPickerProvider;
