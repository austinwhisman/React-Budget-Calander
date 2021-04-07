import React, {useEffect, useState}from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import TotalComponent from './TotalCounter.js'

const ExpenseList = props => {

  //Return the total counters, 
  return(
    <>
      <Container fluid="sm"  style={{background: "#263238", margin: "20px auto", borderRadius: "8px"}}>
        <Row>
          <Col sm="2" style={{background: "#1b1b1b", borderRadius: "4px"}}>
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
          <Col>
            {props.expenselist.map( e =>
              <div key={e.id} style={{ display: "inline-block", padding: "10px 15px"}} >
              { 
                <div  style={{background: props.expenseColor, borderRadius: "8px"}}>
                  <button 
                    onClick={props.onRemoveItem.bind(this, e.id)}
                    style={{
                      background: "transparent",
                      border: "transparent",
                      color: "white",
                      float: "right"
                  }}>
                    <span>x</span>
                  </button>
                  <p style={{ 
                    display: "inline-block", 
                    marginTop: "11px",
                    marginLeft: "20px"
                  }}>  
                    Title: 
                  </p>
                  <p style={{ display: "inline-block", marginRight: "30px"}}>
                    {e.title}
                  </p>
                  <div>
                    <p style={{ display: "inline-block", marginLeft: "20px"}}>  
                      Cost: 
                    </p>
                    <p style={{ display: "inline-block"}}>  
                      {props.insertDecimal(e.expense)} 
                    </p>
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