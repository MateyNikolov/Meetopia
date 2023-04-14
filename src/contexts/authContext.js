import { createContext } from "react";

import * as requester from '../services/requester';
import { handleAlert } from '../services/messages/AlertMessage';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateData } from "../validators/dataValidator";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const navigate = useNavigate();


    const onLoginSubmit = async (data) => {

        const loginUrl = 'http://localhost:3030/users/login';
        const result = await requester.request(loginUrl, 'POST', data);

        if (result.status) {
            handleAlert(result.message);
        } else {
            setAuth(result);
            navigate('/feed');
        }
    };

    const onRegisterSubmit = async (data) => {

        if (validateData(data)) {

            const registerUrl = 'http://localhost:3030/users/register';
            const result = await requester.request(registerUrl, 'POST', data);
            if (result.status) {
                handleAlert(result.message);
            } else {
                setAuth(result);
                navigate('/feed');
            }
        };
    }

    const onLogout = async () => {

        const logoutUrl = 'http://localhost:3030/users/logout';
        await requester.request(logoutUrl, 'GET');
        setAuth({});
        navigate('/');
    }

    const contextValues = {
        onLoginSubmit,
        onRegisterSubmit,
        onLogout,
        auth,
        isAuthenticated() {
            return !!auth.accessToken
        }
    }

    return (
        <>
            <AuthContext.Provider value={contextValues}>
                {children}
            </AuthContext.Provider>
        </>
    );
}

