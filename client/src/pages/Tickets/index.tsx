import React, { useContext, useEffect, useState } from "react";
import DataContext from "../../context/dataContext";
import { DataContextType } from "../../utils/types";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Sidebar } from "../../components/SideBar";

export const Tickets = () => {

    const { clients } = useContext(DataContext) as DataContextType;
    const userMail = sessionStorage.getItem('userMail');
    const navigate = useNavigate();

    const [userTickets, setUserTickets] = useState(null);

    useEffect(() => {
        const getTicketsByUser = async () => {
            const data = {
                email: userMail,
                action: 'GetTickets'
            }
            
            await axios.post('http://dev.bigcore.net/api/data/api/data', data).then(res => setUserTickets(res.data.tickets.ticket));
        }
        getTicketsByUser();
    }, [userMail]);

    const redirectToClientTickets = (clientId: number | string) => {
        navigate(`clientTickets/${clientId}`, {
            state: {
                from: 'client',
            }
        })
    }

   
    if(!clients || !userMail) { 
        return (
            <div className='container-fluid d-flex justify-content-center align-items-center flex-column p-2 bd-highlight vh-100'>
                <h3>Something went wrong</h3>
                <Link to='/'>Go back</Link>
            </div>
         )
    }

    if(!userTickets) {
        return (
            <div className='container-fluid d-flex justify-content-center align-items-center flex-column p-2 bd-highlight vh-100'>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
           </div>
        )
    }

    return (
        <div className='container-fluid'>
             <div className="row flex-nowrap">
                <Sidebar />
                <div className="container-sm col">
                    <h1 className="text-center">Tickets For Client</h1>
                    <ul>
                        {clients && clients.map((client, index) => {
                            return (
                            <li className="d-flex align-items-center justify-content-evenly my-2" key={index}>
                                <h6 className="mb-0">Client ID: #{client.id}</h6>
                                &nbsp;
                                <Button size="sm" variant="secondary" onClick={() => redirectToClientTickets(client.id)}>Get Tickets</Button>
                            </li>
                            )
                        })}
                    </ul>
                </div>
                <div className="container-sm col">
                    <h1 className="text-center">Tickets For User</h1>
                    <ul>
                        {userTickets && (userTickets as any)?.map((ticket: any, index: React.Key | null | undefined) => {
                            return (
                            <li className="d-flex align-items-center flex-column justify-content-evenly my-2" key={index}>
                                <Link state={{
                                    from: 'user'
                                }} to={`/tickets/${ticket.id}`}><h6 className="mb-0">Ticket ID: #{ticket.id}</h6></Link>
                            </li>
                            )
                        })}
                    </ul>
                </div>
             </div>
        </div>
    )
}