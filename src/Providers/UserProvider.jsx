import React, { Component, createContext } from "react";
import { auth, generateUserDocument } from "../firebase";
import './loader.css'

export const UserContext = createContext({ user: null });

class UserProvider extends Component {
  state = {
    user: null,
    loading: true
  };

  componentDidMount = async () => {
    auth.onAuthStateChanged(async userAuth => {
      const user = await generateUserDocument(userAuth);
      this.setState({ user });
      this.setState({loading: false})
    });

  };

  render() {
    if(this.state.loading) {
      return <div className="whirly-loader"></div>;
    }
    return (
      <UserContext.Provider value={this.state.user}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
export default UserProvider;