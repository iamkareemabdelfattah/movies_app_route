
import React from 'react'
import { Redirect, Route } from 'react-router'

export default function ProtectedRoute({path,component}) {
    if(localStorage.getItem('userData')){
        return ( <Route path={path} component={component}/> )
    }
    else{
        return ( <Redirect to='/login'/> )
    }
}
