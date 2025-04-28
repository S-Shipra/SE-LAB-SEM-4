import React, { useState } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/store.ts";
import backgim from '../img/home.png';

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      alert("Login successful!");
      localStorage.setItem("userId", email);
      dispatch(login());
      navigate('/journaling'); // Navigate to journaling page
    } else {
      alert("Please enter email and password");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${backgim})`,
        backgroundSize: "cover",
      }}
    >
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card className="row border rounded-5 p-3 shadow box-area" style={{ backgroundColor: '#F6F6F6' }}>
            <Card.Body>
              <p className="text-center mb-4"><h2>Welcome back!</h2></p>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Button type="submit" className="b">
                    Log in
                  </Button>
                </div>
              </Form>
            </Card.Body>
            <Card.Footer>
              <div className="w-100 text-center mt-2">
                Don't have account? <Link to="/signup">Sign up</Link>
              </div>
            </Card.Footer>
          </Card>
        </div>
      </Container>
    </div>
  );
};
