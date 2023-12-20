import NavigationSection from "../components/navigationSection";
import FollowSection from "../components/followSection";
import Post from "../components/post";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../userContext";
import "../styling/userPosts/userPosts.css";

const ProfilePage = () => {
  const [posts, setPosts] = useState(null);
  const [ifFollow, setIfFollow] = useState(false);

  const { userInfo } = useContext(UserContext);

  // Szukanie nazwy użytkownika
  const currentPathname = window.location.pathname;
  const pathSegments = currentPathname.split("/");
  const username = pathSegments[pathSegments.length - 1];

  //Wysyłanie żądania w celu sprawdzenia czy użytkownik followuje autora postów
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userInfo?.username) {
          const loggedUser = userInfo.username;
          const response = await fetch(
            "http://localhost:4000/checkFollowingStatus/" + loggedUser
          );
          const data = await response.json();
          if (data.includes(username)) {
            setIfFollow(true);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the asynchronous function
  }, [userInfo?.username]);

  //Pobieranie postów danego użytkownika
  useEffect(() => {
    fetch("http://localhost:4000/showUserPosts/" + username).then(
      (response) => {
        response
          .json()
          .then((DBposts) => {
            setPosts(DBposts);
          })
          .catch((error) => {
            console.error("Wystąpił błąd podczas pobierania postów:", error);
          });
      }
    );
  }, []);

  //obsługa follow
  const handleFollow = async (author) => {
    if (userInfo?.username) {
      if (ifFollow) {
        var trueOrFalse = "true";
        setIfFollow(false);
      } else {
        var trueOrFalse = "false";
        setIfFollow(true);
      }
      const username = userInfo.username;
      const follow = await fetch("http://localhost:4000/follow", {
        method: "PUT",
        body: JSON.stringify({ author, username, trueOrFalse }),
        headers: { "Content-Type": "application/json" },
      });
      if (follow.ok) {
        if (!ifFollow) {
          window.alert("You are now Following " + author);
        } else {
          window.alert("You are no longer Following " + author);
        }
      } else {
        window.alert("somthing went wrong");
      }
    } else {
      window.alert("you need to be logged in to execute that action");
    }
  };

  const checkLikes = (arg) => {
    if (arg) {
      return arg;
    } else {
      return 0;
    }
  };

  return (
    <main>
      <NavigationSection />
      <section className="profileSection">
        <section className="profileInfo">
          <p>{decodeURIComponent(username)}</p>
          <button onClick={() => handleFollow(decodeURIComponent(username))}>
            {ifFollow ? "Unfollow" : "Follow"}
          </button>
        </section>
        <section id="userPosts">
          {posts &&
            posts.map((post) => (
              <Post
                key={post._id}
                name={post.username}
                content={post.postContent}
                date={post.todayDate}
                imgUrl={post.imgUrl}
                postId={post._id}
                likes={checkLikes(post.likes)}
                comments={post.comments}
              />
            ))}
        </section>
      </section>
      <FollowSection />
    </main>
  );
};

export default ProfilePage;
