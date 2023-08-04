import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { Sidebar } from "../../components/SideBar";
import { Button } from "react-bootstrap";

export const Ticket = () => {
    const { id } = useParams();
    let navigate = useNavigate();
    const { state } = useLocation();

    const [ticket, setTicket] = useState<any>(null);

    const userMail = sessionStorage.getItem('userMail');


    useEffect(() => {
        const getTicket = async () => {
            const data = {
                action: 'GetTicket',
                ticketId: id
            }

            await axios.post('http://dev.bigcore.net/api/data/api/data', data).then((res) => setTicket(res.data));
        }

        getTicket();
    }, [id]);
    
    const redirectToAddReply = (name: string) => {
        navigate(`/reply/${id}`, {
            state: {
                name: name,
                from: state.from,
                ...{
                    ...(state && state.from === 'client' ? { clientId: state.clientId } : {}),
                }
            }
        })
    }

    if(!ticket) {
        return (
            <div className='container-fluid d-flex justify-content-center align-items-center flex-column p-2 bd-highlight vh-100'>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
           </div>
        )
    }

    if(!userMail) {
        return (
            <div className='container-fluid d-flex justify-content-center align-items-center flex-column p-2 bd-highlight vh-100'>
                <h3>Something went wrong</h3>
                <Link to='/'>Go back</Link>
            </div>
        )
    }
    
    return (
        <div className='container-fluid'>
            <div className="row flex-nowrap">
                <Sidebar />
                <div className="container-sm col">
                    <h1>Ticket #{id}</h1>
                    <p><b>Department:</b> {ticket.deptname}</p>
                    <p><b>User Full Name:</b> {ticket.name}</p>
                    <p><b>User Email:</b> {ticket.email}</p>
                    <p><b>Priority:</b> {ticket.priority}</p>
                    <p><b>Subject:</b> {ticket.subject}</p>
                    <p><b>Issue Date:</b> {ticket.date}</p>
               </div>
               <div className="container-sm col">
                    <h1>Conversation</h1>
                    {ticket.replies.reply.map((reply: any, index: number) => {
                        return (
                            <div key={reply.id + '_' + index}>
                                <h5>{reply.requestor_name}</h5>
                                <textarea className="form-control" value={reply.message} readOnly />
                            </div>
                        )
                    })}
                    <Button variant="primary" onClick={() => redirectToAddReply(ticket.name)} className="mt-2">Add Reply To The Conversation</Button>
               </div>
            </div>
        </div>
    )
}