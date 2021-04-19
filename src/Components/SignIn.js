import React, {useState} from "react";
import { Link } from "@reach/router";
import { signInWithGoogle } from "../firebase";
import { auth } from "../firebase";
import Form from 'react-bootstrap/Form'
import '../stylesheets/form.css'


const SignIn = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const signInWithEmailAndPasswordHandler = (event,email, password) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password).catch(error => {
      setError("Error signing in with password and email!");
      console.error("Error signing in with password and email", error);
    });
  };
    
    const onChangeHandler = (event) => {
      const {name, value} = event.currentTarget;
    
      if(name === 'userEmail') {
          setEmail(value);
      }
      else if(name === 'userPassword'){
        setPassword(value);
      }
    };
 
  return (
    <Form className="formStyle">
      <Form.Group controlId="formBasicEmail">
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
            onClick={event => {
              signInWithEmailAndPasswordHandler(event, email, password);
          }}
        >
          Sign In
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
          Don't have an account?{" "}
          <Link to="signUp">
            Sign up here
          </Link>{" "}
          <br />{" "}
          <Link to="passwordReset">
            Forgot Password?
          </Link>
        </p>
      </Form.Group>
    </Form>
  );
};

export default SignIn;

