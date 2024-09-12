import UserLayout from "../pageLayout/UserLayout";
import { useSelector } from "react-redux";

export default function Profile() {
  const { user } = useSelector((state) => state.auth);

  // if (!user) {
  //     return <p></p>; 
  // }

  return (
    <UserLayout>
      <div className="MUP-userInfo">
        <div className="MUP-avatar">
          <figure>
            <img
              className="MUP-avatarimage"
              src={user?.avatar ? user?.avatar.url : "../public/images/avatar.png"}
              alt={user?.name || "User Avatar"}
            />
          </figure>
        </div>

        <div className="userInfoDetails">
          <h4>Full Name</h4>
          <p>{user?.name}</p>
          <hr />

          <h4>Email Address</h4>
          <p>{user.email}</p>
          <hr />

          <h4>Joined On</h4>
          <p>{user?.createdAt.substring(0,10)}</p>
        </div>
      </div>
    </UserLayout>
  );
}
