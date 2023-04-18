import { createContext } from "react";

import * as requester from '../services/requester';
import { handleAlert } from '../services/messages/AlertMessage';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateData } from "../validators/dataValidator";

import { CloudinaryImage } from "@cloudinary/url-gen";
import { URLConfig } from "@cloudinary/url-gen";
import { CloudConfig } from "@cloudinary/url-gen";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [imageExists, setImageExists] = useState(false);
    const [auth, setAuth] = useState({});
    const navigate = useNavigate();


    const onLoginSubmit = async (data) => {

        const loginUrl = 'http://localhost:3030/users/login';
        const result = await requester.request(loginUrl, 'POST', data);

        if (result.status) {
            handleAlert(result.message);
        } else {
            let cloudConfig = new CloudConfig({ cloudName: 'dj5j9cqc0' });
            let urlConfig = new URLConfig({ secure: true });
            let myImage = new CloudinaryImage(`meetopia/${result._id}/profile-picture/profile-${result._id}`, cloudConfig, urlConfig);
            let imageUrl = myImage.toURL();

            fetch(imageUrl)
                .then(response => {
                    setImageExists(response.ok);
                })
                .catch(() => {
                    setImageExists(false);
                });
            
            console.log(imageExists);

            if (imageExists) {
                result.picture = imageUrl;
            } else {
                result.picture = null;
            }
            setAuth(result);
            navigate('/posts');
        }
    };

    const onRegisterSubmit = async (data) => {

        if (validateData(data)) {

            const registerUrl = 'http://localhost:3030/users/register';
            const result = await requester.request(registerUrl, 'POST', data);
            if (result.status) {
                handleAlert(result.message);
            } else {
                setAuth({ ...result, picture: null });
                navigate('/posts');
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
        setAuth,
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

