import path from "path";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import fs from "fs";
import config from "../config";
import { TFile } from "../interface/global.type";

// store image in disk inside uploads folder
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(process.cwd(), "uploads"));
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// upload image to cloudinary
cloudinary.config({
  cloud_name: config.CLOUDINARY_CLOUD_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (file: TFile) => {
  try {
    const data = await cloudinary.uploader.upload(
      file.path,
      { public_id: file.originalname },
      (error, result) => {
        if (result) {
          fs.unlinkSync(file.path);
          return result;
        } else {
          fs.unlinkSync(file.path);
          return error;
        }
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default { upload, uploadToCloudinary };
