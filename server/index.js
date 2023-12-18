const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const User = require("./models/user.js");
const Post = require("./models/post.js");
const app = express();
const bcrypt = require("bcrypt");
const jsonWebToken = require("jsonwebtoken");
var cookieParser = require("cookie-parser");

const salt = bcrypt.genSaltSync(10);
const secretKey = "74hr287hn90s8h2897hsadfa";

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());

// Rejestracja
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (error) {
    res.status(400).json(error + "błędnie wypełniony formularz rejestracji");
    console.log(error + "błędnie wypełniony formularz rejestracji");
  }
});

// logowanie
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  const passwordOk = bcrypt.compareSync(password, userDoc.password);

  if (passwordOk) {
    jsonWebToken.sign(
      { username, id: userDoc._id },
      secretKey,
      (error, token) => {
        if (error) {
          throw error;
        }
        res.cookie("token", token).json({
          id: userDoc._id,
          username,
        });
      }
    );
  } else {
    res.status(400).json("invalid password/username");
  }
});

// sprawdzanie czy uzytkownik jest zalogowany
app.get("/profile", async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jsonWebToken.verify(token, secretKey, {}, (error, info) => {
      if (error) {
        throw error;
      }
      res.json(info);
    });
  }
});

//wylogowywanie
app.post("/logout", async (req, res) => {
  res.cookie("token", "").json("ok");
});

//dodawanie posta do bazy danych

app.post("/createPost", async (req, res) => {
  const { username, postContent, imgUrl, todayDate } = req.body;

  try {
    const postDoc = await Post.create({
      username,
      postContent,
      imgUrl,
      todayDate,
    });
    res.json(postDoc);
    console.log(postDoc);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Failed to create a post", details: error.message });
    console.log(error + "błąd przy zapisywaniu posta w bazie");
  }
});

app.get("/showPosts", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Wystąpił błąd przy pobieraniu postów" });
  }
});

mongoose.connect(
  "mongodb+srv://wojswiet02:RYx9234EEgbtdsyI@cluster0.d2rvsgf.mongodb.net/?retryWrites=true&w=majority"
);

app.listen(4000);
