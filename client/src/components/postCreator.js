import "../styling/postCreator/postcreator.css";
import { useContext, useState } from "react";
import { UserContext } from "../userContext";

const PostCreator = () => {
  const [postContent, setPostContent] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const { userInfo } = useContext(UserContext);

  async function createPost(event) {
    event.preventDefault();
    // Data
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const todayDate = `${year}-${month < 10 ? "0" : ""}${month}-${
      day < 10 ? "0" : ""
    }${day}`;
    // Nazwa użytkownika
    const username = userInfo.username;

    var likes = 0;
    var comments = [{}];

    const response = await fetch("http://localhost:4000/createPost", {
      method: "POST",
      body: JSON.stringify({
        username,
        postContent,
        imgUrl,
        todayDate,
        likes,
        comments,
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok == true) {
      alert("Post Created!");
    } else {
      alert("Failed to create a post!");
    }
  }

  return (
    <form action="" id="postCreator" onSubmit={createPost}>
      <textarea
        type="text"
        placeholder="What is happening?"
        name="postContent"
        id="postContent"
        value={postContent}
        onChange={(event) => {
          setPostContent(event.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Add img url"
        name="postImg"
        id="imgUrl"
        value={imgUrl}
        onChange={(event) => {
          setImgUrl(event.target.value);
        }}
      />
      <button>Post</button>
    </form>
  );
};

export default PostCreator;
