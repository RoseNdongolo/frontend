import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Attraction() {
  const [destinations, setDestinations] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all destinations from the backend API
    axios.get('http://localhost:8000/api/destinations/')
      .then(response => {
        const data = response.data;
        setDestinations(data);

        // Derive unique categories from the destinations data
        const uniqueCategories = ['All', ...new Set(data.map(dest => dest.category))];
        setCategories(uniqueCategories);
      })
      .catch(error => {
        console.error('There was an error fetching the destinations!', error);
      });
  }, []);

  const filteredDestinations = selectedCategory === 'All'
    ? destinations
    : destinations.filter(dest => dest.category === selectedCategory);

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Explore Zanzibar</h1>
      <Form.Group controlId="categorySelect">
        <Form.Label>Select a Category</Form.Label>
        <Form.Control
          as="select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Row>
        {filteredDestinations.map((destination, index) => (
          <Col md={4} className="mb-4" key={index}>
            <Card>
              <Card.Img variant="top" src={`http://localhost:8000${destination.image}`} alt={destination.name} />
              <Card.Body>
                <Card.Title>{destination.name}</Card.Title>
                <Card.Text>{destination.description}</Card.Text>
                <Button
                  variant="primary"
                  onClick={() => navigate(`/booking/${encodeURIComponent(destination.name)}`)}
                >
                  Book Now
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Attraction;
