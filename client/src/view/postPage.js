import Post from "../components/post";
import NavigationSection from "../components/navigationSection";
import FollowSection from "../components/followSection";

const PostPage = () => {
  return (
    <main>
      <NavigationSection />
      <section>
        <Post />
        <Post />
        <Post />
        <Post />
      </section>
      <FollowSection />
    </main>
  );
};

export default PostPage;
