import "../styling/followSection/followSection.css";

const FollowSection = () => {
  return (
    <aside id="rightAside">
      <p id="peopleYouFollow">People you follow</p>
      <div className="followInfo">
        <div className="followProfileFoto"></div>
        <p className="followName">Jan Kowalski</p>
      </div>
      <div className="followInfo">
        <div className="followProfileFoto"></div>
        <p className="followName">Jan Kowalski</p>
      </div>
      <div className="followInfo">
        <div className="followProfileFoto"></div>
        <p className="followName">Jan Kowalski</p>
      </div>
      <div className="followInfo">
        <div className="followProfileFoto"></div>
        <p className="followName">Jan Kowalski</p>
      </div>
    </aside>
  );
};

export default FollowSection;
