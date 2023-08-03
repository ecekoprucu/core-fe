import './App.css';
import { Route, Routes } from "react-router-dom";
import { ErrorPage } from './pages/Error';
import { Login } from "./pages/Login";
import { DataProvider } from './context/dataContext';
import { Main } from './pages/Main';

function App() {

  return (
    <DataProvider>
      <Routes>
        <Route path="/" element={ !sessionStorage.getItem('user') || !sessionStorage.getItem('userMail') ? <Login /> : <Main />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </DataProvider>
  )
}

export default App;
