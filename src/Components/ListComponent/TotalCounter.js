import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
const TotalComponent = props => {

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