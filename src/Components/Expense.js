import '../stylesheets/App.css';
import ExpenseModal from './FormModal/FormModal.js'
import ExpenseList from './ListComponent/ExpenseList.js'
import TotalComponent from './ListComponent/TotalCounter.js'
import React, {useEffect, useState, useContext} from 'react'
import { UserContext } from "../Providers/UserProvider";
import {auth} from "../firebase";

function Expense() {
  const user = useContext(UserContext);
  const [enteredExpense, setExpense] = useState([]);
  const [show, setShow] = useState(false);
  const {displayName, uid} = user;
  
  //Fetch Data Stored on Firebase Db. gets resonse. turns to JSON, maps to Expense Array.
  useEffect(() => {
    fetch(`https://alwbudgetcalculator-default-rtdb.firebaseio.com/expenses/${user.uid}.json`)
    .then(response => response.json())
    .then(responseData => {
      const loadedData = [];
      var total = 0;
      for (const key in responseData) {
        loadedData.push({
          id: key,
          title: responseData[key].title,
          expense: responseData[key].expense,
          type: responseData[key].type
        })
      }
      setExpense(loadedData);
    })
  }, [])

  //Sets state to open and close Expense Modal
  const modalHandler = () => { 
    const showvalue = !show;
    setShow(showvalue);
  }

  //adds new expenses to Firebase Db and pushes setExpense.
  const addExpenseHandler = (title, expense, type) => { 
    fetch(`https://alwbudgetcalculator-default-rtdb.firebaseio.com/expenses/${user.uid}.json`, {
      method: 'POST',
      body: JSON.stringify({
        title: title,
        expense: expense,
        type: type
      }),
      headers: { 'Content-Type': 'application/json'}
    }).then(response => {
      return response.json();
    }).then(responseData => {
      setExpense(arr => [...arr, {
        id: responseData.name,
        title: title,
        expense: expense,
        type: type
      }])
    })
  }
  
 // remove post from DB and DOM
  const removeExpenseHandler = (expenseId) => {
    console.log(expenseId);
    fetch(
      `https://alwbudgetcalculator-default-rtdb.firebaseio.com/expenses/${user.uid}/${expenseId}.json`,
      {
        method: 'DELETE'
      }
    ).then(response => {
        setExpense(prevExpense =>
          prevExpense.filter(expense => expense.id !== expenseId)
      );
    })
  }

  const editExpenseHandler = (title, expense, type, key) => { 
    console.log(title, expense, type, key );
    fetch(`https://alwbudgetcalculator-default-rtdb.firebaseio.com/expenses/${user.uid}/${key}.json`, {
      method: 'PATCH',
      body: JSON.stringify({
        title: title,
        expense: expense,
        type: type
      }),
      headers: { 'Content-Type': 'application/json'}
    }).then(response => {
      return response.json();
    }).then(responseData => {
      // setExpense(arr => [...arr, {
      //   id: responseData.name
      //   title: title,
      //   expense: expense,
      //   type: type
      // }])
      var clonedArray = [...enteredExpense]
      var index = enteredExpense.findIndex((element, index) => {
        if (element.id === key) {
          return true
        }
      })
      var clonedItem = clonedArray[index] = {
        id: key,
        title: title,
        expense: expense,
        type: type
      }
      clonedArray[index] = clonedItem;
      console.log(clonedItem)
      console.log(clonedArray)
      console.log(enteredExpense)
      console.log(index)
      setExpense(clonedArray)
    })
  }


 // turns value into string with decimal, two digits, and a commz if in thousands.
  const insertDecimal = integer => Number(Math.round(Number(integer) * 100) / 100)
  .toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <div id="parent-container" className= 'dark-theme'>
      <p>Welcome, {displayName}</p>
      <TotalComponent 
        style={{ position: "absolute",  left: "10%", top: "5px" }} 
        expenseArray={enteredExpense
        .reduce((Accumulator, Expense) => Accumulator + (Expense.type * parseFloat(Expense.expense)), 0)}
        insertDecimal= {insertDecimal}
      />
      <ExpenseList 
        typeOfExpense ="Monthly"
        avgDivider="12"
        expenselist={enteredExpense.filter(expenses => expenses.type == 12)}
        onEditItem={editExpenseHandler}
        onRemoveItem={removeExpenseHandler}
        expenseColor="#ff1744"
        insertDecimal= {insertDecimal}
      />
      <ExpenseList 
        typeOfExpense ="Weekly"
        avgDivider="52"
        expenselist={enteredExpense.filter(expenses => expenses.type == 52)}
        onRemoveItem={removeExpenseHandler}
        onEditItem={editExpenseHandler}
        expenseColor="rgb(48, 79, 254) none repeat scroll 0% 0%"
        insertDecimal= {insertDecimal}
      />
      <ExpenseList
        typeOfExpense ="Bi-Weekly"
        avgDivider="26" 
        expenselist={enteredExpense.filter(expenses => expenses.type == 26)}
        onRemoveItem={removeExpenseHandler}
        onEditItem={editExpenseHandler}
        expenseColor="#7200ca"
        insertDecimal= {insertDecimal}
      />
      <ExpenseList
        typeOfExpense ="Variable"
        expenselist={enteredExpense.filter(expense => (expense.type !== "12" && expense.type !== "26" && expense.type !== "52"))}
        onRemoveItem={removeExpenseHandler}
        onEditItem={editExpenseHandler}
        expenseColor="rgb(31, 110, 114) none repeat scroll 0% 0%"
        insertDecimal= {insertDecimal}
      />
      <ExpenseModal 
        showvalue={show} 
        onModalHandler={modalHandler}
        onAddExpense={addExpenseHandler}
        insertDecimal= {insertDecimal}
      />
      <div> 
        <button onClick = {() => {auth.signOut()}}>
          Sign out
        </button>
      </div>
    </div>  
  );
}

export default Expense;