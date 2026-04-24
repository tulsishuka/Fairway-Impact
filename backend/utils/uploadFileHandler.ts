
import multer from "multer";
import { Request } from "express";
import path from "path";

const FILETYPE: { [key: string]: string } = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: function (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) {
    const isValidFormat = FILETYPE[file.mimetype];

    let uploadError: Error | null = new Error(
      "Invalid format image! jpeg or png"
    );

    if (isValidFormat) {
      uploadError = null;
    }

    cb(uploadError, "public/uploads");
  },

  filename: function (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) {
    const uniqueFile = `${file.fieldname}-${Date.now()}${path.extname(
      file.originalname
    )}`;

    cb(null, uniqueFile);
  },
});

export const upload = multer({ storage });