import express from "express";
import {
  upload,
  uploadFile,
  getAllFiles,
  downloadFile,
} from "../controller/FileUploadController.js";

const fileRoutes = express();

// Define an upload route
fileRoutes.post("/upload", upload.single("file"), uploadFile);

fileRoutes.get("/files", getAllFiles);

fileRoutes.get("/download/:id", downloadFile);

export default fileRoutes;
