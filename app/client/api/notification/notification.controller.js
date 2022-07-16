import express from "express";
import {
  createNotification,
  readNotification,
  getNotificationsByUser,
} from "./notification.service.js";
import CommonError from "../../library/error-utils.js";
import { success } from "../../../utils/response-utils.js";

const api = express.Router();

api.get("/", async (req, res) => {
  try {
    const { username } = req.query;

    const results = await getNotificationsByUser(username);

    return res.json(success(results));
  } catch (err) {
    return CommonError(req, err, res);
  }
});

api.post("/create", async (req, res) => {
  try {
    const args = req.body;

    const results = await createNotification(args);

    return res.json(success(results));
  } catch (err) {
    return CommonError(req, err, res);
  }
});

api.post("/read", async (req, res) => {
  try {
    const { notificationId } = req.body;

    const results = await readNotification(notificationId);

    return res.json(success(results));
  } catch (err) {
    return CommonError(req, err, res);
  }
});

export default api;
