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
  const { username, postContent, imgUrl, todayDate, likes, comments } =
    req.body;

  try {
    const postDoc = await Post.create({
      username,
      postContent,
      imgUrl,
      todayDate,
      likes,
      comments,
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

//Wyświetlanie postów
app.get("/showPosts", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Wystąpił błąd przy pobieraniu postów" });
  }
});

//dawanie like
app.put("/like/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { plusMinus } = req.body;
    const selectedPost = await Post.findByIdAndUpdate(id, {
      $inc: { likes: parseFloat(plusMinus) },
    });
    res.json(selectedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Dawanie komentarza
app.put("/comment/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { author, commentContent } = req.body;
    const selectedPost = await Post.findByIdAndUpdate(id, {
      $push: {
        comments: { author: author, content: commentContent },
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Wyświetlanie postów konkretnego uzytkownika
app.get("/showUserPosts/:username", async (req, res) => {
  const { username } = req.params;

  try {
    const posts = await Post.find({ username: username });
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Wystąpił błąd przy pobieraniu postów" });
  }
});

// Dodawanie do listy obserwowanych osób

app.put("/follow", async (req, res) => {
  const { author, username, trueOrFalse } = req.body;
  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (trueOrFalse == "false") {
      var followingUser = await User.findOneAndUpdate(
        { username: username },
        {
          $push: {
            you_follow: author,
          },
        }
      );
    } else {
      var followingUser = await User.findOneAndUpdate(
        { username: username },
        {
          $pull: {
            you_follow: author,
          },
        }
      );
    }

    res.json(followingUser);
  } catch (error) {
    res.status(500).json({ error: "error occured while following action" });
  }
});

//Obsługa żądania pokazania listy kont obserwowanych przez usera
app.get("/checkFollowingStatus/:loggedUser", async (req, res) => {
  const { loggedUser } = req.params;
  try {
    // Use `await` when querying the database to ensure asynchronous behavior
    const user = await User.findOne({ username: loggedUser });
    if (!user) {
      // Return a 404 status with an informative error message
      return res.status(404).json({ error: "User not found" });
    }
    // Return the 'you_follow' array of the found user
    res.json(user.you_follow);
  } catch (error) {
    // Improve error message to provide more details
    res.status(500).json({
      error: "Error occurred while checking following status action",
      details: error.message, // Include the error message for debugging
    });
  }
});
mongoose.connect(
  "mongodb+srv://wojswiet02:RYx9234EEgbtdsyI@cluster0.d2rvsgf.mongodb.net/?retryWrites=true&w=majority"
);

app.listen(4000);
