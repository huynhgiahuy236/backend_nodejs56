import { createServer } from "http";
import { Server } from "socket.io";
import { tokenService } from "../../services/token.service.js";
import { prisma } from "../prisma/connect.prisma.js";

export const initSocket = (app) => {
    const httpServer = createServer(app);
    const io = new Server(httpServer, {
        /* options */
    });

    io.on("connection", (socket) => {
        console.log("socket-id", socket.id);

        socket.on("CREATE_ROOM", async (data, cb) => {
            try {
                let { targetUserIds, accessToken, name } = data;
                //kiểm trả thông tin userId
                const { userId } = tokenService.verifyAccessToken(accessToken);
                const userExits = await prisma.users.findUnique({
                    where: {
                        id: userId
                    },
                });
                // targetUserIds = [2, 2, 3, 3, 4];
                // loại bỏ các user trùng nhau
                const targetUserIDUniqueSet = new Set([...targetUserIds, userId]);
                const targetUserIDUnique = Array.from(targetUserIDUniqueSet);

                if (targetUserIDUnique.length === 2) {
                    //tạo room chat 1-1
                    //1.kiểm tra groupChat đã tồn tại hay chưa
                    const chatGroup = await prisma.chatGroups.findFirst({
                        where: {
                            ChatGroupMembers: {
                                // kiểm tra bản ghi
                                // every: tất cả bảng trong db đều phải thỏa mãn điều kiện này
                                // some: chỉ cần ít nhất 1 bảng ghi trong db thỏa mãn điều kiện này 
                                // none: không có bản ghi nào thỏa mãn điều kiện này
                                every: {
                                    userId: {
                                        in: targetUserIDUnique
                                    }

                                }
                            }
                        }
                    })
                    //2.Nếu chưa tạo mới
                    if (!chatGroup) {
                        let chatGroup = await prisma.chatGroups.create({
                            data: {
                                ownerId: userExits.id,
                            }
                        })
                        await prisma.chatGroupMembers.createMany({
                            data: [
                                {
                                    userId: targetUserIDUnique[0], chatGroupId: chatGroup.id
                                },
                                {
                                    userId: targetUserIDUnique[1], chatGroupId: chatGroup.id
                                }

                            ]
                        })
                    }
                    //3.Nếu có rồi -> đi tiếp (kết nối tới room chat)
                    socket.join(chatGroup.id)
                    cb({
                        status: "success",
                        message: "Tạo phòng thành công",
                        data: {
                            chatGroupId: chatGroup.id
                        }
                    })
                    // console.log(io.sockets.adapter.rooms)

                } else {
                    // tạo room chat nhóm
                    const chatGroup = await prisma.chatGroups.create({
                        data: {
                            ownerId: userExits.id,
                            name: name
                        }
                    })
                    await prisma.chatGroupMembers.createMany({
                        data: targetUserIDUnique.map((userId) => {
                            return {
                                userId: userId,
                                chatGroupId: chatGroup.id
                            }
                        })
                    })
                    socket.join(chatGroup.id)
                    cb({
                        status: "success",
                        message: "Tạo group chat thành công",
                        data: {
                            userId: userExits.id,
                            name: name
                        }
                    })
                    // console.log("CREATE_ROOM", {
                    //     targetUserIDUnique,
                    //     accessToken,
                    //     userId,
                    //     userExits,
                    //     chatGroup,
                    //     name
                    // });
                }
            } catch (error) {
                cb({ status: "error", data: null, message: error.message || "Lỗi không xác định" })
            }
        });
    });

    return httpServer;
};
