import express from "express";

const app = express();

app.set("view engine", "pug"); // 뷰 엔진을 퍼그로 설정
app.set("views", __dirname + "/views"); // 뷰 디렉토리 설정
app.use("/public", express.static(__dirname + "/public")); // public 파일 = 프론트엔드
app.get("/", (req, res) => res.render("home")); // 템플릿 렌더링
app.get("/*", (req, res) => res.redirect("/")); // 어디를 가도 /로 돌아가도록 설정

const handleListen = () => console.log(`Listening on http://localhost:3000`);
app.listen(3000, handleListen);
