import React, { useState } from 'react';
import { useAuth } from "../AuthContext";
import { loginuser } from "../api";
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'; 

function Login() {
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("mentor");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await loginuser(name, password, role);
      const accessToken = response.token;
      const userRole = response.role;
      const id = response.id;

      login(accessToken, userRole, id, name);
    } catch (error) {
      setError("Invalid name, password, or role");
    }
  };

  return (
    <div className="login-background">
      <Container className="login-container">
        <Row className="justify-content-center">
          <Col className="text-center">
            <img 
              src="https://i.imgur.com/FkLkjAy.png" 
              alt="Logo" 
              className="logo" 
            />
            <h1 className="h3 my-1 fw-normal text-white"><strong>VNR VJIET</strong></h1>
            <h3 className="h5 my-1 fw-normal text-white"><i>Mentor Connect</i></h3>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col>
            <h4 className="my-3 fw-normal text-center text-white"><strong>Login</strong></h4>
            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-2" controlId="role">
                <Form.Label className="text-white">Role</Form.Label>
                <Form.Select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option value="mentor">Mentor</option>
                  <option value="mentee">Mentee</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-2" controlId="name">
                <Form.Label className="text-white">Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your username"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label className="text-white">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100">
                Login
              </Button>
              {error && (
                <Alert variant="danger" className="mt-3">
                  {error}
                </Alert>
              )}
              <Row className="mt-3">
                <Col xs={6} className="text-start">
                  <a href="#" className="text-decoration-none text-white">Forgot password?</a>
                </Col>
                <Col xs={6} className="text-end">
                  <a href="/contactus" className="text-decoration-none text-white">{"Don't have an account? Contact Admin"}</a>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
