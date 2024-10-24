import React, { useState } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/users/register`, formData);
      setFormSuccess(res.data.msg);
      setFormError('');
    } catch (err) {
      setFormError(err.response?.data?.msg || 'Erro ao registrar');
      setFormSuccess('');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Registro</h2>
      <Form.Input
        label="Username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        required
      />
      <Form.Input
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      {formError && <Message error header="Erro" content={formError} />}
      {formSuccess && <Message success header="Sucesso" content={formSuccess} />}
      <Button color="green" type="submit">Registrar</Button>
    </Form>
  );
};

export default Register;
