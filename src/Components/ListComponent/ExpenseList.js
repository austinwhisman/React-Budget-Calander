import React, {useState} from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import TotalComponent from './TotalCounter.js'
import '../../stylesheets/expenseStyles.css'
import EditModal from '../FormModal/EditModal'

const ExpenseList = props => {

  const testFunction = (e, i, o) => {console.log(e, i, o)}

  

  //Return the total counters, and individual expenses
  return(
    <>
      <Container fluid="sm"  style={{background: "#263238", margin: "20px auto", borderRadius: "8px"}}>
        <Row>
          <Col sm="2" style={{background: props.expenseColor, borderRadius: "4px"}}>
            <p style= {{
              fontSize: "28px",
              fontStyle: "italic"
            }}> {props.typeOfExpense} </p>
            <TotalComponent 
              expenseArray={props.expenselist
                .reduce((Accumulator, Expense) => Accumulator + (Expense.type * parseFloat(Expense.expense)), 0)}
              avgDivider={props.avgDivider}
              insertDecimal={props.insertDecimal}
            />
          </Col>
          <Col className="expense-column">
            {props.expenselist.map( e =>
            
              <div key={e.id} className="expense-wrapper" >
                { 
                  <div className="expense-wrapper-body" style={{background: props.expenseColor}}>
                    <div className="expense-header">
                      <EditModal 
                        currentExpense={e} 
                        onClick ={testFunction}
                        editExpense={props.onEditItem}
                      />
                      <button 
                        onClick={props.onRemoveItem.bind(this, e.id)}
                        className="expense-remove-button">
                        <span>x</span>
                      </button>
                    </div>
                    <div className="expense-content-wrapper">
                      <p className="expense-content-title">
                        {e.title}
                      </p>
                      <div className="expense-content-cost-wrapper">
                        <p className="expense-content-cost-label">  
                          Cost
                        </p>
                        <p className="expense-content-cost-number">  
                          {props.insertDecimal(e.expense)} 
                        </p>
                      </div>
                    </div>
                  </div>     
                }
              </div>
            )}
          </Col> 
        </Row>
      </Container>

    </>
  )
}
  
export default ExpenseList