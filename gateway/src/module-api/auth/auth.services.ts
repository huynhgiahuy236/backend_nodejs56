import { Injectable } from '@nestjs/common';
import type { LoginDto } from './dto/login.dto.js';

@Injectable()
export class AuthService {
  login(body: LoginDto) {
    const { email, password } = req.body
            // console.log(email)
            // kiểm tra đăng ký chưa 
            const userExit = await prisma.users.findUnique({
                where: {
                    email: email
                },
                omit: {
                    password: false
                }
            })
            // chưa -> yêu cầu đăng kí
            if (!userExit) {
                throw new BadRequestException("Tài khoản chưa được đăng ký");
            }
            // đã đăng ký -> xử lý đăng nhập
            const isPassWordValid = bcrypt.compareSync(password, userExit.password)  // boolean
            if (!isPassWordValid) {
                throw new BadRequestException("Thông tin tài khoản không chính xác");
            }
            const accessToken = tokenService.createAccessToken(userExit.id)
            // refreshToken dùng để làm mới do hết hạn lưu ở hai chỗ Localstore hoặc Cookies  
            const refreshToken = tokenService.createRefreshToken(userExit.id);
    
            return { accessToken: accessToken, refreshToken: refreshToken }
        },
        async getInfo(req) {
            const user = await req.user
            // console.log(user)
            return user
        },
        async refreshToken(req) {
            //thời hạn refreshtoken là 1 ngày
    
            //nếu trả về 1 cặp token mới
            //refreshToken sẽ luôn được làm mới, login của người dùng sẽ luôn duy trì
            //nếu trong 1 ngày người dùng k sử dụng -> logout
    
            // chỉ trả về accesstoken mới
            //sau khi refreshtoken hết hạn, người dùng sẽ phải đăng nhập lại
            const { accessToken, refreshToken } = req.cookies
            if (!accessToken || !refreshToken) {
                throw new BadRequestException("Vui long dang nhap de tiep tuc")
            }
            const decodeAccessToken = tokenService.verifyAccessToken(accessToken, {
                ignoreExpiration: true
            })
            const decodeRefreshToken = tokenService.verifyRefreshToken(refreshToken)
    
            if (decodeAccessToken.userId !== decodeRefreshToken.userId) {
                throw new UnauthorizedException("Token khong hop le")
            }
            const userExit = await prisma.users.findUnique({
                where:{
                    id: decodeAccessToken.userId
                }
            })
            if(!userExit){
                throw new UnauthorizedException("Nguoi dung khong ton tai")
            }
    
            const newAccesToken = tokenService.createAccessToken(userExit.id)
            
            return {
                accessToken: newAccesToken,
                refreshToken: refreshToken
            }
    return 'login successful';
  }
}
