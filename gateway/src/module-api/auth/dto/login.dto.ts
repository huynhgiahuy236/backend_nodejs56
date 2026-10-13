import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {

    @IsNotEmpty()
    @IsEmail({}, { message: 'Email khong hop le' })
    email: string;

    @IsString({ message: 'Password khong hop le' })
    @IsNotEmpty()
    password: string;
}
