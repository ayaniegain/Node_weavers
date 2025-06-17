import multer from "multer";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

export const uploadMiddleware = () => {
  // Storage config

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const parentDir = path.resolve(__dirname, "..");
  console.log("parentDir", parentDir);

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(parentDir, "uploads"));
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

  const upload = multer({ storage });
  return upload
};
