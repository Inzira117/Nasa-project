import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col, Container, Spinner } from "react-bootstrap";

const API_URL = "http://localhost:5000/api";

function Rovers() {
  const [rovers, setRovers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRovers() {
      try {
        const res = await fetch(`${API_URL}/rovers`);
        const data = await res.json();
        setRovers(data.rovers || []);
      } catch (err) {
        console.error("Error fetching rovers:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchRovers();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
        <p>Loading rovers...</p>
      </div>
    );
  }

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Mars Perseverance Rover</h1>
      <h2 className="mb-4">Raw Image of the Week</h2>
      <Row>
        {rovers.map((rover) => (
          <Col md={4} key={rover.id} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{rover.name}</Card.Title>
                <Card.Text>
                  <strong>Launch:</strong> {rover.launch_date} <br />
                  <strong>Landing:</strong> {rover.landing_date} <br />
                  <strong>Status:</strong> {rover.status} <br />
                  <strong>Total Photos:</strong> {rover.total_photos} <br />
                  <strong>Cameras:</strong>{" "}
                  {rover.cameras.map((cam) => cam.name).join(", ")}
                </Card.Text>
                <Button
                  variant="primary"
                  onClick={() =>
                    (window.location.href = `/rovers/${rover.name.toLowerCase()}`)
                  }
                >
                  View Photos
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Rovers;
