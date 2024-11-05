// utils/multerConfig.js
import multer from "multer";
import path from "path";

// Set up storage location and file naming
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads"); // Adjust the folder where files will be saved
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const fileName = `${file.fieldname}-${Date.now()}${ext}`;
    cb(null, fileName);
  },
});

// Initialize multer with the storage configuration
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const extName = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimeType = allowedTypes.test(file.mimetype);

    if (extName && mimeType) {
      return cb(null, true);
    } else {
      cb("Error: Only images (jpeg, jpg, png) are allowed!");
    }
  },
});

export default upload;
