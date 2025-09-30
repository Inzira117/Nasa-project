import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Row, Col } from "react-bootstrap";

export default function Rover() {
  const [rovers, setRovers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/rovers")
      .then((response) => {
        setRovers(response.data.rovers);
      })
      .catch((err) => console.error("Error fetching rovers:", err));
  }, []);

  return (
    <Row className="g-4">
      {rovers.map((rover, index) => (
        <Col md={4} key={index}>
          <Card>
            <Card.Img
              variant="top"
              src={`https://mars.nasa.gov/system/feature_items/images/6037_msl_banner.jpg`}
              alt={rover.name}
            />
            <Card.Body>
              <Card.Title>{rover.name}</Card.Title>
              <Card.Text>
                Launch Date: {rover.launch_date} <br />
                Landing Date: {rover.landing_date} <br />
                Status: {rover.status}
              </Card.Text>
              <Button variant="primary">View Photos</Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
