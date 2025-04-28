import React, { useState } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import bgimg from "../img/journal1.png";

export const Blog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [entries, setEntries] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = { title, description };
    setEntries([newEntry, ...entries]);
    setTitle("");
    setDescription("");
  };

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${bgimg})`,
          backgroundSize: "cover",
        }}
      >
        <Container
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "100vh", paddingTop: "50px", paddingBottom: "50px" }}
        >
          <div className="w-100" style={{ maxWidth: "700px" }}>
            <Card
              className="border rounded-5 p-3 shadow box-area color"
              style={{ backgroundColor: "#d1b59b" }}
            >
              <Card.Body>
                <h2 className="text-center mb-4" style={{ color: "#57422F" }}>
                  Create your own journal
                </h2>
                <Form onSubmit={handleSubmit}>
                  <Form.Group id="title" className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Title"
                      value={title}
                      style={{ backgroundColor: "#E8CEB6" }}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group id="description" className="mb-3">
                    <Form.Control
                      as="textarea"
                      rows={4}
                      placeholder="Description"
                      value={description}
                      style={{ backgroundColor: "#E8CEB6" }}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Button
                    type="submit"
                    className="w-100"
                    style={{ backgroundColor: "#D6CEC6", color: "#000" }}
                  >
                    Save
                  </Button>
                </Form>
              </Card.Body>
            </Card>

            {/* Display entries below the form */}
            {entries.length > 0 && (
              <div className="mt-4">
                <h4 className="text-center mb-3" style={{ color: "#57422F" }}>
                  Your Journal Entries
                </h4>
                {entries.map((entry, index) => (
                  <Card key={index} className="mb-3" style={{ backgroundColor: "#FFF3E6" }}>
                    <Card.Body>
                      <h5>{entry.title}</h5>
                      <p>{entry.description}</p>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </Container>
      </div>
    </>
  );
};
