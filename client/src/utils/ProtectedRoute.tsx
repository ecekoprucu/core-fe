import { useContext } from 'react';
import {
    Navigate,
  } from 'react-router-dom';
import DataContext from '../context/dataContext';
import { DataContextType } from './types';

type Props = {
    children: React.ReactNode;
};
  
const ProtectedRoute = ({ children }: Props) => {
    const { userEmail, clientid } = useContext(DataContext) as DataContextType;
  
    if (!userEmail && !clientid) {
      return <Navigate to="/" replace />;
    }
  
    return children;
};

export default ProtectedRoute;