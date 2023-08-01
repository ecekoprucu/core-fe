import React, { useRef } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const formRef = useRef(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(formRef.current!);
    const data = {
      email: formData.get('email')
    };
    
   const response = await axios.post('http://localhost:5050/api/data', data);
   console.log(response);
  }

  return (
    <div className="App">
        <form onSubmit={handleSubmit} ref={formRef}>
           <label htmlFor='email'>Email</label>
           <br />
           <input type='text' name='email' placeholder='Email' />
           <br />
           <button>Submit</button>
        </form>
    </div>
  );
}

export default App;
