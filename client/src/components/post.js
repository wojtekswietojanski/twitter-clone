import Like from "../assets/like.png";
import Comment from "../assets/chat.png";
import "../styling/post/post.css";

const Post = ({ name, date, content, imgUrl }) => {
  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };
  if (!isValidUrl(imgUrl)) {
    imgUrl =
      "https://foto-dzieciaki.pl/wp-content/uploads/sites/493/2019/12/1-3.jpg";
  }
  return (
    <div className="postContainer">
      <div className="postInfo">
        <div className="profileFoto"></div>
        <div className="textContent">
          <p>
            <b>{name} </b>
            {date}
          </p>
          <p>{content}</p>
        </div>
      </div>
      <div
        className="postFoto"
        style={{ backgroundImage: `url(${imgUrl})` }}
      ></div>
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
