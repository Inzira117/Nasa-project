import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, Row, Col, Container, Spinner } from "react-bootstrap";
import Curiosity from "../assets/Curiosity.png";

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
  const { name } = useParams();
  const [photos, setPhotos] = useState([]);
  const [sol, setSol] = useState(1000);
  const navigate = useNavigate();

  useEffect(() => {
    if (!name) return;

    async function fetchPhotos() {
      setLoading(true);
      try {
        const res = await fetch(
          `${nasaApiBaseUrl}/rovers/${name}/photos?sol=${sol}`
        );
        const data = await res.json();
        setPhotos(data.photos || []);
      } catch (err) {
        console.error("Error fetching photos:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPhotos();
  }, [name, sol]);

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
      <h1 className="mb-4">Mars Raw Image of the Week</h1>
      <p>
        Here's the Image of the Week as voted on by the public. Check out the
        latest raw images below, and "Like" your favorites.
      </p>

      <Row>
        {rovers
          .filter((rover) => rover.status === "active")
          .map((rover) => (
            <Col md={4} key={rover.id} className="mb-4 d-flex">
              <Card className="w-100 rover-card">
                <Card.Img
                  variant="top"
                  src={`https://placehold.co/400x200?text=${rover.name}`}
                  alt={`${rover.name} rover`}
                  className="rover-img"
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="text-center mb-3">
                    {rover.name}
                  </Card.Title>
                  <Card.Text className="flex-grow-1">
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
      <Row>
        {photos.length === 0 ? (
          <p>No photos available for this sol.</p>
        ) : (
          photos.map((photo) => (
            <Col key={photo.id} md={4} className="mb-4">
              <Card className="h-100">
                <Card.Img
                  variant="top"
                  src={photo.img_src}
                  alt={`Rover photo from ${name}`}
                  className="rover-img"
                />
                <Card.Body>
                  <Card.Text>
                    <strong>Camera:</strong> {photo.camera.full_name}
                    <br />
                    <strong>Earth Date:</strong> {photo.earth_date}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
}
