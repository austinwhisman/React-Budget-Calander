import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


const ExpenseModal =({onModalHandler, showvalue, onAddExpense}) => {
  
    const [title, setTitle] = useState('');
    const [cost, setCost] = useState(0);
    const[type, setType] = useState('12');
    
    const setTypeAndShow = (type) => {
        if(parseInt(type) === 1)  {setType(type); return document.getElementsByClassName('type-selector')[0].style.display = "block";}
        setType(type);
        document.getElementsByClassName('type-selector')[0].style.display = "none";
    }

    return(
        <React.Fragment>
            <div style= {{display: 'flex', justifyContent: 'center', position: 'fixed', top: '30px', right:"10px"}}>
            <Button onClick={onModalHandler}>
                Add Expense
            </Button>
            </div>
            <Modal 
                show ={showvalue}
                onHide={onModalHandler}
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <h1>
                        Expense Form
                    </h1>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={ e => {
                            e.preventDefault();
                            onModalHandler(); 
                            setTimeout(onAddExpense(title, cost, type), 3000)
                            setType('12')
                        }
                    }>

                        <Form.Group>
                            <Form.Label>
                                Expense:
                            </Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="What is the expense" 
                                onChange={e => setTitle(e.target.value)} 
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Cost:</Form.Label>
                            <Form.Control 
                                type="number" 
                                placeholder="0"
                                step="0.01" 
                                onChange={ e => setCost(e.target.value) }
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Annual amount:</Form.Label>
                            <Form.Control as="select" onChange={e => setTypeAndShow(e.target.value) } >
                                <option value={12}>Monthly</option>
                                <option value={52}>Weekly</option>
                                <option value={26}>Bi-Weekly</option>
                                <option value={1}>Variable</option>
                            </Form.Control>
                            <Form.Text className="text-muted">
                                How often do you pay this a year? Select variable for a custom amount.
                            </Form.Text>
                            <Form.Control 
                                className="type-selector" 
                                type="number"
                                onChange={e =>setType(e.target.value)}
                                style={{display: 'none'}}
                            />
                        </Form.Group>
                        <button>
                            Click me
                        </button>
                    </Form>
                </Modal.Body>
            </Modal>
        </React.Fragment>
        
    )
  }
  
  export default ExpenseModal