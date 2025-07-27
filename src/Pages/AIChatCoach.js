import React, { useState } from "react";
import "./AIChatCoach.css";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";

const AIChatCoach = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getResponse = (input) => {
    const q = input.toLowerCase();

    if (q.includes("workout") && q.includes("beginner")) {
      return "For beginners, I recommend full-body workouts 3x a week. Focus on squats, push-ups, and planks.";
    } else if (q.includes("fat loss") || q.includes("lose weight")) {
      return "To lose fat effectively, maintain a calorie deficit, do regular cardio, and stay consistent.";
    } else if (q.includes("diet") || q.includes("meal")) {
      return "Your diet should include lean proteins, whole grains, healthy fats, and plenty of vegetables.";
    } else if (q.includes("post-workout")) {
      return "After a workout, consume protein and carbs. A protein shake with a banana works well.";
    } else if (q.includes("gain muscle")) {
      return "To gain muscle, eat a calorie surplus with high protein and train each muscle group twice a week.";
    } else if (q.includes("hi") || q.includes("hello")) {
      return "Hello! I'm your virtual fitness coach. How can I assist you with your fitness journey?";
    } else {
      return "I'm not sure about that. Try asking about workouts, diet plans, fat loss, or muscle building.";
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const userMsg = { role: "user", content: userInput };
    setMessages((prev) => [...prev, userMsg]);
    setUserInput("");
    setError(null);
    setLoading(true);

    // Simulate AI thinking delay
    setTimeout(() => {
      try {
        const reply = getResponse(userMsg.content);
        const coachMsg = { role: "coach", content: reply };
        setMessages((prev) => [...prev, coachMsg]);
      } catch (err) {
        setError("❌ Something went wrong while generating the response.");
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>🤖 AI Chat Coach</Card.Title>

              <div className="chat-box" style={{ minHeight: "200px", padding: "10px", backgroundColor: "#f8f9fa", borderRadius: "5px", marginBottom: "10px" }}>
                {messages.map((msg, index) => (
                  <div key={index} style={{ marginBottom: "10px" }}>
                    <strong>{msg.role === "user" ? "You" : "Coach"}:</strong> {msg.content}
                  </div>
                ))}
                {loading && <div><em>Coach is thinking...</em></div>}
              </div>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={sendMessage}>
                <Form.Control
                  type="text"
                  placeholder="Ask your fitness question..."
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  disabled={loading}
                />
                <Button
                  variant="primary"
                  type="submit"
                  disabled={loading || !userInput.trim()}
                  className="mt-2"
                >
                  {loading ? "Sending..." : "Send"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AIChatCoach;

