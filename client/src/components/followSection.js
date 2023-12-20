import "../styling/followSection/followSection.css";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../userContext";

const FollowSection = () => {
  const [followed, setFollowed] = useState([]);
  const { userInfo } = useContext(UserContext);
  const username = userInfo?.username;

  useEffect(() => {
    const followedPeople = async () => {
      if (username) {
        const loggedUser = userInfo.username;
        const followList = await fetch(
          "http://localhost:4000/checkFollowingStatus/" + loggedUser
        );
        const data = await followList.json();
        setFollowed(data);
      }
    };
    followedPeople();
  }, [username]);

  return (
    <aside id="rightAside">
      <p id="peopleYouFollow">People you follow</p>
      {followed.map((singleFollow) => (
        <div className="followInfo" key={singleFollow}>
          <div className="followProfileFoto"></div>
          <p className="followName">{singleFollow}</p>
        </div>
      ))}
    </aside>
  );
};

export default FollowSection;
