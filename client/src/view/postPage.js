import Post from "../components/post";
import NavigationSection from "../components/navigationSection";
import FollowSection from "../components/followSection";
import PostCreator from "../components/postCreator";
import { useEffect, useContext, useState } from "react";
import { UserContext } from "../userContext";

const PostPage = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  useEffect(() => {
    fetch("http://localhost:4000/showPosts").then((response) => {
      response
        .json()
        .then((DBposts) => {
          setPosts(DBposts);
          console.log(DBposts);
        })
        .catch((error) => {
          console.error("Wystąpił błąd podczas pobierania postów:", error);
        });
    });
  }, []);

  const username = userInfo?.username;

  return (
    <main>
      <NavigationSection />
      <section>
        {username && <PostCreator />}
        {posts &&
          posts.map((post) => (
            <Post
              key={post._id}
              name={post.username}
              content={post.postContent}
              date={post.todayDate}
              imgUrl={post.imgUrl}
            />
          ))}
      </section>
      <FollowSection />
    </main>
  );
};

export default PostPage;
