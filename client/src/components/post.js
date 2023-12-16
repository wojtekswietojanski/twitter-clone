import Like from "../assets/like.png";
import Comment from "../assets/chat.png";
import "../styling/post/post.css";

const Post = () => {
  return (
    <div className="postContainer">
      <div className="postInfo">
        <div className="profileFoto"></div>
        <div className="textContent">
          <p>
            <b>Jan Kowalski </b>
            20h
          </p>
          <p>Opis obrazka opis obrazka opis obrazka</p>
        </div>
      </div>
      <div className="postFoto"></div>
      <div className="stats">
        <a className="commentButton">
          <img src={Comment} alt="" />
          100
        </a>
        <a className="likeButton">
          <img src={Like} alt="" />
          1000
        </a>
      </div>
    </div>
  );
};

export default Post;
