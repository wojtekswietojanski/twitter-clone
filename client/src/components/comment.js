import "../styling/comments/comments.css";

const CommentTemplate = ({ username, content }) => {
  return (
    <div className="commentTemplate">
      <b>
        <p>{username}</p>
      </b>
      <p className="textContent">{content}</p>
    </div>
  );
};

export default CommentTemplate;
