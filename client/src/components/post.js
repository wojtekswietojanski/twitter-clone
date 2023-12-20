import Like from "../assets/like.png";
import Comment from "../assets/chat.png";
import "../styling/post/post.css";
import { useRef, useContext, useState } from "react";
import CommentTemplate from "./comment";
import { UserContext } from "../userContext";
import { Link } from "react-router-dom";

const Post = ({ name, date, content, imgUrl, postId, likes, comments }) => {
  const [updatedLikes, setUpdatedLikes] = useState(likes);
  const [likeclicked, setLikeClicked] = useState(1);
  const [commentContent, setCommentContent] = useState("");

  const { userInfo } = useContext(UserContext);
  const ifLogged = userInfo?.username;
  try {
    var username = userInfo.username;
  } catch (error) {
    console.log(error);
  }

  const ref = useRef(null);
  const ref1 = useRef(null);
  const ref2 = useRef(null);

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

  const leaveLike = (id) => {
    if (ifLogged) {
      const z = likeclicked * -1;
      setLikeClicked(z);

      const updateLikes = (id, plusMinus) => {
        fetch(`http://localhost:4000/like/${id}`, {
          method: "PUT",
          body: JSON.stringify({ id, plusMinus }),
          headers: { "Content-Type": "application/json" },
        })
          .then((response) => response.json())
          .then((data) => {
            setUpdatedLikes(data.likes + plusMinus);
          })
          .catch((error) => {
            console.error("Error leaving like:", error);
          });
      };

      updateLikes(id, likeclicked);
      const element = ref.current;
      element.classList.toggle("clicked");
    }
  };

  const handleShowComments = () => {
    const element = ref1.current;
    element.classList.toggle("hideComments");
    element.classList.toggle("commentsSection");
    const buttonImg = ref2.current;
    buttonImg.classList.toggle("clicked");
  };

  const handleComment = async (id, author) => {
    if (!ifLogged) {
      window.alert("zaloguj się aby dodawać komentarze");
      return 0;
    }
    const response = await fetch("http://localhost:4000/comment/" + id, {
      method: "PUT",
      body: JSON.stringify({ id, commentContent, author }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok == true) {
      window.alert("Komentarz dodany");
    } else {
      console.log("Nie udało się dodać komentarza");
    }
  };

  return (
    <div className="postContainer">
      <div className="postInfo">
        <div className="profileFoto"></div>
        <div className="textContent">
          <p>
            <Link to={"/showUserPosts/" + name}>{name} </Link>
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
          <img
            src={Comment}
            alt=""
            ref={ref2}
            id={postId}
            onClick={handleShowComments}
          />
          {comments.length - 1}
        </a>
        <a className="likeButton">
          <img
            ref={ref}
            src={Like}
            alt=""
            id={postId}
            onClick={() => leaveLike(postId)}
          />
          {updatedLikes}
        </a>
      </div>
      <section ref={ref1} className="hideComments">
        <form action="" onSubmit={() => handleComment(postId, username)}>
          <textarea
            type="text"
            value={commentContent}
            placeholder="What do you think???"
            onChange={(event) => {
              setCommentContent(event.target.value);
            }}
          />
          <button>Dodaj Komentarz</button>
        </form>
        {comments.map((comment) => (
          <CommentTemplate
            key={comment._id}
            username={comment.author}
            content={comment.content}
          />
        ))}
      </section>
    </div>
  );
};

export default Post;
