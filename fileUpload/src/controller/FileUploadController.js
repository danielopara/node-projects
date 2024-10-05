import multer from "multer";
import { File } from "../models/FileModel.js";

const storage = multer.memoryStorage();
export const upload = multer({ storage });

export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded!" });
    }

    const { originalname, buffer, mimetype } = req.file;
    const { email } = req.body;

    if (!mimetype) {
      return res.status(400).json({ message: "File type is undefined!" });
    }

    console.log(mimetype, " is the file type");
    console.log("Buffer length:", buffer.length);
    await File.create({
      fileName: originalname,
      file: buffer,
      fileType: mimetype,
      email: email,
    });

    return res.status(200).json({
      message: "File saved successfully!",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error saving file");
  }
};

//get all files
export const getAllFiles = async (req, res) => {
  try {
    const file = await File.findAll();

    console.log("files retrieved");

    const files = file.map((file) => ({
      id: file.id,
      fileName: file.fileName,
      // file: file.file,
    }));

    return res.status(200).json({
      status: 200,
      message: "files retrieved successfully",
      files,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      message: `ERROR: ${error.message}`,
    });
  }
};

//download file
export const downloadFile = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch the file metadata from the database
    const file = await File.findByPk(id);

    if (!file) {
      console.warn(`File with ID ${id} not found.`);
      return res.status(404).json({
        status: 404,
        message: "File not found",
      });
    }

    console.log(
      `File found: ${file.fileName} (ID: ${id}), Type: ${file.fileType}, Size: ${file.file.length} bytes`
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${file.fileName}"`
    );
    res.setHeader("Content-Type", file.fileType);
    res.setHeader("Content-Length", file.file.length);

    console.log(`File ${file.fileName} downloaded successfully.`);

    // Send the file data directly
    return res.send(file.file);
  } catch (error) {
    console.error(`Error in downloadFile: ${error.message}`);
    return res.status(500).json({
      status: 500,
      message: `ERROR: ${error.message}`,
    });
  }
};
