let multer = require("multer");

let storagepath = multer.diskStorage({
    destination:(req,file,path)=>{
        path(null,"public/images");
    },
    filename:(req,file,path)=>{
        path(null,file.originalname);
    }
});

let upload = multer({storage:storagepath});
module.exports = upload;