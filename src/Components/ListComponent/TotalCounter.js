import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
const TotalComponent = props => {
  
  //turns value into string with decimal, two digits, and a commz if in thousands.

  //return the unfiltered total counter
  if(props.avgDivider == undefined) { return(<p> Total: {props.insertDecimal(props.expenseArray)}</p> ) }

  //return filtered Totals, with Avg
  return(
    <> 
      <p> Total: {props.insertDecimal(props.expenseArray) }</p>
      <p> Avg: {props.insertDecimal(props.expenseArray/parseFloat(props.avgDivider))}</p>
    </>
  )

}
export default TotalComponent