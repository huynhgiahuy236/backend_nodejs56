import { Injectable, type OnModuleInit } from "@nestjs/common";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { DATABASE_URL } from "../../common/constant/app.constant.js";
import { PrismaClient } from "./generated/prisma/client.js";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    const url = new URL(DATABASE_URL);
    const adapter = new PrismaMariaDb({
      user: url.username,
      password: url.password,
      host: url.hostname,
      port: Number(url.port),
      database: url.pathname.slice(1),
    });

    super({ adapter });
  }

  async onModuleInit(): Promise<void> {
    // Kiểm tra kết nối cơ sở dữ liệu khi Nest khởi tạo module.
    try {
      await this.$queryRaw`SELECT 1 + 1 AS result`;
      console.log("[PRISMA] Connection has been established successfully.");
    } catch (error) {
      console.error("[PRISMA] Unable to connect to the database:", error);
    }
  }
}
