import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import bodyParser from "body-parser";
import mongoose from "mongoose";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("../Client"));
import authRoutes from "./Routes/authRoutes.js";
import flashRoutes from "./Routes/flashRoutes.js";
import { getUsernameByToken } from "./Controllers/authController.js";
import QuestionSet from "./Models/questionSet.js";

app.use("/api", authRoutes);
app.use("/api", flashRoutes);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const url = process.env.DATABASE_URL;
const connect = () => {
  mongoose
    .connect(url, { dbName: "FlashRoyale" })
    .then(() => console.log("connected to database"))
    .catch((err) => {
      console.log(err.message);
      setTimeout(connect, 5000);
    });
};
connect();

io.on("connection", async (socket) => {
  socket.on("login", async (token) => {
    socket.data.username = await getUsernameByToken(token);
    socket.join("lobby");
    const rooms = Array.from(io.of("/").adapter.rooms.keys());
    const sockets = await io.fetchSockets();
    const socketIds = sockets.map((s) => s.id);
    socket.emit(
      "rooms",
      rooms.filter((room) => !socketIds.includes(room) && room !== "lobby")
    );
  });
  socket.on("room", async (roomName) => {
    const sockets = await io.in(roomName).fetchSockets();
    if (sockets.length < 2) {
      socket.join(roomName);
      io.to(roomName).emit("chooseQuestions");
    } else {
      socket.send("room full");
    }
  });
  socket.on("createRoom", () => {
    console.log(socket.data.username);
    if (!socket.data.username) return;
    socket.rooms.forEach((room) => {
      if (room !== socket.id) {
        socket.leave(room);
      }
    });

    socket.join(`${socket.data.username}'s room`);
    io.to("lobby").emit("rooms", io.of("/").adapter.rooms);
  });

  socket.on("chooseSet", async (id) => {
    let questionsToSend = await QuestionSet.findById(id);
    io.to(Array.from(socket.rooms).filter((r) => r !== socket.id)).emit(
      "questions",
      questionsToSend.questions
    );
  });

  socket.on("start", () => {
    io.to(Array.from(socket.rooms).filter((r) => r !== socket.id)).emit(
      "start"
    );
  });

  socket.on("answer", (answer) => {
    if (answer == "yes") {
      socket.emit("correct");
    } else {
      socket.emit("incorrect");
    }
  });
});

server.listen(process.env.PORT, () => {
  const url = `http://localhost:${process.env.PORT}`;
  console.log(`Server started at \u001b]8;;${url}\u0007${url}\u001b]8;;\u0007`);
});
