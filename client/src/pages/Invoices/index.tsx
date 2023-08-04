import React, { useState, useEffect } from "react";
import { Sidebar } from "../../components/SideBar";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export const Invoices = () => {
    const [invoices, setInvoices] = useState<any>(null);
    const { id } = useParams();

    useEffect(() => {
        const getInvoices = async () => {
            const data = {
                action: 'GetInvoices',
                userId: id
            }

            await axios.post('http://dev.bigcore.net/api/data', data).then((res) => setInvoices(res.data.invoices.invoice ?? []));
        }

        getInvoices();
    }, [id]);

    if(!id) {
        return (
            <div className='container-fluid d-flex justify-content-center align-items-center flex-column p-2 bd-highlight vh-100'>
                <h3>Something went wrong</h3>
                <Link to='/'>Go back</Link>
            </div>
        )
    }

    if(!invoices) {
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
                        <h2>Your Invoices</h2>
                        <br />
                        
                        <div className="table-responsive">
                            <table className="table table-striped table-sm">
                            {invoices.length === 0 && <p className="lead">This client has no invoices yet.</p>}
                                <thead>
                                    <tr>
                                        <th>Invoice ID</th>
                                        <th>Client Name</th>
                                        <th>Invoice Date</th>
                                        <th>Invoice Amount</th>
                                        <th>Invoice Status</th>
                                        <th>Payment Method</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {invoices.map((invoice: any, index: number) => {
                                        return (
                                            <tr key={`invoice-${invoice.id}-${index}`}>
                                                <td>
                                                    <Link to={`${invoice.id}`} key={`invoice-${index}`}>
                                                        {invoice.id}
                                                    </Link>
                                                </td>
                                                <td>{invoice.clientName}</td>
                                                <td>{invoice.date}</td>
                                                <td>{invoice.subtotal}</td>
                                                <td>{invoice.status}</td>
                                                <td>{invoice.paymentmethod}</td>
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