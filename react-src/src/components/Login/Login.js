import React, { useState } from 'react';
import { Button, Form, Message, Container, Header } from 'semantic-ui-react';
import axios from 'axios';
import './Login.css'; // Adicione o arquivo CSS para centralizar o conteúdo

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = () => {
    axios.post(`/api/users/login`, { username, password })
      .then(response => {
        localStorage.setItem('token', response.data.token);
        window.location.href = '/home';
      })
      .catch(() => {
        setErrorMessage('Login failed. Check your credentials.');
      });
  };

  return (
    <Container text>
      <div className="login-container">
        <Header as="h1" textAlign="center">PARK</Header>
        <Form onSubmit={handleSubmit} error={!!errorMessage}>
          <Form.Input
            label="Username"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            fluid
          />
          <Form.Input
            label="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            fluid
          />
          {errorMessage && <Message error content={errorMessage} />}
          <Button type="submit" color="green" fluid>Login</Button>
        </Form>
      </div>
    </Container>
  );
};

export default Login;
