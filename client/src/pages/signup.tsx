import React, { useState } from 'react';
import { Form, Button, Card, Container } from 'react-bootstrap';
import { Link , useNavigate } from 'react-router-dom';
import bgimg from '../img/sign_up.png';

export const Sign = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      alert("Sign up successful!");
      localStorage.setItem("userId", email);
      navigate('/login');
    } else {
      alert("Please enter email and password");
    }
  };

  return (
    <div
      id='signuppp'
      style={{
        minHeight: '100vh',
        backgroundImage: `url(${bgimg})`,
        backgroundSize: 'cover',
      }}
    >
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="w-100" style={{ maxWidth: '400px' }}>
          <Card className="row border rounded-5 p-3 bg-white shadow box-area">
            <Card.Body>
              <p className="text-center mb-4"><h2>Welcome! </h2></p>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Button type="submit" className="b">
                    Sign up
                  </Button>
                </div>
              </Form>
            </Card.Body>
            <Card.Footer>
              <div className="w-100 text-center mt-2">
                Already have an account? <Link to="/login">Log in</Link>
              </div>
            </Card.Footer>
          </Card>
        </div>
      </Container>
    </div>
  );
};
