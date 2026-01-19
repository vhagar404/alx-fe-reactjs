import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  const navStyle = {
    backgroundColor: '#2c3e50',
    padding: '1rem',
    marginBottom: '2rem',
  };

  const ulStyle = {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    justifyContent: 'center',
    gap: '3rem',
  };

  const linkStyle = (isActive) => ({
    color: isActive ? '#3498db' : 'white',
    textDecoration: 'none',
    fontSize: '1.2rem',
    fontWeight: isActive ? 'bold' : 'normal',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    transition: 'all 0.3s',
  });

  return (
    <nav style={navStyle}>
      <ul style={ulStyle}>
        <li>
          <Link to="/" style={linkStyle(location.pathname === '/')}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" style={linkStyle(location.pathname === '/about')}>
            About
          </Link>
        </li>
        <li>
          <Link to="/services" style={linkStyle(location.pathname === '/services')}>
            Services
          </Link>
        </li>
        <li>
          <Link to="/contact" style={linkStyle(location.pathname === '/contact')}>
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;