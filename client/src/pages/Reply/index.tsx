import React, { useState } from 'react';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { Sidebar } from '../../components/SideBar';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

export const Reply = () => {
    const userMail = sessionStorage.getItem('userMail');

    const { id } = useParams();
    let navigate = useNavigate();
    const { state } = useLocation();
    const [sendingState, setSendingState] = useState(false);

    if(!userMail || !id) {
        return (
            <div className='container-fluid d-flex justify-content-center align-items-center flex-column p-2 bd-highlight vh-100'>
                <h3>Something went wrong</h3>
                <Link to={`/tickets/${id}`}>Go back</Link>
            </div>
         )
    }

    if(sendingState) {
        return (
            <div className='container-fluid d-flex justify-content-center align-items-center flex-column p-2 bd-highlight vh-100'>
                <h6>Sending...</h6>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
           </div>
        )
    }
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const message = formData.get('message');
        const customField = formData.get('customField');
        setSendingState(true)
        const data = {
            action: "AddTicketReply",
            ticketId: id,
            message,
            customField: customField && customField?.toString().length > 0 ? customField : null,
            ...{
                ...(state && state.from === 'ticket' ? { email: userMail, name: state.name } : {clientId: state.clientId}),
            }

        }

        await axios.post('http://localhost:5050/api/data', data).catch(() => {
            alert('An error occured.');
            setSendingState(false);
        }).then(() => {
            navigate(`/tickets/${id}`)
            setSendingState(false);
        });
    }

    return (
        <div className='container-fluid'>
            <div className="row flex-nowrap">
                <Sidebar />
                <div className='container-md col'>
                    <h1>Reply To Ticket #{id}</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Your Message: </Form.Label>
                            <textarea name="message" required className='form-control' placeholder='Write your reply here...' />

                            <Form.Label>Additional Info: </Form.Label>
                            <Form.Control name="customField" type="text" placeholder="Additional Info" />
                            <Button className="my-4 w-100" variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form.Group>
                    </Form>
                </div>
                <div className='container-md col'/>
            </div>
        </div>
    );
}