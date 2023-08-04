import React, { useEffect, useState } from "react";

import { Sidebar } from "../../components/SideBar";
import { useParams } from "react-router-dom";
import axios from "axios";

export const ClientDetail = () => {
    const { id } = useParams();
    const [client, setClient] = useState<any>(null);
    useEffect(() => {
        const getClientDetail = async () => {
            const data = {
                action: 'GetClientsDetails',
                clientId: id
            }

            await axios.post('http://dev.bigcore.net/api/data/api/data', data).then((res) => setClient(res.data.client));
        }
        getClientDetail();
    }, [id]);

    if(!client) {
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
                        <h1>Client #{id}</h1>
                        <p><b>Client Name:</b> {client.fullname}</p>
                        <p><b>Client Country:</b> {client.countryname}</p>
                        <p><b>Client Telephone Number:</b> {client.telephoneNumber}</p>
                        <p><b>Client Status:</b> {client.status}</p>
                        <br />
                        <div>
                            <h3>Client Users</h3>
                            <ul>
                                {client.users.user.map((user: any, index: number) => {
                                    return (
                                        <li key={index}>
                                            <p><b> {!!user.is_owner && <i className="bi bi-star"></i> } User ID:</b> {user.id}</p>
                                            <p><b>User Name:</b> {user.name}</p>
                                            <p><b>User Email:</b> {user.email}</p>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

    )
}