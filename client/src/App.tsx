import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const formRef = useRef(null);
  const [action, setAction] = useState<undefined | string>('ValidateLogin');
  const [result, setResult] = useState(null);
  const [clientId, setClientId] = useState(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [mail, setMail] = useState<string | undefined>(undefined);
  const [tickets, setTickets] = useState(null);
  const [ticketId, setTicketId] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(formRef.current!);
    const email = formData.get('email');
    const password = formData.get('password');
    const subject = formData.get('subject');
    const message = formData.get('message');

    if((email?.toString().replace(' ', '').trim() === '' || email === null || email?.toString().length === 0) && !!!mail ) {
      return;
    }

    email && setMail(email.toString());
    
    const data = {
      email: mail ?? email,
      action: action,
      password,
      ticketId,
      message,
      subject,
        ...(action === 'GetInvoices' ? { userId: clientId } : {clientId: clientId}),
    };

   const response = await axios.post('http://localhost:5050/api/data', data);
   
   !!response.data.id && setClientId(response.data.id);
   !!response.data.userid && setUserId(response.data.userid);
   !!response.data.tickets && setTickets(response.data.tickets.ticket);

   if(action === 'GetInvoices' && !clientId) 
     return;

   setResult(response.data)
  }

  useEffect(() => {
    setResult(null);
  }, [action]);

  useEffect(() => {
    if(userId) {
      const data = {
        action: 'GetClientsDetails',
        email: mail
      }

      axios.post('http://localhost:5050/api/data', data).then((response) => {
        setClientId(response.data.id);
      });
    }
  }, [mail, userId])

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.value) {
      case undefined:
        return;
      case 'GetClientsDetails':
        setAction(event.target.value);
        return;
      case 'GetInvoices':
        !!mail ? setAction(event.target.value) : setAction('ValidateLogin');
        return;
      case 'GetTickets':
        !!mail ? setAction(event.target.value) : setAction('ValidateLogin');
        return;
      default:
    }
  }

  const handleTicketClick = (ticketId: string) => {
    setTicketId(ticketId);
    setAction('AddTicketReply');
  }
  
  return (
    <div className="App">
      { (mail || clientId) && <select value={action} onChange={handleSelectChange}>
          <option value={undefined}>Select Action</option>
          <option value='GetClientsDetails'>Get Client Details (Email) </option>
          <option value='GetInvoices'>Get Invoices (Client ID)</option>
          <option value='GetTickets'>Get Tickets (Client ID) </option>
      </select>}
        <form onSubmit={handleSubmit} ref={formRef}>
         { action === 'GetClientsDetails' && <>
           <p>Get Client Info</p>
           <label htmlFor='email'>Email</label>
           <br />
           <input type='text' required name='email' placeholder='Email' />
           <br />
         </> }
          { action === 'GetInvoices' && <>
            <p>Get Invoices For The User {clientId}</p>
            </>
          }
           { action === 'GetTickets' && <>
            <p>Get Tickets For The User {clientId}</p>
            </>
          }
          {
            action === 'ValidateLogin' && <>
              <p>Login</p>
              <label htmlFor='email'>Email</label>
              <br />
              <input type='text' required name='email' placeholder='Email' />
              <br />
              <label htmlFor='password'>Password</label>
              <br />
              <input type='password' required name='password' placeholder='Password' />
              <br />
            </>
          }
          {
            action === 'GetTickets' && tickets && 
            <div>
              <p>Tickets</p>
              <ul>
                {(tickets as any).map((ticket: any) => <li key={ticket.id}>{ticket.subject} - {ticket.ticketid} - {ticket.owner_name} - {ticket.email} - <button onClick={() => handleTicketClick(ticket.id)}>Reply</button></li>)}
              </ul>
            </div>
          }
          {
            action === 'AddTicketReply' && ticketId && <>
              <p>Add Ticket #{ticketId} Reply </p>
              <br />
              
             
                <label htmlFor='subject'>Subject</label>
                <br />
                <input type='text' name='subject' required placeholder='Subject'/>
                <br />
                <label htmlFor='message'>Message</label>
                <br />
                <textarea name='message' required placeholder='Message'/>
                <br />

            </>
          }
          {!!action && action.length > 0 &&  <button type='submit'>Submit</button>}
        </form>

        {!!result && action!== 'GetTickets' && <div>
          <p>Result</p>
          <p>{JSON.stringify(result)}</p>
        </div>}
    </div>
  );
}

export default App;
