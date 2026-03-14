import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Terms = () => {
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (index) => {
    setActiveSection(activeSection === index ? null : index);
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
    lastUpdated: {
      color: '#8b6b4d',
      fontSize: '0.95rem',
      marginTop: '1rem',
      fontStyle: 'italic'
    },
    content: {
      display: 'grid',
      gridTemplateColumns: '300px 1fr',
      gap: '2rem',
      animation: 'fadeInUp 0.5s ease 0.2s both'
    },
    sidebar: {
      background: 'linear-gradient(135deg, #f8f5f2, #fff)',
      padding: '1.5rem',
      borderRadius: '20px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
      height: 'fit-content',
      position: 'sticky',
      top: '100px'
    },
    sidebarTitle: {
      fontSize: '1.2rem',
      color: '#2c1810',
      marginBottom: '1.5rem',
      paddingBottom: '0.5rem',
      borderBottom: '2px solid #e8ddd5'
    },
    navList: {
      listStyle: 'none',
      padding: 0,
      margin: 0
    },
    navItem: {
      marginBottom: '0.5rem'
    },
    navLink: {
      display: 'block',
      padding: '0.8rem 1rem',
      color: '#666',
      textDecoration: 'none',
      borderRadius: '8px',
      transition: 'all 0.3s',
      fontSize: '0.95rem'
    },
    mainContent: {
      background: 'white',
      padding: '2rem',
      borderRadius: '20px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
    },
    section: {
      marginBottom: '2rem',
      paddingBottom: '1rem',
      borderBottom: '1px solid #f0f0f0'
    },
    sectionHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      cursor: 'pointer',
      padding: '1rem',
      background: '#f8f5f2',
      borderRadius: '12px',
      transition: 'all 0.3s'
    },
    sectionTitle: {
      fontSize: '1.3rem',
      color: '#2c1810',
      margin: 0,
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    sectionIcon: {
      fontSize: '1.5rem',
      background: 'linear-gradient(135deg, #b45f3a, #8e4b2e)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    },
    toggleIcon: {
      fontSize: '1.2rem',
      color: '#b45f3a',
      transition: 'transform 0.3s'
    },
    sectionContent: {
      padding: '1.5rem',
      color: '#666',
      lineHeight: '1.8',
      animation: 'slideDown 0.3s ease'
    },
    paragraph: {
      marginBottom: '1rem'
    },
    list: {
      paddingLeft: '2rem',
      marginBottom: '1rem'
    },
    listItem: {
      marginBottom: '0.5rem'
    },
    highlight: {
      background: 'linear-gradient(135deg, #b45f3a, #8e4b2e)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      fontWeight: '600'
    },
    note: {
      background: '#f8f5f2',
      padding: '1rem',
      borderRadius: '8px',
      borderLeft: '4px solid #b45f3a',
      marginTop: '1rem'
    },
    noteText: {
      margin: 0,
      color: '#2c1810',
      fontSize: '0.95rem'
    },
    footer: {
      marginTop: '3rem',
      padding: '2rem',
      background: 'linear-gradient(135deg, #f8f5f2, #fff)',
      borderRadius: '20px',
      textAlign: 'center',
      animation: 'fadeInUp 0.5s ease 0.4s both'
    },
    acceptBtn: {
      padding: '1rem 3rem',
      background: 'linear-gradient(135deg, #b45f3a, #8e4b2e)',
      color: 'white',
      border: 'none',
      borderRadius: '50px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s',
      boxShadow: '0 4px 12px rgba(180,95,58,0.2)',
      marginTop: '1rem'
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
    `,
    responsive: {
      '@media (max-width: 968px)': {
        content: {
          gridTemplateColumns: '1fr'
        },
        sidebar: {
          position: 'static',
          marginBottom: '2rem'
        }
      },
      '@media (max-width: 768px)': {
        title: {
          fontSize: '2rem'
        },
        sectionTitle: {
          fontSize: '1.2rem'
        }
      },
      '@media (max-width: 480px)': {
        container: {
          padding: '1rem'
        },
        title: {
          fontSize: '1.8rem'
        }
      }
    }
  };

  // Add keyframes to document
  if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.innerHTML = styles.keyframes;
    document.head.appendChild(style);
  }

  const sections = [
    {
      icon: '📜',
      title: '1. Acceptance of Terms',
      content: (
        <div>
          <p style={styles.paragraph}>
            By accessing or using KalaKart's website and services, you agree to be bound by these Terms and Conditions. 
            If you do not agree with any part of these terms, you may not use our services.
          </p>
          <p style={styles.paragraph}>
            These terms constitute a legally binding agreement between you and KalaKart regarding your use of our platform.
          </p>
        </div>
      )
    },
    {
      icon: '👥',
      title: '2. User Accounts',
      content: (
        <div>
          <p style={styles.paragraph}>When you create an account with us, you must provide accurate and complete information. You are responsible for:</p>
          <ul style={styles.list}>
            <li style={styles.listItem}>Maintaining the confidentiality of your account credentials</li>
            <li style={styles.listItem}>All activities that occur under your account</li>
            <li style={styles.listItem}>Notifying us immediately of any unauthorized use</li>
          </ul>
          <p style={styles.paragraph}>We reserve the right to suspend or terminate accounts that violate these terms.</p>
        </div>
      )
    },
    {
      icon: '🛒',
      title: '3. Orders and Payments',
      content: (
        <div>
          <p style={styles.paragraph}>When you place an order on KalaKart:</p>
          <ul style={styles.list}>
            <li style={styles.listItem}>All orders are subject to product availability</li>
            <li style={styles.listItem}>Prices are listed in Indian Rupees (₹) and include applicable taxes</li>
            <li style={styles.listItem}>Payment must be received before order processing</li>
            <li style={styles.listItem}>We accept various payment methods including credit/debit cards, UPI, and cash on delivery</li>
          </ul>
          <div style={styles.note}>
            <p style={styles.noteText}>
              <span style={styles.highlight}>Note:</span> Cash on Delivery is available for orders under ₹50,000 and within select locations.
            </p>
          </div>
        </div>
      )
    },
    {
      icon: '🚚',
      title: '4. Shipping and Delivery',
      content: (
        <div>
          <p style={styles.paragraph}>Our shipping policy includes:</p>
          <ul style={styles.list}>
            <li style={styles.listItem}>Free shipping on orders above ₹500</li>
            <li style={styles.listItem}>Standard delivery: 3-7 business days</li>
            <li style={styles.listItem}>Express delivery: 1-2 business days (additional charges apply)</li>
            <li style={styles.listItem}>International shipping available for select products</li>
          </ul>
          <p style={styles.paragraph}>Delivery times are estimates and may vary based on location and other factors.</p>
        </div>
      )
    },
    {
      icon: '🔄',
      title: '5. Returns and Refunds',
      content: (
        <div>
          <p style={styles.paragraph}>We want you to be completely satisfied with your purchase. Our return policy:</p>
          <ul style={styles.list}>
            <li style={styles.listItem}>7-day return window from delivery date</li>
            <li style={styles.listItem}>Items must be unused and in original packaging</li>
            <li style={styles.listItem}>Refunds processed within 5-7 business days</li>
            <li style={styles.listItem}>Return shipping costs borne by customer (except for defective items)</li>
          </ul>
          <p style={styles.paragraph}>Customized or personalized items cannot be returned unless defective.</p>
        </div>
      )
    },
    {
      icon: '🎨',
      title: '6. Product Authenticity',
      content: (
        <div>
          <p style={styles.paragraph}>KalaKart is committed to providing authentic handicrafts:</p>
          <ul style={styles.list}>
            <li style={styles.listItem}>All products are sourced directly from verified artisans</li>
            <li style={styles.listItem}>Each item is handcrafted using traditional techniques</li>
            <li style={styles.listItem}>Product descriptions and images are accurate representations</li>
            <li style={styles.listItem}>Minor variations in handcrafted items are part of their unique charm</li>
          </ul>
        </div>
      )
    },
    {
      icon: '👨‍🎨',
      title: '7. Artisan Responsibilities',
      content: (
        <div>
          <p style={styles.paragraph}>For our artisan community:</p>
          <ul style={styles.list}>
            <li style={styles.listItem}>Artisans must provide authentic, handcrafted products</li>
            <li style={styles.listItem}>Maintain accurate inventory and pricing</li>
            <li style={styles.listItem}>Process orders within 2 business days</li>
            <li style={styles.listItem}>Respond to customer inquiries promptly</li>
            <li style={styles.listItem}>Adhere to quality standards and delivery timelines</li>
          </ul>
        </div>
      )
    },
    {
      icon: '🔒',
      title: '8. Privacy and Data Security',
      content: (
        <div>
          <p style={styles.paragraph}>We take your privacy seriously:</p>
          <ul style={styles.list}>
            <li style={styles.listItem}>Personal information is encrypted and securely stored</li>
            <li style={styles.listItem}>We never share your data with third parties without consent</li>
            <li style={styles.listItem}>Payment information is processed through secure gateways</li>
            <li style={styles.listItem}>You may request deletion of your account data at any time</li>
          </ul>
          <p style={styles.paragraph}>For more details, see our <Link to="/privacy" style={{color: '#b45f3a', textDecoration: 'none'}}>Privacy Policy</Link>.</p>
        </div>
      )
    },
    {
      icon: '⚖️',
      title: '9. Intellectual Property',
      content: (
        <div>
          <p style={styles.paragraph}>All content on KalaKart is protected by intellectual property rights:</p>
          <ul style={styles.list}>
            <li style={styles.listItem}>Website design, logos, and content are owned by KalaKart</li>
            <li style={styles.listItem}>Product images and descriptions are provided by artisans</li>
            <li style={styles.listItem}>You may not reproduce, distribute, or modify our content without permission</li>
          </ul>
        </div>
      )
    },
    {
      icon: '🚫',
      title: '10. Prohibited Activities',
      content: (
        <div>
          <p style={styles.paragraph}>You may not engage in:</p>
          <ul style={styles.list}>
            <li style={styles.listItem}>Fraudulent transactions or payment methods</li>
            <li style={styles.listItem}>Misrepresentation of identity or information</li>
            <li style={styles.listItem}>Harassment of artisans or other users</li>
            <li style={styles.listItem}>Attempting to breach website security</li>
            <li style={styles.listItem}>Reverse engineering or copying the platform</li>
          </ul>
        </div>
      )
    },
    {
      icon: '📞',
      title: '11. Contact Information',
      content: (
        <div>
          <p style={styles.paragraph}>For questions or concerns regarding these terms:</p>
          <ul style={styles.list}>
            <li style={styles.listItem}>Email: legal@kalakart.com</li>
            <li style={styles.listItem}>Phone: +91 98765 43210</li>
            <li style={styles.listItem}>Address: 123 Heritage Street, Andheri East, Mumbai 400069</li>
          </ul>
          <p style={styles.paragraph}>We aim to respond to all inquiries within 24-48 hours.</p>
        </div>
      )
    }
  ];

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>
          Terms & Conditions
          <span style={styles.titleUnderline}></span>
        </h1>
        <p style={styles.lastUpdated}>Last Updated: March 15, 2024</p>
      </div>

      {/* Content */}
      <div style={styles.content}>
        {/* Sidebar Navigation */}
        <div style={styles.sidebar}>
          <h3 style={styles.sidebarTitle}>Quick Navigation</h3>
          <ul style={styles.navList}>
            {sections.map((section, index) => (
              <li key={index} style={styles.navItem}>
                <a
                  href={`#section-${index + 1}`}
                  style={styles.navLink}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#f0e8e2';
                    e.target.style.color = '#b45f3a';
                    e.target.style.paddingLeft = '1.5rem';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.color = '#666';
                    e.target.style.paddingLeft = '1rem';
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById(`section-${index + 1}`);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  {section.icon} {section.title.split('. ')[1]}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div style={styles.mainContent}>
          {sections.map((section, index) => (
            <div
              key={index}
              id={`section-${index + 1}`}
              style={styles.section}
            >
              <div
                style={styles.sectionHeader}
                onClick={() => toggleSection(index)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f0e8e2';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#f8f5f2';
                }}
              >
                <h2 style={styles.sectionTitle}>
                  <span style={styles.sectionIcon}>{section.icon}</span>
                  {section.title}
                </h2>
                <span style={{
                  ...styles.toggleIcon,
                  transform: activeSection === index ? 'rotate(180deg)' : 'rotate(0)'
                }}>
                  ▼
                </span>
              </div>
              {activeSection === index && (
                <div style={styles.sectionContent}>
                  {section.content}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <p style={styles.paragraph}>
          By using KalaKart, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
        </p>
        <button
          style={styles.acceptBtn}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-3px) scale(1.02)';
            e.target.style.boxShadow = '0 8px 20px rgba(180,95,58,0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'none';
            e.target.style.boxShadow = '0 4px 12px rgba(180,95,58,0.2)';
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          I Accept
        </button>
      </div>
    </div>
  );
};

export default Terms;