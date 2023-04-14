import './Login.css';

import { AuthContext } from '../../contexts/authContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';

const LoginFormKeys = {
    Email: 'email',
    Password: 'password'
}


const Login = () => {
    const { onLoginSubmit } = useContext(AuthContext);
    const { values, changeHandler, onSubmit } = useForm({
        [LoginFormKeys.Email]: '',
        [LoginFormKeys.Password]: '',
    }, onLoginSubmit)

    return (
        <section className="post">
            <h2 className="headings">Login</h2>
            <form onSubmit={onSubmit} className="login-form" action="POST">
                <label htmlFor="email">E-Mail:</label>
                <input
                    name={LoginFormKeys.Email}
                    id="email"
                    type="text"
                    value={values[LoginFormKeys.Email]}
                    onChange={changeHandler}
                />
                <label htmlFor="password">Password:</label>
                <input
                    name={LoginFormKeys.Password}
                    type="password"
                    value={values[LoginFormKeys.Password]}
                    onChange={changeHandler}
                />
                <button type="submit" className="post-btn login-btn">Login</button>
                <span className="login-span">Don't have an account?</span>
                <Link to="/register">Register here!</Link>
            </form>
        </section>
    );
};

export default Login;
