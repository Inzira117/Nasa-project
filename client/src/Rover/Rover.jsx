import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col, Container, Spinner } from "react-bootstrap";

const nasaApiBaseUrl =
  process.env.NODE_ENV === "production"
    ? "https://your-production-server.com/api"
    : "http://localhost:4000/api";

async function getRovers() {
  try {
    const res = await fetch(`${nasaApiBaseUrl}/rovers`);
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    return data.rovers || [];
  } catch (err) {
    console.error("Fetch error:", err);
    return [];
  }
}

export default function Rovers() {
  const [rovers, setRovers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRovers() {
      const roverData = await getRovers();
      setRovers(roverData);
      setLoading(false);
    }
    loadRovers();
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
