import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email: string;

  @IsString({ message: 'Mật khẩu không hợp lệ' })
  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsString({ message: 'Họ tên không hợp lệ' })
  fullName?: string;
}
