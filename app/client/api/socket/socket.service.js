import {
  createUser,
  checkUserExited,
  updateNumberOfNewNotification,
} from "../user/user.service.js";

import { createNotification } from "../notification/notification.service.js";

let onlineUsers = [];

export const addNewUser = async (userInfo, socketId) => {
  const { username } = userInfo;
  
  try {
    // Check user exited
    const isUserExited = await checkUserExited(username);

    // If user does not exit
    if (!isUserExited?.isExited) {
      // Create new user into database
      await createUser(userInfo);
    }

    // All user online connect to server
    !onlineUsers.some((user) => user.username === username) &&
      onlineUsers.push({ username, socketId });

    console.log("Online user: ", onlineUsers);
  } catch (err) {
    throw new Error(err.message);
  }
};

export const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

export const getUsesOnline = (username) => {
  return onlineUsers.find((user) => user.username === username);
};

export const sendNotification = async (args = {}) => {
  try {
    // Up 1 unit for number of new notification
    await updateNumberOfNewNotification(args);

    // Create new notification into database
    return await createNotification(args);
  } catch (err) {
    throw new Error(err.message);
  }
};
