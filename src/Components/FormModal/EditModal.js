import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


const EditModal = props => {
    const [title, setTitle] = useState('');
    const [cost, setCost] = useState('');
    const[type, setType] = useState('');
    const [show, setShow] = useState(false);

    useEffect(() => {
       setTitle(props.currentExpense.title);
       setCost(props.currentExpense.expense);
       setType(props.currentExpense.type);
    }, [])

    const modalHandler = () => { 
        const showvalue = !show;
        setShow(showvalue);
      }

    const setTypeAndShow = (type) => {
        if(parseInt(type) === 1)  {setType(type); return document.getElementsByClassName('type-selector')[0].style.display = "block";}
        setType(type);
        document.getElementsByClassName('type-selector')[0].style.display = "none";
    }

    return(



        <React.Fragment>
             <Modal 
                show ={show}
                onHide={modalHandler}
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
                            modalHandler(); 
                            setTimeout(props.editExpense(title, cost, type, props.currentExpense.id), 3000)
                             setType('12')
                        }
                    }>

                        <Form.Group>
                            <Form.Label>
                                Expense:
                            </Form.Label>
                            <Form.Control
                                value={title} 
                                type="text" 
                                placeholder="What is the expense" 
                                onChange={e => setTitle(e.target.value)} 
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Cost:</Form.Label>
                            <Form.Control 
                                value={cost}
                                type="number" 
                                placeholder="0"
                                step="0.01" 
                                onChange={ e => setCost(e.target.value) }
                                required
                            />
                        </Form.Group>
                         <Form.Group>
                             <Form.Label>Annual amount:</Form.Label>
                             <Form.Control as="select" onChange={e => setTypeAndShow(e.target.value) } value={type} >
                                 <option value={12}>Monthly</option>
                                 <option value={52}>Weekly</option>
                                 <option value={26}>Bi-Weekly</option>
                                 <option value={1}>Variable</option>
                             </Form.Control>
                             <Form.Text className="text-muted">
                                 How often do you pay this a year? Select variable for a custom amount.
                             </Form.Text>
                             <Form.Control
                                 valu 
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

            <button style={{background: "blue"}} onClick={() => {
                    modalHandler(); 
                }}>
                Edit
            </button>
        </React.Fragment>
    )
  }
  
  export default EditModal