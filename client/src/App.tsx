import './App.css';
import { Route, Routes } from "react-router-dom";
import { ErrorPage } from './pages/Error';
import { Login } from "./pages/Login";
import { Main } from './pages/Main';
import { Tickets } from './pages/Tickets';
import { Ticket } from './pages/Ticket';
import { Reply } from './pages/Reply';

function App() {

  return (
      <Routes>
        <Route path="/" element={ !sessionStorage.getItem('user') || !sessionStorage.getItem('userMail') ? <Login /> : <Main />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/tickets">
          <Route index element={<Tickets />} />
          <Route path=':id' element={<Ticket />} />
        </Route>
        <Route path="/reply">
          <Route path=':id' element={<Reply />} />
        </Route>

      </Routes>
  )
}

export default App;
