import multer from 'multer';

export const profilePicStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img/users/profile');
  },
  filename: function (req, file, cb) {
    const filenameArray = file.originalname.split('.');
    const extension = filenameArray[filenameArray.length - 1];
    cb(null, 'image-' + Date.now() + '.' + extension);
  },
});
