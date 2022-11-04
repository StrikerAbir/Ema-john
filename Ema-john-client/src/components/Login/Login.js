import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/UserContext';
import './Login.css'
const Login = () => {
    const [error, setError] = useState(null);
    
    const { userLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation()
    const from = location.state?.from?.pathname || '/';

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        userLogin(email, password).then(result => {
            const user = result.user;
            console.log(user);
            form.reset();
            setError(null);
            navigate(from, {replace: true});
        }).catch(err => {
            console.error('error', err);
            setError('Wrong password or email.')
        })

    }
    return (
      <div className="form-container">
        <h2 className="form-title">Login</h2>
        <form action="" onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" required />
          </div>
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" required />
          </div>
          <p className="error-text">{error !== null ? error : ""}</p>
          <input className="btn-submit" type="submit" value="Login" />
        </form>
        <p>
          New to ema John? <Link to="/signup">Create a new account</Link>
        </p>
      </div>
    );
};

export default Login;