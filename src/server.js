import http from "http";
import WebSocket from "ws";
import express from "express";
import { parse } from "path";

const app = express();

app.set("view engine", "pug"); // 뷰 엔진을 퍼그로 설정
app.set("views", __dirname + "/views"); // 뷰 디렉토리 설정
app.use("/public", express.static(__dirname + "/public")); // public 파일 = 프론트엔드
app.get("/", (req, res) => res.render("home")); // 템플릿 렌더링
app.get("/*", (req, res) => res.redirect("/")); // 어디를 가도 /로 돌아가도록 설정

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app); // http server
const wss = new WebSocket.Server({ server });

const sockets = [];

wss.on("connection", (socket) => {
  sockets.push(socket);
  socket["nickname"] = "홍길동";

  console.log("connected to Browser ✔");
  socket.on("close", () => console.log("Disconnected from the Browser"));

  socket.on("message", (msg) => {
    const message = JSON.parse(msg);

    console.log(message.type);

    switch (message.type) {
      case "new_message":
        sockets.forEach((aSocket) =>
          aSocket.send(`${socket.nickname} : ${message.payload}`)
        );
        break;
      case "nickname":
        socket["nickname"] = message.payload;
        break;
    }
  });
  socket.send("hello");
});

server.listen(3000, handleListen);
