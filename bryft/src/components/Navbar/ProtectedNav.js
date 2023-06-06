import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';

const Protected = ({ children }) => {
  const { user } = UserAuth();
  if (!user) {
    return <Navigate to='/' />; //can nav to error page
  }
  return children;
};

export default Protected;