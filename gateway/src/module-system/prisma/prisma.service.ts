import {
  Injectable,
  type OnModuleDestroy,
  type OnModuleInit,
} from "@nestjs/common";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { DATABASE_URL } from "../../common/constant/app.constant.js";
import { PrismaClient } from "./generated/prisma/client.js";

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    const url = new URL(DATABASE_URL);
    const adapter = new PrismaMariaDb({
      user: decodeURIComponent(url.username),
      password: decodeURIComponent(url.password),
      host: url.hostname,
      port: url.port ? Number(url.port) : 3306,
      database: decodeURIComponent(url.pathname.slice(1)),
    });

    super({ adapter });
  }

  async onModuleInit(): Promise<void> {
    // Kiểm tra kết nối cơ sở dữ liệu khi Nest khởi tạo module.
    await this.$connect();
    await this.$queryRaw`SELECT 1`;
    console.log("[PRISMA] Connection has been established successfully.");
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
}
