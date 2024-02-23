import React from 'react'
import { Navigate, Outlet } from 'react-router'

function AdminRoute() {
        
    const cookie = document.cookie
    const cookieArray = cookie.split(';').includes(" t_role=admin")
    return cookieArray ? <Outlet /> :<Navigate to='*'/>
}

export default AdminRoute
