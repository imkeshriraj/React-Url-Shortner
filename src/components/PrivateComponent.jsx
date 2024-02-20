import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'


const PrivateComponent = () => {
    const auth = localStorage.getItem('auth'); // get the user from local storage
    return auth ? <Outlet /> : <Navigate to='/' />;
}

export default PrivateComponent
