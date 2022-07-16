import {
  addNewUser,
  removeUser,
  getUsesOnline,
  sendNotification,
} from "./socket.service.js";

export const socketService = (io) => {
  io.on("connection", (socket) => {
    // Listen event addNewUser with user logged
    socket.on("addNewUser", (userInfo) => {
      console.log(userInfo);
      // Save new user into database
      addNewUser(userInfo, socket.id);
    });

    // Listen event sendNotification form a sender
    socket.on("sendNotification", (notificationInfo) => {
      const { senderName, receiverName, message, type, thumbnail } =
        notificationInfo;

      // Save new notification into database
      sendNotification(notificationInfo).then((data) => {
        const receiver = getUsesOnline(receiverName);

        // Send information for a receiver
        io.to(receiver.socketId).emit("getNotification", {
          id: data?._id,
          senderName,
          message: data?.message,
          type: data?.type,
          isRead: data?.isRead,
          thumbnail,
          createdAt: data?.createdAt,
        });
      });
    });

    // Disconnect server socket
    socket.on("disconnect", () => {
      removeUser(socket.id);
    });
  });
};
