import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { connectDb } from "./database.js";
import { routes } from "./routes/routes.js";
import { socketService } from "./client/api/socket/socket.controller.js";
import {
  MONGODB_URL,
  MONGODB_USER,
  MONGODB_DATABASE,
  MONGODB_PASS,
  PORT,
} from "./environment.js";
const app = express();
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

const urlConnection = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASS}@cluster0.rijaa.${MONGODB_URL}.net/${MONGODB_DATABASE}?retryWrites=true&w=majority`;

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.json({ message: "SOCKET SERVER STARTING." });
});

connectDb(urlConnection);

const server = http.createServer(app);

const io = new Server(server);

socketService(io);

routes(app);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
