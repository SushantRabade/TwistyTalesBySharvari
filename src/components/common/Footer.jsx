import React from 'react'

const Footer = () => (
    <footer className="footer">
        <div className="container">
            <div className="footer-content">
                <div className="footer-section">
                    <div className="footer-logo">
                        <h3>🌸 Twisty Tales</h3>
                        <p>by Sharvari</p>
                        <p className="footer-description">
                            Creating beautiful handmade flower arrangements for every special occasion. 
                            Each piece is crafted with love and attention to detail.
                        </p>
                    </div>
                </div>
                
                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <ul className="footer-links">
                        <li><a href="/">Home</a></li>
                        <li><a href="/about">About</a></li>
                        <li><a href="/gallery">Gallery</a></li>
                        <li><a href="/products">Products</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </div>
                
                <div className="footer-section">
                    <h4>Services</h4>
                    <ul className="footer-links">
                        <li><a href="/products">Wedding Flowers</a></li>
                        <li><a href="/products">Birthday Arrangements</a></li>
                        <li><a href="/products">Corporate Events</a></li>
                        <li><a href="/products">Custom Designs</a></li>
                        <li><a href="/contact">Bulk Orders</a></li>
                    </ul>
                </div>
                
                <div className="footer-section">
                    <h4>Contact Info</h4>
                    <div className="footer-contact">
                        <p><i className="fas fa-envelope"></i> twistytales@example.com</p>
                        <p><i className="fab fa-instagram"></i> @twistytales_by_sharvari</p>
                        <p><i className="fas fa-phone"></i> +91 98765 43210</p>
                        <p><i className="fas fa-map-marker-alt"></i> Mumbai, India</p>
                    </div>
                </div>
            </div>
            
            <div className="footer-bottom">
                <div className="footer-bottom-content">
                    <p>© 2024 Twisty Tales by Sharvari. All rights reserved.</p>
                    <div className="footer-social">
                        <a
                            href="https://www.instagram.com/twisty_tales_by.sharvari"
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Instagram"
                        >
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a
                            href="https://www.facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Facebook"
                        >
                            <i className="fab fa-facebook"></i>
                        </a>
                        <a
                            href="https://www.pinterest.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Pinterest"
                        >
                            <i className="fab fa-pinterest"></i>
                        </a>
                        <a
                            href="https://wa.me/919876543210"
                            target="_blank"
                            rel="noopener noreferrer"
                            title="WhatsApp"
                        >
                            <i className="fab fa-whatsapp"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
);

export default Footer;
