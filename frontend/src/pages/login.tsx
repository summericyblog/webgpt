import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { back_url } from '../common/backend';

interface IUser {
  username: string;
  password: string;
}

const LoginPage = () => {
  const [user, setUser] = useState<IUser>({ username: '', password: '' });
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(back_url + 'api/user/login', user);
      localStorage.setItem('access_token', res.data.access);
      localStorage.setItem('refresh_token', res.data.refresh);
      navigate('/trans');
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mt: 8,
      }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          name="username"
          label="Username"
          value={user.username}
          onChange={handleInput}
          margin="normal"
          required
        />
        <TextField
          name="password"
          label="Password"
          value={user.password}
          onChange={handleInput}
          margin="normal"
          type="password"
          required
        />
        {error && <p>{error}</p>}
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Login
        </Button>
      </form>
    </Box>
  );
};

export default LoginPage;
