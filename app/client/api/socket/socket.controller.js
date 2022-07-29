import {
  addNewUser,
  removeUser,
  getUsesOnline,
  sendNotification,
} from "./socket.service.js";

export const socketService = (io) => {
  io.on("connection", (socket) => {
    // Listen event addNewUser with user logged
    socket.on("addNewUser", (username) => {
      // Add new user online
      addNewUser(username, socket.id);
    });

    // Listen event sendNotification form a sender
    socket.on("sendNotification", (notificationInfo) => {
      const { roomId, senderName, receiverName, message, type, thumbnail } =
        notificationInfo;

      // Save new notification into database
      sendNotification(notificationInfo).then((data) => {
        const receiver = getUsesOnline(receiverName);
        let userData = data[0];
        let notificationData = data[1]
        // Send information for a receiver
        io.to(receiver?.socketId).emit("getNotification", {
          roomId: notificationData?.roomId,
          id: notificationData?._id,
          senderName,
          message: notificationData?.message,
          type: notificationData?.type,
          isRead: notificationData?.isRead,
          thumbnail,
          numberOfNewNotification: userData?.numberOfNewNotification,
          createdAt: notificationData?.createdAt,
        });
      });
    });

    // Disconnect server socket
    socket.on("disconnect", () => {
      removeUser(socket.id);
    });
  });
};
