import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Sidebar } from '../../components/SideBar';
import { DataContextType } from '../../utils/types';
import DataContext from '../../context/dataContext';
import { Link } from 'react-router-dom';

export const Main = () => {
    const userMail = sessionStorage.getItem('userMail');
    const { setClients } = useContext(DataContext) as DataContextType;
    const [user, setUser] = useState();

    useEffect(() => {
        const data = {
            search: userMail,
            action: 'GetUsers'
        }

        const fetchData = async () => {
           await axios.post('http://localhost:5050/api/data',data).then(res => {
                setUser(res.data.users[0]);
                setClients(res.data.users[0].clients);
           })
        }

        fetchData();
    }, [setClients, userMail]);

    if(!user) {
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
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <Sidebar />
                <div className="col py-3">
                    <h3>Welcome {(user as any).firstname} {(user as any).lastname}</h3>
                    <br />
                    <p className="lead">
                       Please pick an action from the sidebar.</p>
                </div>
            </div>
        </div>
    )
}