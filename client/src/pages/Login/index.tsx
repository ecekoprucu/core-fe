import React, { useState, useContext } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';

import { DataContextType } from '../../utils/types';
import DataContext from '../../context/dataContext';
import { AlertComponent } from '../../components/Alert';
import axios from 'axios';

export const Login = () => {

    const { setUserEmail, setUserid } = useContext(DataContext) as DataContextType;
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [alertType, setAlertType] = useState<string>('success');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => { 
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get('email');
        const password = formData.get('password');

        if((email?.toString().replace(' ', '').trim() === '' || email === null || email?.toString().length === 0)) {
            setAlertType('danger');
            setShowAlert(true);
            return;
         }

       const data = {
            email,
            password,
            action: 'ValidateLogin'
       }

       await axios.post('http://dev.bigcore.net/api/data/api/data', data).then(res => {
        
        if(res.data.result === 'error') {
            setAlertType('danger');
        } 

        if(res.data.result === 'success') {
            setUserEmail(email?.toString());
            setUserid(res.data.userid);
            sessionStorage.setItem('user', res.data.userid);
            sessionStorage.setItem('userMail', email?.toString());
            window.location.reload();
        }

       }).catch(err => {
        console.error(err);
        alert('Unexpected error, please try again later');
        return
       });
       setShowAlert(true);

    }

    const handleAlertText = () => {
        switch(alertType) {
            case 'danger':
                return 'Invalid credentials';
            case 'success':
                return 'Login successful';
            default:
                return '';
        }
    }

    return (
     <div className="bg-secondary bg-gradient vh-100">
        <div className="d-md-flex container-fluid justify-content-center align-items-center flex-column p-2 bd-highlight">
            <Row>
                <Col>
                    <h1 className='text-center'>Login</h1>
                    <br />
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicEmail">
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control required type="email" name="email" placeholder="Enter e-mail" />
                        </Form.Group>
                        <br />
                        <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control required type="password" name="password" placeholder="Enter password" />
                        </Form.Group>
                        <br />
                        <Row>
                            <Col className='flex'>
                                <Button className='w-100' variant="primary" type="submit">
                                    Login
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </div>
        {showAlert && <AlertComponent show={showAlert} setShow={setShowAlert} role={alertType} text={handleAlertText()}/>}
     </div>
    );
}
