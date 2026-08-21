import { BadRequestException } from "../common/helpers/exception.helper.js";
import { prisma } from "../common/prisma/connect.prisma.js";
import path from "path"
import fs from "fs"
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
      return `This action for avatarCloud`;
   }
};