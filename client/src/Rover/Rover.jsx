import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Row, Col, Container, Spinner } from "react-bootstrap";

const nasaApiBaseUrl =
  process.env.NODE_ENV === "production"
    ? "https://your-production-server.com/api"
    : "http://localhost:4000/api";

async function getRovers() {
  try {
    const res = await fetch(`${nasaApiBaseUrl}/rovers`);
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
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
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const data = await getRovers();
      setRovers(data);
      setLoading(false);
    })();
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
      <h1 className="mb-4 text-center">Mars Rovers</h1>
      <h2 className="mb-4 text-center text-bright">
        Explore NASA’s active Mars rovers and their incredible discoveries.
      </h2>

      <Row>
        {rovers
          // .filter((rover) => rover.status === "active")
          .map((rover) => (
            <Col
              md={4}
              key={rover.id}
              xs={12}
              sm={6}
              lg={4}
              className="mb-4 d-flex justify-content-center"
            >
              <Card className="w-100 d-flex flex-column">
                <Card.Img
                  variant="top"
                  src={`https://mars.nasa.gov/msl-raw-images/${rover.name.toLowerCase()}_sample.jpg`}
                  alt={`${rover.name} Rover`}
                  style={{ height: "200px", objectFit: "cover" }}
                  onError={(e) => (e.target.style.display = "none")}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="text-center mb-3">
                    {rover.name}
                  </Card.Title>
                  <Card.Text className="flex-grow-1 small">
                    <strong>Launch:</strong> {rover.launch_date} <br />
                    <strong>Landing:</strong> {rover.landing_date} <br />
                    <strong>Status:</strong> {rover.status} <br />
                    <strong>Cameras:</strong>{" "}
                    {rover.cameras.map((cam) => cam.name).join(", ")}
                  </Card.Text>
                  <Button
                    variant="primary"
                    className="mt-auto"
                    onClick={() =>
                      navigate(`/rovers/${rover.name.toLowerCase()}`)
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
