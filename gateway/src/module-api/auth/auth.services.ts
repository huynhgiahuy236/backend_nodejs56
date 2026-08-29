import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/modules-system/prisma/prisma.service';
import  * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService){}
  async login(body: LoginDto) {
    const { email, password } = body;
    //kiểm tra email đã được đăng ký chưa
        const userExit = await this.prisma.users.findUnique({
          where: {
            email: email,
          },
          omit: {
            password: false, // lấy cột password ra
          },
        });
        //chưa -> yêu cầu đăng ký
        if (!userExit) {
          // throw new BadRequestException("Tài khoản không chính xác");
          throw new BadRequestException(
            "Email chưa được đăng ký. Vui lòng đăng ký tài khoản.",
          );
        }
    
        //đã đăng ký -> xử lý logic đăng nhập
        const isPasswordValid = bcrypt.compareSync(password, userExit.password); //true
    
        if (!isPasswordValid) {
          // throw new BadRequestException("Tài khoản không chính xác.");
          throw new BadRequestException(
            "Mật khẩu không chính xác. Vui lòng thử lại.",
          );
        }
    
        const accessToken = tokenService.createAccessToken(userExit.id);
    
        const refreshToken = tokenService.createRefreshToken(userExit.id);
        return { accessToken: accessToken, refreshToken: refreshToken };
      ,
    
      async getInfo(req) {
        const user = req.user;
        return user;
      },
    
      async refreshToken(req) {
        const { accessToken, refreshToken } = req.cookies;
    
        if (!accessToken || !refreshToken) {
          throw new BadRequestException("Vui lòng đăng nhập để tiếp tục");
        }
    
        const decodeAccessToken = tokenService.verifyAccessToken(accessToken, {
          ignoreExpiration: true, //bỏ qua thời gian hết hạn
        });
    
        const decodeRefreshToken = tokenService.verifyRefreshToken(refreshToken);
    
        if (decodeAccessToken.userId !== decodeRefreshToken.userId) {
          throw new UnauthorizedException("Token không hợp lệ");
        }
    
        const userExist = await this.prisma.users.findUnique({
          where: {
            id: decodeAccessToken.userId,
          },
        });
        
        if (!userExist) {
          throw new UnauthorizedException("Người dùng không tồn tại");
        }
    
        const newAccessToken = tokenService.createAccessToken(userExist.id);
    
        //thời hạn refreshtoken là 1 ngày
    
        //nếu trả về 1 cặp token mới
        //refreshToken sẽ luôn được làm mới, login của người dùng sẽ luôn duy trì
        //nếu trong 1 ngày người dùng k sử dụng -> logout
    
        // chỉ trả về accesstoken mới
        //sau khi refreshtoken hết hạn, người dùng sẽ phải đăng nhập lại
    
        return {
          accessToken: newAccessToken,
          refreshToken: refreshToken,
        };
      }
  }
}
