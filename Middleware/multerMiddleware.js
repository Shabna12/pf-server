const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req,file,callback) => {
        callback(null,'./Uploads') //1st error or null 2nd is destination
    },
    filename: (req,file,callback) => {
        const filename = `image-${Date.now()}-${file.originalname}`   //store aagunna file name here aan putting
        callback(null,filename)  //date in millisecond aayittu
    }
})


const multerMiddleware = multer({
    storage
})



module.exports = multerMiddleware