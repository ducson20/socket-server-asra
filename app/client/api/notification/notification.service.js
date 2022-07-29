import mongoose from "mongoose";
import Notification from "../../../models/notification.model.js";
import User from "../../../models/user.model.js";

export const createNotification = async (args = {}) => {
  // Validate args
  const validateArgs = (args = {}) => {
    const { roomId, senderName, receiverName, type, message } = args;

    Object.keys(args).forEach((key) => {
      if (!args[key]) {
        throw new Error(`Property "${key}" empty/null`);
      }
    });

    return args;
  };

  const { roomId, senderName, receiverName, type, message } =
    await validateArgs(args);

  try {
    // Find sender on database
    const senderUser = await User.findOne({
      username: senderName,
    });

    // Validate sender on database
    if (!senderUser) throw new Error("Sender does not exited");

    // Find receiver on database
    const receiverUser = await User.findOne({
      username: receiverName,
    });

    // Validate receiver on database
    if (!receiverUser) throw new Error("Receiver does not exited");

    const notification = new Notification({
      roomId: roomId,
      sender: senderUser?.id,
      receiver: receiverUser?.id,
      type,
      message,
      isRead: false,
      status: false,
    });

    // Create notification
    return await notification.save(notification);
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getNotificationsByUser = async (username) => {
  // Validate userId
  if (!username) {
    throw new Error(`Property "${username}" empty/null`);
  }

  try {
    // Find receiver on database
    const receiver = await User.findOne({
      username: username,
    });

    // Validate receiver on database
    if (!receiver) return;
    // throw new Error("User does not exited");

    // Get all notification data
    const notificationList = await Notification.find({
      receiver: receiver?.id,
    }).sort({ createdAt: -1 });

    // Find sender in notification
    const notificationListCustom = notificationList.map(
      async (notification) => {
        const sender = await User.findOne({
          _id: mongoose.Types.ObjectId(notification?.sender),
        });
        return {
          roomId: notification?.roomId,
          id: notification?.id,
          sender: sender?.username,
          message: notification?.message,
          type: notification?.type,
          isRead: notification?.isRead,
          status: notification?.status,
          thumbnail: sender?.thumbnail,
          createdAt: notification?.createdAt,
        };
      }
    );

    return Promise.all(notificationListCustom).then((notificationList) => {
      const collectNotificationData = {
        notificationList: notificationList,
        numberOfNewNotification: receiver?.numberOfNewNotification,
      };

      return collectNotificationData;
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

export const readNotification = async (notificationId) => {
  // Validate notificationId
  if (!notificationId) {
    throw new Error(`Property "${notificationId}" empty/null`);
  }

  try {
    const notification = await Notification.findOne({
      _id: notificationId,
    });

    // Validate notification on database
    if (!notification) throw new Error("Notification does not exist");

    // Set if user was read that notification
    notification.isRead = true;

    // Save notification into database
    await notification.save();
  } catch (err) {
    throw new Error(err.message);
  }
};
