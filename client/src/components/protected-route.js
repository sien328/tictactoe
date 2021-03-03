import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from './authorize';

export const ProtectedRoute = ({ component: Component, ...rest }) =>{
    return (
        <Route 
            {...rest}
            render= { props => {
                    if (sessionStorage.getItem("ticTacToeUserToken")) {
                        return <Component {...props}/>;
                    } else {
                        return <Redirect to={
                            {
                                pathname: "/",
                                state: {
                                    from: props.location
                                }
                            }
                        }
                        />
                    }
                }
            }
        />
    );
}