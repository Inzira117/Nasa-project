import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Spinner,
} from "react-bootstrap";

const nasaApiBaseUrl =
  process.env.NODE_ENV === "production"
    ? "https://your-production-server.com/api"
    : "http://localhost:4000/api";

export default function RoverPhotos() {
  const { name } = useParams();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sol, setSol] = useState(1000);
  const [earthDate, setEarthDate] = useState("");
  const [camera, setCamera] = useState("");

  useEffect(() => {
    async function fetchPhotos() {
      setLoading(true);
      try {
        let url = `${nasaApiBaseUrl}/rovers/${name}/photos?`;

        if (earthDate) url += `earth_date=${earthDate}`;
        else url += `sol=${sol}`;

        if (camera) url += `&camera=${camera}`;

        const res = await fetch(url);
        const data = await res.json();
        setPhotos(data.photos || []);
      } catch (err) {
        console.error("Error fetching photos:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPhotos();
  }, [name, sol, camera, earthDate]);

  return (
    <Container fluid className="mt-4">
      <Row>
        {/* Main Gallery */}
        <Col md={9}>
          <h2 className="mb-4 text-capitalize">{name} Rover Photos</h2>
          {loading ? (
            <div className="text-center mt-5">
              <Spinner animation="border" />
              <p>Loading photos...</p>
            </div>
          ) : photos.length === 0 ? (
            <p>No photos available for these filters.</p>
          ) : (
            <Row>
              {photos.map((photo) => (
                <Col key={photo.id} md={4} className="mb-4">
                  <Card className="h-100">
                    <Card.Img
                      variant="top"
                      src={photo.img_src}
                      alt={`${name} Rover`}
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
              ))}
            </Row>
          )}
        </Col>

        {/* Sidebar Filters */}
        <Col xs={12} lg={3} order={{ xs: 1, lg: 2 }}>
          <Card className="p-3 shadow-sm sticky-top">
            <h5 className="mb-3">Filters</h5>

            <Form.Group className="mb-3">
              <Form.Label>Sol (Martian Day)</Form.Label>
              <Form.Control
                type="number"
                value={sol || ""}
                onChange={(e) => {
                  setSol(e.target.value);
                  setEarthDate("");
                }}
                disabled={!!earthDate}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Earth Date</Form.Label>
              <Form.Control
                type="date"
                value={earthDate}
                onChange={(e) => {
                  setEarthDate(e.target.value);
                  setSol("");
                }}
                disabled={!!sol}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Camera</Form.Label>
              <Form.Select
                value={camera}
                onChange={(e) => setCamera(e.target.value)}
              >
                <option value="">All Cameras</option>
                <option value="FHAZ">Front Hazard Avoidance Camera</option>
                <option value="RHAZ">Rear Hazard Avoidance Camera</option>
                <option value="MAST">Mast Camera</option>
                <option value="CHEMCAM">Chemistry and Camera Complex</option>
                <option value="NAVCAM">Navigation Camera</option>
                <option value="NAVCAM_LEFT">Navigation Camera - Left</option>
                <option value="NAVCAM_RIGHT">Navigation Camera - Right</option>
                <option value="MCZ_LEFT">Mast Camera - Left</option>
                <option value="MCZ_RIGHT">Mast Camera - Right</option>
              </Form.Select>
            </Form.Group>

            <Button
              variant="secondary"
              onClick={() => {
                setEarthDate("");
                setCamera("");
                setSol(1000);
              }}
            >
              Reset Filters
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
