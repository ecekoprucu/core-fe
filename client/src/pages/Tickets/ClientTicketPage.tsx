import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Sidebar } from "../../components/SideBar";

export const ClientTicketPage = () => {
    const { clientId } = useParams();

    const [clientTickets, setClientTickets] = useState<any>(null);

        useEffect(() => {
            const getClientTickets = async () => {
                const data = {
                    clientId: clientId,
                    action: 'GetTickets'
                }
                await axios.post('http://dev.bigcore.net/api/data', data).then(res => {
                   setClientTickets(res.data.tickets.ticket);
                });
            }
            getClientTickets();
        }, [clientId]);

    if(!clientId) {
        return (
            <div className='container-fluid d-flex justify-content-center align-items-center flex-column p-2 bd-highlight vh-100'>
                <h3>Something went wrong</h3>
                <Link to='/'>Go back</Link>
            </div>
        )
    }

    if(!clientTickets) {
        return (
            <div className='container-fluid d-flex justify-content-center align-items-center flex-column p-2 bd-highlight vh-100'>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
           </div>
        )
    }
    
    return (
        <div className="container-fluid">
         <div className="row flex-nowrap">
            <Sidebar />
            <div className="container-sm col">
            <h1 className="text-center">Client {clientId}'s Tickets</h1>
                {clientTickets.map((ticket: any, index: number) => {
                     return (
                        <li className="d-flex align-items-center flex-column justify-content-evenly my-2" key={index}>
                            <Link state={{
                                from: 'client',
                                clientId: clientId
                            }} to={`/tickets/${ticket.id}`}><h6 className="mb-0">Ticket ID: #{ticket.id}</h6></Link>
                        </li>
                        )
                })}
            </div>
         </div>
        </div>
    )
}