import React, { useContext, useState } from "react";
import { Link } from "@reach/router";
import { auth, signInWithGoogle, generateUserDocument } from "../firebase";
import Form from 'react-bootstrap/Form'
import '../stylesheets/form.css'

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);

  const createUserWithEmailAndPasswordHandler = async (event, email, password) => {
    event.preventDefault();
    try{
      const {user} = await auth.createUserWithEmailAndPassword(email, password);
      generateUserDocument(user, {displayName});
    }
    catch(error){
      setError('Error Signing up with email and password');
      setShow(true);
    }
      
    setEmail("");
    setPassword("");
    setDisplayName("");
  };

  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;

    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    } else if (name === "displayName") {
      setDisplayName(value);
    }
  };

  return (
    <Form className="formStyle">
      <>{show ? <div style={{background: '#980e0e', borderRadius: '8px', textAlign: 'center'}}>{error}</div> : null} </>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Full Name</Form.Label>
        <Form.Control
          name="displayName"
          value={displayName}
          type="text"
          onChange = {(event) => onChangeHandler(event)}         
        />
        <Form.Label>Email address</Form.Label>
        <Form.Control 
          type="email" 
          placeholder="Enter email"
          name="userEmail"
          value = {email}
          onChange = {(event) => onChangeHandler(event)} 
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control 
          type="password" 
          name="userPassword"
          placeholder="Password"
          value = {password}
          onChange = {(event) => onChangeHandler(event)} 
        />
      </Form.Group>
      <Form.Group className="form-buttons">
          <button
            className="bg-green-400 hover:bg-green-500 w-full py-2 text-white"
            onClick={event => {
              createUserWithEmailAndPasswordHandler(event, email, password);
          }}
        >
          Sign Up
        </button>
        <p className="text-center my-3">or</p>
        <button
          onClick={e =>{ 
            e.preventDefault();
            console.log(signInWithGoogle()); }}
        >
          Sign in with Google
        </button>
      </Form.Group>
      <Form.Group>
        <p className="text-center my-3">
          Already have an account?{" "}
          <Link to="/" className="text-blue-500 hover:text-blue-600">
            Sign in here
          </Link>{" "}
        </p>
      </Form.Group>
    </Form>

  );
};

export default SignUp;