import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth, useCart } from '../../hooks/reduxHooks'

const Navigation = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { user, isAuthenticated, logout } = useAuth();
    const { totalItems } = useCart();

    // Debug logging
    console.log('Navigation - totalItems:', totalItems);

    const handleCartClick = () => {
        console.log('Cart icon clicked! Navigating to /cart');
        try {
            navigate('/cart');
        } catch (error) {
            console.error('Navigation error:', error);
            // Fallback to window.location
            window.location.href = '/cart';
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navigateTo = (path) => {
        navigate(path);
        setIsMobileMenuOpen(false);
    };

    const handleLogout = () => {
        logout();
        navigate('/');
        setIsMobileMenuOpen(false);
    };

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="nav-container">
                <div className="nav-logo" onClick={() => navigateTo('/')}>
                    <span className="sunflower">🌻</span>
                    <h1>Twisty Tales</h1>
                    <span className="by-sharvari">by Sharvari</span>
                </div>
                <ul className={`nav-menu ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
                    <li>
                        <Link to="/" className={isActive('/') ? 'active' : ''}>Home</Link>
                    </li>
                    <li>
                        <Link to="/about" className={isActive('/about') ? 'active' : ''}>About</Link>
                    </li>
                    <li>
                        <Link to="/gallery" className={isActive('/gallery') ? 'active' : ''}>Gallery</Link>
                    </li>
                    <li>
                        <Link to="/products" className={isActive('/products') ? 'active' : ''}>Products</Link>
                    </li>
                    <li>
                        <Link to="/contact" className={isActive('/contact') ? 'active' : ''}>Contact</Link>
                    </li>
                    {isAuthenticated ? (
                        <>
                            <li>
                                <Link to="/profile" className={isActive('/profile') ? 'active' : ''}>
                                    {user?.avatar} Profile
                                </Link>
                            </li>
                            <li>
                                <button onClick={handleLogout} className="nav-logout-btn">
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to="/login" className={isActive('/login') ? 'active' : ''}>Login</Link>
                            </li>
                            <li>
                                <Link to="/register" className={isActive('/register') ? 'active' : ''}>Register</Link>
                            </li>
                        </>
                    )}
                </ul>
                <div className="cart-icon" onClick={handleCartClick} style={{ cursor: 'pointer', pointerEvents: 'auto', zIndex: 10 }}>
                    🛒
                    {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
                </div>
                <div 
                    className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
