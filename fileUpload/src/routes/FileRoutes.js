import express from "express";
import { upload, uploadFile } from "../controller/FileUpload.js";

const fileRoutes = express();

// Define an upload route
fileRoutes.post("/upload", upload.single("file"), uploadFile);

export default fileRoutes;
