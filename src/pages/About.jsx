import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-content">
          <h1>Our Story</h1>
          <p>Connecting you with India's finest artisans since 2024</p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <h2>Our Mission</h2>
          <p>
            At KalaKart, we believe in preserving India's rich cultural heritage by 
            connecting talented artisans directly with customers who appreciate 
            authentic handcrafted products. We eliminate middlemen to ensure 
            artisans get fair prices and customers get genuine products.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🎨</div>
              <h3>Authenticity</h3>
              <p>Every product is 100% handcrafted by skilled artisans using traditional techniques.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Fair Trade</h3>
              <p>We ensure artisans receive fair compensation for their craftsmanship.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🌍</div>
              <h3>Sustainability</h3>
              <p>Promoting eco-friendly, sustainable practices in traditional crafts.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">❤️</div>
              <h3>Community</h3>
              <p>Building a community of artisans and craft lovers across India.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">Artisans</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">29</span>
              <span className="stat-label">States</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">10k+</span>
              <span className="stat-label">Happy Customers</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">100+</span>
              <span className="stat-label">Craft Forms</span>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <h2>Meet Our Founders</h2>
          <div className="team-grid">
            <div className="team-card">
              <div className="team-image">
                <div className="image-placeholder">👨‍💼</div>
              </div>
              <h3>AKASH</h3>
              <p className="team-role">Co-Founder & CEO</p>
              <p className="team-bio">Passionate about preserving Indian craftsmanship and empowering artisans.</p>
            </div>
            <div className="team-card">
              <div className="team-image">
                <div className="image-placeholder">👩‍💼</div>
              </div>
              <h3>SRUTHI SHANIGARAPU</h3>
              <p className="team-role">Co-Founder & Creative Director</p>
              <p className="team-bio">Design enthusiast with a vision to bring traditional crafts to modern homes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Join Our Journey</h2>
          <p>Be part of preserving India's rich craft heritage</p>
          <div className="cta-buttons">
            <Link to="/products" className="btn-primary">Explore Products</Link>
            <Link to="/contact" className="btn-secondary">Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;