import multer from "multer";
import { File } from "../models/FileModel.js";

const storage = multer.memoryStorage();
export const upload = multer({ storage });

export const uploadFile = async (req, res) => {
  const { originalname, buffer } = req.file;
  const { email } = req.body;

  try {
    await File.create({
      fileName: originalname,
      data: buffer,
      email: email,
    });

    res.status(200).json({
      message: "File saved successfully!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error saving file");
  }
};
