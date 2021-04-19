import React, { Component, createContext, useEffect } from "react";
import { auth, generateUserDocument } from "../firebase";

export const ExpenseContext = createContext({ user: null });

class ExpenseProvider extends Component {
  state = {
    expense: []
  };

  

  render() {
    return (
      <ExpenseContext.Provider value={this.state.expense}>
        {this.props.children}
      </ExpenseContext.Provider>
    );
  }
}
export default ExpenseProvider;