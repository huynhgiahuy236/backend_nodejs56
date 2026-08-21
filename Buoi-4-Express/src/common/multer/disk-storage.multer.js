import multer from "multer"
import path from "path"
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/image/')
    },
    filename: function (req, file, cb) {
        // console.log(file)
        // lấy dịnh dạng duôi ảnh
        const fileExt = path.extname(file.originalname)

        // tạo chuỗi ngẫu nhiên cho tên ảnh 
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, "local" + '-' + uniqueSuffix + fileExt)
    }
})

export const uploadDiskStorage = multer({ storage: storage })

// img src="http:localhost:3069/image/local-1787302359613-110786327.png"