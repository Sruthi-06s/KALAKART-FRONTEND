import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { productService } from '../services/productService';
import './States.css';

const States = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [hoveredState, setHoveredState] = useState(null);
  const [stateProducts, setStateProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedState, setSelectedState] = useState(null);

  // India states with SVG path coordinates (simplified but accurate shapes)
  const states = [
    { 
      id: 'jk',
      name: 'JAMMU_KASHMIR',
      displayName: 'Jammu & Kashmir',
      path: 'M230,40 L280,35 L310,55 L300,90 L270,95 L240,85 L220,65 L230,40',
      productCount: 0
    },
    { 
      id: 'hp',
      name: 'HIMACHAL_PRADESH',
      displayName: 'Himachal Pradesh',
      path: 'M290,70 L320,65 L335,80 L325,105 L300,100 L285,85 L290,70',
      productCount: 0
    },
    { 
      id: 'pb',
      name: 'PUNJAB',
      displayName: 'Punjab',
      path: 'M260,85 L285,80 L295,95 L275,110 L250,105 L245,90 L260,85',
      productCount: 0
    },
    { 
      id: 'hr',
      name: 'HARYANA',
      displayName: 'Haryana',
      path: 'M265,105 L285,100 L295,115 L275,130 L255,125 L250,110 L265,105',
      productCount: 0
    },
    { 
      id: 'up',
      name: 'UTTAR_PRADESH',
      displayName: 'Uttar Pradesh',
      path: 'M295,115 L340,100 L370,125 L345,155 L310,150 L285,135 L280,115 L295,115',
      productCount: 0
    },
    { 
      id: 'rj',
      name: 'RAJASTHAN',
      displayName: 'Rajasthan',
      path: 'M210,125 L265,110 L280,135 L255,160 L215,165 L190,145 L200,125 L210,125',
      productCount: 0
    },
    { 
      id: 'gj',
      name: 'GUJARAT',
      displayName: 'Gujarat',
      path: 'M190,165 L225,155 L240,185 L210,205 L175,195 L165,175 L190,165',
      productCount: 0
    },
    { 
      id: 'mp',
      name: 'MADHYA_PRADESH',
      displayName: 'Madhya Pradesh',
      path: 'M235,165 L285,150 L310,175 L275,200 L235,195 L210,185 L225,165 L235,165',
      productCount: 0
    },
    { 
      id: 'mh',
      name: 'MAHARASHTRA',
      displayName: 'Maharashtra',
      path: 'M215,205 L260,190 L285,215 L255,245 L215,235 L190,220 L195,200 L215,205',
      productCount: 0
    },
    { 
      id: 'wb',
      name: 'WEST_BENGAL',
      displayName: 'West Bengal',
      path: 'M355,155 L380,145 L395,165 L375,185 L350,175 L340,160 L355,155',
      productCount: 0
    },
    { 
      id: 'od',
      name: 'ODISHA',
      displayName: 'Odisha',
      path: 'M340,185 L370,170 L385,195 L360,215 L330,205 L325,185 L340,185',
      productCount: 0
    },
    { 
      id: 'tn',
      name: 'TAMIL_NADU',
      displayName: 'Tamil Nadu',
      path: 'M280,295 L310,285 L325,310 L295,330 L265,315 L260,300 L280,295',
      productCount: 0
    },
    { 
      id: 'ka',
      name: 'KARNATAKA',
      displayName: 'Karnataka',
      path: 'M240,245 L280,235 L305,255 L275,285 L235,275 L215,260 L225,245 L240,245',
      productCount: 0
    },
    { 
      id: 'kl',
      name: 'KERALA',
      displayName: 'Kerala',
      path: 'M270,305 L295,295 L310,320 L285,340 L260,330 L255,315 L270,305',
      productCount: 0
    },
    { 
      id: 'ap',
      name: 'ANDHRA_PRADESH',
      displayName: 'Andhra Pradesh',
      path: 'M305,235 L335,220 L355,240 L330,265 L300,255 L290,240 L305,235',
      productCount: 0
    },
    { 
      id: 'tg',
      name: 'TELANGANA',
      displayName: 'Telangana',
      path: 'M280,225 L310,215 L325,235 L300,250 L270,240 L265,225 L280,225',
      productCount: 0
    },
    { 
      id: 'br',
      name: 'BIHAR',
      displayName: 'Bihar',
      path: 'M325,125 L350,115 L365,135 L345,150 L320,140 L315,130 L325,125',
      productCount: 0
    },
    { 
      id: 'jh',
      name: 'JHARKHAND',
      displayName: 'Jharkhand',
      path: 'M335,145 L360,135 L375,155 L350,170 L330,160 L325,150 L335,145',
      productCount: 0
    },
    { 
      id: 'cg',
      name: 'CHHATTISGARH',
      displayName: 'Chhattisgarh',
      path: 'M295,185 L325,170 L345,190 L320,210 L290,200 L280,185 L295,185',
      productCount: 0
    },
    { 
      id: 'as',
      name: 'ASSAM',
      displayName: 'Assam',
      path: 'M380,95 L410,85 L430,105 L415,125 L390,115 L375,105 L380,95',
      productCount: 0
    },
    { 
      id: 'ne', 
      name: 'NORTH_EAST', 
      displayName: 'North East',
      path: 'M400,115 L425,105 L440,125 L425,145 L400,135 L385,125 L400,115',
      productCount: 0
    }
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getAllProducts();
      setProducts(data);
      
      // Count products per state
      const counts = {};
      data.forEach(product => {
        const state = product.state;
        counts[state] = (counts[state] || 0) + 1;
      });
      setStateProducts(counts);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStateClick = (stateName) => {
    if (stateProducts[stateName] > 0) {
      setSelectedState(stateName);
      navigate(`/products?state=${encodeURIComponent(stateName)}`);
    }
  };

  const formatStateName = (state) => {
    return state.split('_')
      .map(word => word.charAt(0) + word.slice(1).toLowerCase())
      .join(' ');
  };

  if (loading) {
    return (
      <div className="states-loading">
        <div className="loading-spinner"></div>
        <p>Loading India map...</p>
      </div>
    );
  }

  return (
    <div className="states-page">
      <div className="states-header">
        <h1>Explore India's Handicrafts</h1>
        <p>Click on any state to discover its unique crafts</p>
      </div>

      <div className="map-wrapper">
        <div className="map-container">
          <svg
            viewBox="150 20 350 380"
            className="india-map"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Map Background */}
            <rect x="150" y="20" width="350" height="380" fill="#e8f0fe" rx="8" />
            
            {/* Map Border */}
            <rect
              x="150"
              y="20"
              width="350"
              height="380"
              fill="none"
              stroke="#b45f3a"
              strokeWidth="2"
              rx="8"
            />

            {/* State Paths */}
            {states.map((state) => {
              const productCount = stateProducts[state.name] || 0;
              const isHovered = hoveredState === state.name;
              
              return (
                <g key={state.id}>
                  <path
                    d={state.path}
                    className={`state-path ${productCount > 0 ? 'has-products' : 'no-products'}`}
                    fill={productCount > 0 ? '#b45f3a' : '#e0e0e0'}
                    fillOpacity={productCount > 0 ? (isHovered ? 0.9 : 0.7) : 0.3}
                    stroke="#ffffff"
                    strokeWidth={isHovered ? '3' : '1'}
                    onClick={() => productCount > 0 && handleStateClick(state.name)}
                    onMouseEnter={() => setHoveredState(state.name)}
                    onMouseLeave={() => setHoveredState(null)}
                    style={{
                      cursor: productCount > 0 ? 'pointer' : 'default',
                      transition: 'all 0.2s ease',
                      filter: isHovered ? 'drop-shadow(0 0 8px rgba(180,95,58,0.5))' : 'none'
                    }}
                  />
                  {/* State Name Label */}
                  <text
                    x={state.path.split(' ')[0].replace(/[^\d]/g, '') * 1 + 15}
                    y={state.path.split(' ')[1].replace(/[^\d]/g, '') * 1 - 5}
                    className={`state-label ${isHovered ? 'visible' : ''}`}
                    textAnchor="middle"
                    fontSize="8"
                  >
                    {state.displayName.split(' ')[0]}
                  </text>
                </g>
              );
            })}

            {/* Map Title */}
            <text
              x="300"
              y="40"
              textAnchor="middle"
              fill="#2c1810"
              fontSize="16"
              fontWeight="bold"
            >
              INDIA
            </text>
          </svg>

          {/* Legend */}
          <div className="map-legend">
            <div className="legend-item">
              <span className="legend-color available"></span>
              <span>States with products</span>
            </div>
            <div className="legend-item">
              <span className="legend-color unavailable"></span>
              <span>No products yet</span>
            </div>
          </div>
        </div>

        {/* Info Panel */}
        <div className="info-panel">
          {hoveredState ? (
            <>
              <h3>{formatStateName(hoveredState)}</h3>
              <p className="product-count">
                {stateProducts[hoveredState] || 0} Products Available
              </p>
              {stateProducts[hoveredState] > 0 ? (
                <button
                  className="view-btn"
                  onClick={() => handleStateClick(hoveredState)}
                >
                  View Products →
                </button>
              ) : (
                <p className="no-products">Coming soon...</p>
              )}
            </>
          ) : (
            <>
              <h3>Welcome to KalaKart</h3>
              <p className="info-text">
                Hover over any state to see available handicrafts
              </p>
              <div className="stats-summary">
                <div className="stat">
                  <span className="stat-value">{products.length}+</span>
                  <span className="stat-label">Total Products</span>
                </div>
                <div className="stat">
                  <span className="stat-value">{Object.keys(stateProducts).length}</span>
                  <span className="stat-label">States with Crafts</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* State Grid */}
      <div className="state-grid-section">
        <h2>Browse by State</h2>
        <div className="state-grid">
          {states.map((state) => {
            const count = stateProducts[state.name] || 0;
            return (
              <div
                key={state.id}
                className={`state-card ${count > 0 ? 'active' : 'inactive'}`}
                onClick={() => count > 0 && handleStateClick(state.name)}
                onMouseEnter={() => setHoveredState(state.name)}
                onMouseLeave={() => setHoveredState(null)}
              >
                <h4>{state.displayName}</h4>
                <p className="state-count">{count} products</p>
                {count > 0 && <span className="explore-icon">→</span>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default States;