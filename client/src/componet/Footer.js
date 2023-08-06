import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
    <footer className="footer">
      <div className="footer-links">
        <div className="footer-section">
          <h3>Company</h3>
         <ul>
            <li><Link href="#">About Us</Link></li>
            <li><Link href="#">Contact Us</Link></li>
            <li><Link href="#">Careers</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Travel</h3>
          <ul>
            <li><Link href="#">Hotels</Link></li>
            <li><Link href="#">Flights</Link></li>
            <li><Link href="#">Car Rentals</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-social">
        <Link href="#"><i className="fab fa-facebook-f"></i></Link>
        <Link href="#"><i className="fab fa-twitter"></i></Link>
        <Link href="#"><i className="fab fa-instagram"></i></Link>
      </div>
    </footer>
    </>
  )
}

export default Footer