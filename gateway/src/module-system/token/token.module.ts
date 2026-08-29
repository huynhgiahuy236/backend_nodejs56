import { Module } from "@nestjs/common";
import { TokenService } from "./token.service.js";

@Module({
    imports:[TokenModule],
    providers:[TokenService],
    exports:[TokenService]
})

export class TokenModule{
    
}