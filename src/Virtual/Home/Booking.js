import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert2

function Booking() {
  const { name } = useParams(); // Retrieve the destination name from the URL
  const navigate = useNavigate();
  const [destination, setDestination] = useState({});
  const [bookingDate, setBookingDate] = useState('');
  const [numGuests, setNumGuests] = useState(1);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    // Fetch the destination details based on the name
    axios.get(`http://localhost:8000/api/destinations?name=${name}`)
      .then(response => {
        if (response.data.length > 0) {
          setDestination(response.data[0]);
        } else {
          console.error('Destination not found!');
        }
      })
      .catch(error => {
        console.error('There was an error fetching the destination!', error);
      });
  }, [name]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const bookingData = {
      destination: name,  // Use destination name instead of ID
      booking_date: bookingDate,
      num_guests: numGuests,
      username: username,
      email: email,
      phone_number: phoneNumber
    };

    axios.post('http://localhost:8000/api/booking/', bookingData)
      .then(response => {
        Swal.fire({
          icon: 'success',
          title: 'Booking Successful!',
          text: 'Your booking has been confirmed.',
        });
        navigate('/home'); // Navigate to home or another page after successful booking
      })
      .catch(error => {
        console.error('There was an error making the booking!', error);
        Swal.fire({
          icon: 'error',
          title: 'Booking Failed',
          text: 'Something went wrong. Please try again later.',
        });
      });
  };

  return (
    <Container className="my-5">
      {destination && (
        <>
          <Row className="mb-4">
            <Col md={12}>
              <h2>Book Your Visit To {name}</h2>
              <div>
                <h3>{destination.name}</h3>
                <p>{destination.description}</p>
              </div>
              <Form onSubmit={handleSubmit}>
                {/* Automatically filled destination field */}
                <Form.Group controlId="destination" className="mb-3">
                  <Form.Label>Destination</Form.Label>
                  <Form.Control
                    type="text"
                    value={destination.name}
                    readOnly
                    disabled
                  />
                </Form.Group>
                <Form.Group controlId="username" className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="email" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="phoneNumber" className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="bookingDate" className="mb-3">
                  <Form.Label>Booking Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="numGuests" className="mb-3">
                  <Form.Label>Number of Guests</Form.Label>
                  <Form.Control
                    type="number"
                    min="1"
                    value={numGuests}
                    onChange={(e) => setNumGuests(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Confirm Booking
                </Button>
              </Form>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
}

export default Booking;
