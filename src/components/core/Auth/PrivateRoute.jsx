import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
import { ACCOUNT_TYPE } from '../../../utils/constants';

const PrivateRoute = ({children, adminOnly = false}) => {
    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);

    if (!token) {
        return <Navigate to="/auth/login" replace />;
    }

    if (adminOnly && user?.accountType !== ACCOUNT_TYPE.ADMIN) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default PrivateRoute;
