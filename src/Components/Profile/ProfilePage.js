import React, {useContext} from "react";
import UserProvider from "../../Providers/UserProvider";
import { UserContext } from "../../Providers/UserProvider";
import {auth} from "../../firebase";

function ProfilePage() {
  const user = useContext(UserContext);
  const {uid, email, displayName} = user;
  console.log(user)
  return (
    <div>
      <p>Welcome, {displayName}</p>
      <p>current Email: {email}</p>
    </div>
  );
}
export default ProfilePage;