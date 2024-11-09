import React from 'react';
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h4>About Us</h4>
            <p>
            At Dasho, we believe in supporting sustainable practices and empowering local communities. By shopping with us, you're not just buying a product; you're contributing to the preservation of Himalayan culture and heritage.
            </p>
          </div>
          <div className="col-md-4">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Services</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h4>Contact Us</h4>
            <p>
              <strong>Address:</strong> National Institute of Technology Srinagar, India
              <br />
              <strong>Email:</strong> akhil@gmail.com
              <br />
              <strong>Phone:</strong> 123-456-7890
            </p>
            <div className="social-icons">
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright">
        &copy; 2024 Your Website. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;