import '../App.css';
import ExpenseModal from './FormModal/FormModal.js'
import ExpenseList from './ListComponent/ExpenseList.js'
import TotalComponent from './ListComponent/TotalCounter.js'
import React, {useEffect, useState} from 'react'

function Expense() {
  const [darkTheme, setDarkTheme] = React.useState(false)
  const [enteredExpense, setExpense] = useState([]);
  const [show, setShow] = useState(false);
  
  //Fetch Data Stored on Firebase Db. gets resonse. turns to JSON, maps to Expense Array.
  useEffect(() => {
    fetch('https://alwbudgetcalculator-default-rtdb.firebaseio.com/expenses.json')
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
    fetch('https://alwbudgetcalculator-default-rtdb.firebaseio.com/expenses.json', {
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
  
  //remove post from DB and DOM
  const removeExpenseHandler = (expenseId) => {
    fetch(
      `https://alwbudgetcalculator-default-rtdb.firebaseio.com/expenses/${expenseId}.json`,
      {
        method: 'DELETE'
      }
    ).then(response => {
        setExpense(prevExpense =>
          prevExpense.filter(expense => expense.id !== expenseId)
      );
    })
  };
   //turns value into string with decimal, two digits, and a commz if in thousands.
  const insertDecimal = integer => Number(Math.round(Number(integer) * 100) / 100)
  .toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <div id="parent-container" className={darkTheme ? 'light-theme' : 'dark-theme'}>
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
        onRemoveItem={removeExpenseHandler}
        expenseColor="#ff1744"
        insertDecimal= {insertDecimal}
      />
      <ExpenseList 
        typeOfExpense ="Weekly"
        avgDivider="52"
        expenselist={enteredExpense.filter(expenses => expenses.type == 52)}
        onRemoveItem={removeExpenseHandler}
        expenseColor="rgb(48, 79, 254) none repeat scroll 0% 0%"
        insertDecimal= {insertDecimal}
      />
      <ExpenseList
        typeOfExpense ="Bi-Weekly" 
        expenselist={enteredExpense.filter(expenses => expenses.type == 26)}
        onRemoveItem={removeExpenseHandler}
        expenseColor="#7200ca"
        insertDecimal= {insertDecimal}
      />
      <ExpenseList
        typeOfExpense ="Variable"
        expenselist={enteredExpense.filter(expense => (expense.type !== "12" && expense.type !== "26" && expense.type !== "52"))}
        onRemoveItem={removeExpenseHandler}
        expenseColor="rgb(31, 110, 114) none repeat scroll 0% 0%"
        insertDecimal= {insertDecimal}
      />
      <ExpenseModal 
        showvalue={show} 
        onModalHandler={modalHandler}
        onAddExpense={addExpenseHandler}
        insertDecimal= {insertDecimal}
      />
    </div>  
  );
}

export default Expense;