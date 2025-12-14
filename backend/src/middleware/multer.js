import multer from 'multer';

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 3 * 1024 * 1024 // 3MB (IMPORTANT for speed)
  }
});

export default upload;
