import React from 'react';
import { useSelector } from 'react-redux';
import RedirectOnLoading from './RedirectOnLoading';

const PrivateRoute = ({ children }) => {
    const { user } = useSelector((state) => ({ ...state.auth }));
    return user ? children : <RedirectOnLoading/>;
};

export default PrivateRoute;