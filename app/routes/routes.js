import UserController from "../client/api/user/user.controller.js";
import NotificationController from "../client/api/notification/notification.controller.js";

export const routes = (app) => {
  app.use("/api/users", UserController);

  app.use("/api/notifications", NotificationController);
};
