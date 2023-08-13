import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
} from 'reactstrap';
import { AuthContext } from 'auth/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { setIsLoggedIn, setUserName } = useContext(AuthContext);

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get('http://localhost:5000/users', {
        params: {
          username: username,
          password: password,
        },
      });

      if (response.data.some((user) => user.username === username && user.password === password)) {
        setIsLoggedIn(true);
        setUserName(username); // Save the username to AuthContext
        navigate('/admin/index');
      } else {
        alert('Invalid credentials!');
      }
    } catch (error) {
      console.error('Error while authenticating:', error);
    }
  };

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form" onSubmit={handleSubmit}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-single-02" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="text"
                    name="username"
                    placeholder='Username'
                    id="yourUsername"
                    required
                    autoComplete="off"
                    value={username}
                    onChange={handleUsernameChange}
                  />
                  <div className="invalid-feedback">Please enter your username.</div>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="password"
                    name="password"
                    placeholder='Password'
                    id="yourPassword"
                    required
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button className="my" color="primary" type="submit">
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Login;