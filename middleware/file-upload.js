
const { v4: uuidv4 } = require('uuid');

const multer = require('multer');

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg',
    'application/pdf': 'pdf'

}

const fileUpload = multer({
    limits: 1000000000,
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            if(file.fieldname==="image") { 
                        cb(null, 'uploads/images');
            }
            else if(file.fieldname==="chapterLink"){
  
                cb(null, 'uploads/chapterpdfs');
            }
            else if(file.fieldname==="solutionLink"){

                cb(null, 'uploads/solutionpdfs');
            }
            else if(file.fieldname==="materialLink"){

                cb(null, 'uploads/materialpdfs');
            }
        },
        filename: (req, file, cb) => {
            const ext = MIME_TYPE_MAP[file.mimetype];
            cb(null,uuidv4()+'.'+ext);
        }
    }),
    fileFilter: (req, file, cb) => {
        const isValid = !!MIME_TYPE_MAP[file.mimetype];
        let error = isValid ? null : new Error('Invalid mime type');
        cb(error, isValid);
    }
});

module.exports = fileUpload;