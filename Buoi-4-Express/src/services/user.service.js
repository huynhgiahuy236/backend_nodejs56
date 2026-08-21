import { BadRequestException } from "../common/helpers/exception.helper.js";
import { prisma } from "../common/prisma/connect.prisma.js";
import path from "path"
import fs from "fs"
import { v2 as cloudinary } from "cloudinary"
cloudinary.config({
   secure: false
})
export const userService = {
   async avatarLocal(req) {
      if (!req.file) {
         throw new BadRequestException("Vui long chọn file để upload")
      }
      if (req.user.avatar) {
         const oldFildPath = path.join("public/image", req.user.avatar)
         if (fs.existsSync(oldFildPath)) {
            fs.unlinkSync(oldFildPath)
         }
         // xoa cloud
         cloudinary.uploader.destroy(req.user.avatar)
      }
      // luu vaof database
      await prisma.users.update({
         where: {
            id: req.user.id
         },
         data: {
            avatar: req.file.filename
         }
      })
      // console.log({
      //    "req.flie": req.file,
      //    "req.body": req.body
      // })
      return `image/${req.file.filename}`;
   },

   async avatarCloud(req) {
      if (!req.file) {
         throw new BadRequestException("Vui long chọn file để upload")
      }
      if (req.user.avatar) {
         const oldFildPath = path.join("public/image", req.user.avatar)
         if (fs.existsSync(oldFildPath)) {
            fs.unlinkSync(oldFildPath)
         }

         // xoa cloud
         cloudinary.uploader.destroy(req.user.avatar)
      }
      // const byteArrayBuffer = fs.readFileSync('shirt.jpg');
      const uploadResult = await new Promise((resolve, reject) => {
         cloudinary.uploader.upload_stream({ folder: "nodejs-56" }, (error, uploadResult) => {
            if (error) {
               return reject(error);
            }
            return resolve(uploadResult);
         }).end(req.file.buffer);
      });

      // luu vao database
      await prisma.users.update({
         where: {
            id: req.user.id
         },
         data: {
            avatar: uploadResult.public_id
         }
      })

      // console.log({
      //    "uploadResult": uploadResult,
      //    "req.file": req.file,
      //    "req.user": req.user
      // })
      return uploadResult.secure_url;
   }
};