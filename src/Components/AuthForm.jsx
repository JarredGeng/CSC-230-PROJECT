import { useState } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000/api'; // Change if backend is deployed

export default function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? 'login' : 'register';
      const response = await axios.post(`${API}/${endpoint}`, { email, password });

      if (isLogin) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user_id', response.data.user_id);
        alert('Logged in successfully!');
      } else {
        alert('Registered! Now you can log in.');
        setIsLogin(true);
      }
    } catch (err) {
      alert(err.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <div style={{ padding: 24, maxWidth: 400, margin: '0 auto' }}>
      <h2>{isLogin ? 'Log In' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={e => setEmail(e.target.value)}
        /><br /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={e => setPassword(e.target.value)}
        /><br /><br />
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
      <p>
        {isLogin ? 'New user?' : 'Already have an account?'}{' '}
        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Register here' : 'Log in'}
        </button>
      </p>
    </div>
  );
}
