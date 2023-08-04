import React from "react";
import { Link, redirect } from "react-router-dom";


const signOut = () => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('userMail');

    if(window.location.pathname !== '/') {
        redirect('/');
    } else {
        window.location.reload();
    }
}

export const Sidebar = () => {


    return (
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100 justify-content-between">
                <hr />
                <h2 className="d-none d-sm-inline">Menu</h2>
                <hr />
                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                    <li className="nav-item">
                        <Link to="/" className="nav-link align-middle px-0">
                            <i className="bi bi-house"></i> <span className="ms-1 d-none d-sm-inline">Main Screen</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/tickets" data-bs-toggle="collapse" className="nav-link px-0 align-middle">
                            <i className="bi bi-ticket"></i> <span className="ms-1 d-none d-sm-inline">Tickets</span> 
                        </Link>
                    </li>
                    <li>
                        <Link to="/invoices" className="nav-link px-0 align-middle">
                            <i className="bi bi-file-earmark"></i> <span className="ms-1 d-none d-sm-inline">Invoices</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/clientDetail" data-bs-toggle="collapse" className="nav-link px-0 align-middle ">
                            <i className="bi bi-person"></i> <span className="ms-1 d-none d-sm-inline">Client Information</span>
                        </Link>
                    </li>
                </ul>
                <hr />
                <div className="pb-4">
                    <button onClick={signOut} className="d-flex align-items-center text-white bg-transparent border-0 text-decoration-none">
                        <span className="d-none d-sm-inline mx-1">Sign Out</span>
                    </button>
                </div>
            </div>
        </div>
    )
}