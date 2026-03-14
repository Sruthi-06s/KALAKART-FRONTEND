import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would normally send the form data to your backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    },
    header: {
      textAlign: 'center',
      marginBottom: '3rem',
      animation: 'fadeInDown 0.5s ease'
    },
    title: {
      fontSize: '2.5rem',
      color: '#2c1810',
      marginBottom: '0.5rem',
      position: 'relative',
      display: 'inline-block'
    },
    titleUnderline: {
      content: '',
      position: 'absolute',
      bottom: '-10px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '80px',
      height: '3px',
      background: 'linear-gradient(90deg, #b45f3a, #8e4b2e)',
      borderRadius: '2px'
    },
    subtitle: {
      color: '#666',
      fontSize: '1.1rem',
      marginTop: '1.5rem'
    },
    content: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '3rem',
      marginBottom: '3rem',
      animation: 'fadeInUp 0.5s ease 0.2s both'
    },
    infoSection: {
      background: 'linear-gradient(135deg, #f8f5f2, #fff)',
      padding: '2rem',
      borderRadius: '20px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
    },
    infoTitle: {
      fontSize: '1.8rem',
      color: '#2c1810',
      marginBottom: '1.5rem'
    },
    infoText: {
      color: '#666',
      lineHeight: '1.8',
      marginBottom: '2rem'
    },
    contactDetails: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
      marginBottom: '2rem'
    },
    contactItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      padding: '1rem',
      background: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
      transition: 'all 0.3s'
    },
    contactIcon: {
      fontSize: '1.5rem',
      width: '50px',
      height: '50px',
      background: 'linear-gradient(135deg, #b45f3a, #8e4b2e)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white'
    },
    contactInfo: {
      flex: 1
    },
    contactLabel: {
      fontSize: '0.9rem',
      color: '#8b6b4d',
      marginBottom: '0.2rem'
    },
    contactValue: {
      fontSize: '1rem',
      color: '#2c1810',
      fontWeight: '500'
    },
    socialSection: {
      marginTop: '2rem'
    },
    socialTitle: {
      fontSize: '1.2rem',
      color: '#2c1810',
      marginBottom: '1rem'
    },
    socialLinks: {
      display: 'flex',
      gap: '1rem'
    },
    socialLink: {
      width: '45px',
      height: '45px',
      background: 'white',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textDecoration: 'none',
      fontSize: '1.3rem',
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      transition: 'all 0.3s',
      color: '#666'
    },
    formSection: {
      background: 'white',
      padding: '2rem',
      borderRadius: '20px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
    },
    formTitle: {
      fontSize: '1.8rem',
      color: '#2c1810',
      marginBottom: '1.5rem'
    },
    formGroup: {
      marginBottom: '1.5rem'
    },
    label: {
      display: 'block',
      marginBottom: '0.5rem',
      color: '#2c1810',
      fontWeight: '500'
    },
    input: {
      width: '100%',
      padding: '0.8rem 1rem',
      border: '2px solid #e0e0e0',
      borderRadius: '8px',
      fontSize: '1rem',
      transition: 'all 0.3s',
      boxSizing: 'border-box'
    },
    textarea: {
      width: '100%',
      padding: '0.8rem 1rem',
      border: '2px solid #e0e0e0',
      borderRadius: '8px',
      fontSize: '1rem',
      transition: 'all 0.3s',
      resize: 'vertical',
      minHeight: '120px',
      fontFamily: 'inherit',
      boxSizing: 'border-box'
    },
    submitBtn: {
      width: '100%',
      padding: '1rem',
      background: 'linear-gradient(135deg, #b45f3a, #8e4b2e)',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s',
      boxShadow: '0 4px 12px rgba(180,95,58,0.2)'
    },
    mapSection: {
      marginTop: '3rem',
      borderRadius: '20px',
      overflow: 'hidden',
      boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
      animation: 'fadeInUp 0.5s ease 0.4s both'
    },
    mapPlaceholder: {
      width: '100%',
      height: '400px',
      background: 'linear-gradient(135deg, #f8f5f2, #e8ddd5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden'
    },
    mapOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(135deg, rgba(180,95,58,0.1), rgba(142,75,46,0.1))',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      color: '#2c1810'
    },
    mapText: {
      fontSize: '2rem',
      fontWeight: '700',
      marginBottom: '0.5rem'
    },
    mapSubtext: {
      fontSize: '1rem',
      color: '#666'
    },
    successMessage: {
      background: '#d4edda',
      color: '#155724',
      padding: '1rem',
      borderRadius: '8px',
      marginBottom: '1rem',
      textAlign: 'center',
      animation: 'slideDown 0.3s ease',
      borderLeft: '4px solid #28a745'
    },
    keyframes: `
      @keyframes fadeInDown {
        from {
          opacity: 0;
          transform: translateY(-20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes slideDown {
        from {
          opacity: 0;
          transform: translateY(-10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes pulse {
        0%, 100% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.05);
        }
      }
    `
  };

  // Add keyframes to document
  if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.innerHTML = styles.keyframes;
    document.head.appendChild(style);
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>
          Contact Us
          <span style={styles.titleUnderline}></span>
        </h1>
        <p style={styles.subtitle}>
          Get in touch with us. We'd love to hear from you!
        </p>
      </div>

      {/* Main Content */}
      <div style={styles.content}>
        {/* Contact Information */}
        <div style={styles.infoSection}>
          <h2 style={styles.infoTitle}>Get in Touch</h2>
          <p style={styles.infoText}>
            Have questions about our products, need help with an order, 
            or want to collaborate with us? Reach out to us through any 
            of these channels.
          </p>

          <div style={styles.contactDetails}>
            <div 
              style={styles.contactItem}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateX(5px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(180,95,58,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.03)';
              }}
            >
              <div style={styles.contactIcon}>📍</div>
              <div style={styles.contactInfo}>
                <div style={styles.contactLabel}>Visit Us</div>
                <div style={styles.contactValue}>
                  123 Heritage Street,<br />
                  Andheri East, Mumbai<br />
                  Maharashtra 400069, India
                </div>
              </div>
            </div>

            <div 
              style={styles.contactItem}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateX(5px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(180,95,58,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.03)';
              }}
            >
              <div style={styles.contactIcon}>📞</div>
              <div style={styles.contactInfo}>
                <div style={styles.contactLabel}>Call Us</div>
                <div style={styles.contactValue}>
                  +91 98765 43210<br />
                  Mon-Sat, 9AM - 6PM
                </div>
              </div>
            </div>

            <div 
              style={styles.contactItem}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateX(5px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(180,95,58,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.03)';
              }}
            >
              <div style={styles.contactIcon}>✉️</div>
              <div style={styles.contactInfo}>
                <div style={styles.contactLabel}>Email Us</div>
                <div style={styles.contactValue}>
                  support@kalakart.com<br />
                  artisans@kalakart.com
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div style={styles.socialSection}>
            <h3 style={styles.socialTitle}>Follow Us</h3>
            <div style={styles.socialLinks}>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                style={styles.socialLink}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#1877f2';
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.color = '#666';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                📘
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                style={styles.socialLink}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(45deg, #f09433, #d62976, #962fbf)';
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.color = '#666';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                📷
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                style={styles.socialLink}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#1da1f2';
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.color = '#666';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                🐦
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                style={styles.socialLink}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#ff0000';
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.color = '#666';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                ▶️
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div style={styles.formSection}>
          <h2 style={styles.formTitle}>Send Message</h2>
          
          {submitted && (
            <div style={styles.successMessage}>
              ✅ Thank you for contacting us! We'll get back to you soon.
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={styles.input}
                placeholder="Enter your full name"
                onFocus={(e) => {
                  e.target.style.borderColor = '#b45f3a';
                  e.target.style.boxShadow = '0 0 0 3px rgba(180,95,58,0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e0e0e0';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={styles.input}
                placeholder="Enter your email"
                onFocus={(e) => {
                  e.target.style.borderColor = '#b45f3a';
                  e.target.style.boxShadow = '0 0 0 3px rgba(180,95,58,0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e0e0e0';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                style={styles.input}
                placeholder="What is this about?"
                onFocus={(e) => {
                  e.target.style.borderColor = '#b45f3a';
                  e.target.style.boxShadow = '0 0 0 3px rgba(180,95,58,0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e0e0e0';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                style={styles.textarea}
                placeholder="Type your message here..."
                onFocus={(e) => {
                  e.target.style.borderColor = '#b45f3a';
                  e.target.style.boxShadow = '0 0 0 3px rgba(180,95,58,0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e0e0e0';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            <button
              type="submit"
              style={styles.submitBtn}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 16px rgba(180,95,58,0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'none';
                e.target.style.boxShadow = '0 4px 12px rgba(180,95,58,0.2)';
              }}
            >
              Send Message →
            </button>
          </form>
        </div>
      </div>

      {/* Map Section */}
      <div style={styles.mapSection}>
        <div style={styles.mapPlaceholder}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241316.67292877347!2d72.71636564453125!3d19.08252232203936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1710581234567!5m2!1sen!2sin"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="KalaKart Location"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;