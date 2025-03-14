import multer from "multer";

const uploader = multer({
  dest: "./public/uploads",
});

export default uploader;
