import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Sidebar } from "../../components/SideBar";
import axios from "axios";

export const InvoiceDetail = () => {
    const { invoiceId } = useParams();
    const [invoice, setInvoice] = useState<any>(null);

    useEffect(() => {
       const getInvoice = async () => {
           const data = {
                action: 'GetInvoice',
                invoiceid: invoiceId
            }
            await axios.post('http://dev.bigcore.net/api/data', data).then(res => {
                setInvoice(res.data);
            });
       }
       getInvoice();
    }, [invoiceId]);

    if(!invoice) { 
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
                    <h1>Invoice #{invoiceId} Detail</h1>
                    <br />
                    <div className="row">
                        <div className="col">
                            <h5><b>Invoice ID:</b> {invoiceId}</h5>
                            <h5><b>Invoice Date:</b> {invoice.date}</h5>
                            <h5><b>Invoice Amount:</b> {invoice.subtotal}</h5>
                            <h5><b>Invoice Status:</b> {invoice.status}</h5>
                            <h5><b>Payment Method:</b> {invoice.paymentmethod}</h5>
                            <br />
                            <div className="row">
                                <div className="col">
                                    <h4>Items</h4>
                                    <br />
                                    <table className="table table-striped table-sm">
                                        <thead>
                                            <tr>
                                                <th>Item ID</th>
                                                <th>Item Description</th>
                                                <th>Item Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {invoice.items.item.map((item: any) => (
                                                <tr key={item.id}>
                                                    <td>{item.id}</td>
                                                    <td>{item.description}</td>
                                                    <td>{item.amount}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}