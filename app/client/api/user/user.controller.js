import express from "express";
import {
  createUser,
  checkUserExited,
  resetNumberOfNewNotification,
} from "./user.service.js";
import CommonError from "../../library/error-utils.js";
import { success } from "../../../utils/response-utils.js";

const api = express.Router();

api.post("/create", async (req, res) => {
  try {
    const { username, thumbnail } = req.body;

    const results = await createUser({ username, thumbnail });

    return res.json(success(results));
  } catch (err) {
    return CommonError(req, err, res);
  }
});

api.get("/exited", async (req, res) => {
  try {
    const { username } = req.query;

    const results = await checkUserExited(username);

    return res.json(success(results));
  } catch (err) {
    return CommonError(req, err, res);
  }
});

api.get("/reset-number-of-new-notification", async (req, res) => {
  try {
    const { username } = req.query;

    const results = await resetNumberOfNewNotification(username);

    return res.json(success(results));
  } catch (err) {
    return CommonError(req, err, res);
  }
});

export default api;
