import React, { useState } from "react";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";

export const Profile = () => {
  const [Name, setName] = useState("");
  const [Age, setAge] = useState("");
  const [Gender, setGender] = useState("");
  const [reviews, setreviews] = useState("");
  const [info, setInfo] = useState([]);

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const mockData = { Name, Age, Gender };
    setInfo([mockData]);
  };

  const handleSubmit1 = (e) => {
    e.preventDefault();
    alert("Successfully Saved Review (mock)");
    setreviews("");
  };

  return (
    <div style={{ backgroundColor: "#7aafbf", minHeight: "100vh", padding: "20px 0" }}>
      <Container>
        <Row className="g-4" style={{ height: "100%" }}>
          <Col md={6}>
            <Card className="h-100 shadow p-3 bg-white">
              <Card.Header className="d-flex justify-content-center align-items-center">
                <h2>Profile</h2>
              </Card.Header>
              <Card.Body>
                {info && info.length > 0 ? (
                  info.map((userInfo, index) => (
                    <div key={index} className="p-3">
                      <h4>Name:</h4>
                      {userInfo.Name}
                      <br /><br />
                      <h4>Age:</h4>
                      {userInfo.Age}
                      <br /><br />
                      <h4>Gender:</h4>
                      {userInfo.Gender}
                    </div>
                  ))
                ) : (
                  <Form onSubmit={handleSubmit}>
                    <h4>Enter Profile:</h4>
                    <Form.Group className="mb-3">
                      <Form.Label>Name:</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Your Name"
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Age:</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Your Age"
                        onChange={(e) => setAge(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Gender:</Form.Label>
                      <Form.Select onChange={handleGenderChange} value={Gender} required>
                        <option value="">Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </Form.Select>
                    </Form.Group>
                    <Button type="submit">Submit</Button>
                  </Form>
                )}
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="h-100 shadow p-3 bg-white d-flex flex-column justify-content-between">
              <Card.Header className="d-flex justify-content-center align-items-center">
                <h2>Review</h2>
              </Card.Header>
              <Card.Body className="d-flex flex-column justify-content-between">
                <Form onSubmit={handleSubmit1} className="d-flex flex-column h-100">
                  <Form.Group className="flex-grow-1 mb-3">
                    <Form.Label>Write a review:</Form.Label>
                    <Form.Control
                      as="textarea"
                      placeholder="Type your review here..."
                      style={{ height: "100%" }}
                      required
                      value={reviews}
                      onChange={(e) => setreviews(e.target.value)}
                    />
                  </Form.Group>
                  <div className="text-center">
                    <Button type="submit">Submit</Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
