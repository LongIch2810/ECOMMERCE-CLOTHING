const multer = require("multer");

//dinh nghia noi luu tru file
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage,
});

module.exports = upload;
