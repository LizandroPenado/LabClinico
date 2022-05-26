import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthUser() {

    const navigate = useNavigate();
    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken;
    }
    const getUser = () => {
        const userString = sessionStorage.getItem('user');
        const user_detail = JSON.parse(userString);
        return user_detail;
    }
    const getRol = () => {
        const rolString = sessionStorage.getItem('rol');
        const rol_detail = JSON.parse(rolString);
        return rol_detail;
    }
    const [rol, setRol] = useState(getRol());
    const [token, setToken] = useState(getToken());
    const [user, setUser] = useState(getUser());

    const saveToken = (user, token, rol) => {

        sessionStorage.setItem('token', JSON.stringify(token));
        sessionStorage.setItem('user', JSON.stringify(user));
        sessionStorage.setItem('rol', JSON.stringify(rol));
        setToken(token);
        setUser(user);
        setRol(rol);
        navigate('/inicio');
    }

    const logout = () => {
        sessionStorage.clear();
        navigate('/');
    }

    const http = axios.create({
        baseURL: "http://localhost:8000/api",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    return {
        setToken: saveToken,
        token,
        user,
        rol,
        getRol,
        getToken,
        http,
        logout
    }
}