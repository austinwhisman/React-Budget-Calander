import Expense from './Expense'
import React, { useContext } from 'react'
import { Router } from "@reach/router";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import PasswordReset from "../PasswordReset";
import  { UserContext } from '../Providers/UserProvider';
import ProfilePage from './Profile/ProfilePage'

function Application() {
  const user = useContext(UserContext);
  return (
    user ?
    <Router>
    <Expense path="/" />
    <ProfilePage path="profilePage"/>
    </Router>
  :
    <Router>
      <SignUp path="signUp" />
      <SignIn path="/" />
      <PasswordReset path = "passwordReset" />
    </Router>
  );
}

export default Application;