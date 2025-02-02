import { Container, Button } from 'react-bootstrap';
import './HeroSection.css'; // Import the custom CSS

function HeroSection() {
  return (
    <Container fluid className="hero-section text-white text-center">
      <h1 className="hero-title">Welcome to Zanzibar</h1>
      <p className="hero-description">
        Zanzibar, an exotic paradise with Zanzibar beaches, rich history, and diverse cultures. Discover the wonders of the Spice Island.
      </p>
      <Button variant="primary" className="explore-button">Explore Now</Button>
    </Container>
  );
}

export default HeroSection;
