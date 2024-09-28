import MetaData from "../pageLayout/MetaData";
import UserLayout from "../pageLayout/UserLayout";
import { useSelector } from "react-redux";

export default function Profile() {
  const { user } = useSelector((state) => state.auth);

  // if (!user) {
  //     return <p></p>;
  // }

  console.log(user)

  return (
    <>
      <MetaData title={"Profile"}/>
        <UserLayout>
        <div className="row">
        <div className="col-md-4 text-center">
          <figure className="border mx-5 my-5 rounded-circle" style={{ width: '150px', height: '150px', overflow: 'hidden' }}>
            <img
              className="img-fluid"
              src={user?.avatar? user?.avatar?.url : "../public/images/avatar.png"}
              alt="User Avatar"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover', 
              }} 
            />
          </figure>
        </div>

        <div className="col-md-8">
          <h4>Full Name</h4>
          <p>{user?.name}</p>
          <hr />

          <h4>Email Address</h4>
          <p>{user?.email}</p>
          <hr />

          <h4>Joined On</h4>
          <p>{user?.createdAt.substring(0,10)}</p>
        </div>
      </div>
        </UserLayout>
    </>
  );
}
