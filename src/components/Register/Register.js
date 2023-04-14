import { useForm } from '../../hooks/useForm';
import { useContext } from 'react';

import { Link } from 'react-router-dom';
import './Register.css';
import { AuthContext } from '../../contexts/authContext';

const RegisterFormKeys = {
    Email: 'email',
    Password: 'password',
    Password2: 'confirm',
    Age: 'age',
    City: 'city',
}

const Register = () => {
    const { onRegisterSubmit } = useContext(AuthContext);
    const { values, changeHandler, onSubmit } = useForm({
        [RegisterFormKeys.Email]: '',
        [RegisterFormKeys.Password]: '',
        [RegisterFormKeys.Password2]: '',
        [RegisterFormKeys.Age]: '',
        [RegisterFormKeys.City]: '',
    }, onRegisterSubmit)

    return (
        <section className="post">
            <h2 className="headings">Register</h2>
            <form onSubmit={onSubmit} className="login-form" action="post">
                <label htmlFor="email">E-Mail:</label>
                <input
                    name={RegisterFormKeys.Email}
                    id="email"
                    type="email"
                    value={values[RegisterFormKeys.Email]}
                    onChange={changeHandler}
                />
                <label htmlFor="password">Enter Password:</label>
                <input
                    name={RegisterFormKeys.Password}
                    type="password"
                    value={values[RegisterFormKeys.Password]}
                    onChange={changeHandler}
                />
                <label htmlFor="password">Confirm Password:</label>
                <input
                    name={RegisterFormKeys.Password2}
                    type="password"
                    value={values[RegisterFormKeys.Password2]}
                    onChange={changeHandler}
                />
                <label htmlFor="age">Age:</label>
                <input
                    name={RegisterFormKeys.Age}
                    id="age"
                    type="number"
                    value={values[RegisterFormKeys.Age]}
                    onChange={changeHandler}
                />
                <label htmlFor="city">City:</label>
                <input
                    name={RegisterFormKeys.City}
                    id="city"
                    type="text"
                    value={values[RegisterFormKeys.City]}
                    onChange={changeHandler}
                />
                <button type="submit" className="post-btn register-btn">Register</button>
                <span className="register-span">Already have an account?</span>
                <Link to="/login">Login from here!</Link>
            </form>
        </section>
    );
};

export default Register;