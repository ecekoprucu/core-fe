import axios from "axios";
import React, { useEffect, useState } from "react";
import { Sidebar } from "../../components/SideBar";
import { Link } from "react-router-dom";

export const ClientsPage = () => {
    const [clients, setClients] = useState<any[] | null >(null);
    const userMail = sessionStorage.getItem('userMail');

    useEffect(() => {
        const getClients = () => {
            const data = {
                search: userMail,
                action: 'GetClients'
            }

            axios.post('http://dev.bigcore.net/api/data', data).then(res => {
                setClients(res.data.clients.client);
            });
        }

        getClients();
    }, [userMail]);

    if(!clients) {
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
                <div className="col py-3">
                    <h2>Your Clients</h2>
                    <br />
                    <div className="table-responsive">
                        <table className="table table-striped table-sm">
                            <thead>
                                <tr>
                                    <th>Client ID</th>
                                    <th>Client Name</th>
                                    <th>Client Email</th>
                                    <th>Client Status</th>
                                    <th>Client Invoices</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clients.map((client, index) => {
                                    return (
                                     
                                            <tr key={index}>
                                                <td>
                                                    <Link to={`/clients/${client.id}`} key={`client-${index}`}>
                                                        {client.id}
                                                    </Link>
                                                </td>

                                                <td>{client.firstname} {client.lastname}</td>
                                                <td>{client.email}</td>
                                                <td>{client.status}</td>
                                                <td>
                                                    <Link to={`/clients/${client.id}/invoices`} key={`client-${index}`}>
                                                        View Invoices
                                                    </Link>
                                                </td>
                                            </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}