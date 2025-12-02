import multer from "multer";
import { Request } from "express";
import { v4 as uuidv4 } from "uuid";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";
import envConfig from "./env.config";

cloudinary.config({
  cloud_name: envConfig.accoundId,
  api_key: envConfig.apiKey,
  api_secret: envConfig.apiSecret,
});

// Configure storage
const storage = (folder: string) =>
  new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder,
      public_id: (req: Request, file: Express.Multer.File) => {
        return uuidv4();
      },
      resource_type: "auto",
    } as any,
  });

// Configure multer
const upload = (folder: string) =>
  multer({
    storage: storage(folder),
    fileFilter: (req, file, cb: multer.FileFilterCallback) => {
      if (
        !file.mimetype.startsWith("audio/") &&
        !file.mimetype.startsWith("image/")
      ) {
        // @ts-ignore
        return cb(new Error("Invalid file type"), false);
      }
      cb(null, true);
    },
    limits: {
      fileSize: 20 * 1024 * 1024,
    },
  });

export default upload;
