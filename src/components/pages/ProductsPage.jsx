import React, { useState, useEffect } from 'react'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import AuthModal from '../common/AuthModal'
import SuccessPopup from '../common/SuccessPopup'

const ProductsPage = () => {
    const { addToCart, startCheckout } = useCart();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [addedProduct, setAddedProduct] = useState(null);
    
    const products = [
        { id: 1, name: 'Mini Bouquet', price: 15, description: 'Perfect small arrangement for desks', emoji: '🌸' },
        { id: 2, name: 'Standard Bouquet', price: 25, description: 'Medium-sized bouquet for any occasion', emoji: '🌺' },
        { id: 3, name: 'Large Arrangement', price: 40, description: 'Impressive large centerpiece', emoji: '🌻' },
        { id: 4, name: 'Custom Design', price: 50, description: 'Personalized creation just for you', emoji: '🌹' },
        { id: 5, name: 'Rose Collection', price: 35, description: 'Elegant roses in premium wrapping', emoji: '🥀' },
        { id: 6, name: 'Tulip Garden', price: 30, description: 'Fresh colorful tulip arrangement', emoji: '🌷' },
        { id: 7, name: 'Sunflower Bundle', price: 28, description: 'Bright and cheerful sunflowers', emoji: '🌻' },
        { id: 8, name: 'Orchid Luxury', price: 45, description: 'Exotic orchids for special moments', emoji: '🏵️' },
        { id: 9, name: 'Daisy Mix', price: 20, description: 'Sweet daisy collection', emoji: '🌼' },
        { id: 10, name: 'Lily Paradise', price: 38, description: 'Beautiful lily arrangement', emoji: '🌺' },
        { id: 11, name: 'Carnation Set', price: 22, description: 'Classic carnation bouquet', emoji: '🌹' },
        { id: 12, name: 'Peony Dreams', price: 42, description: 'Luxurious peony flowers', emoji: '🌸' }
    ];

    const handleAddToCart = (product) => {
        addToCart(product, 1);
        setAddedProduct(product);
        setShowSuccessPopup(true);
    };

    const handleCloseSuccessPopup = () => {
        setShowSuccessPopup(false);
        setAddedProduct(null);
    };

    const handleBuyNow = (product) => {
        if (!isAuthenticated) {
            // Show authentication modal instead of popup
            setSelectedProduct(product);
            setShowAuthModal(true);
            return;
        }
        
        // User is authenticated, proceed with checkout
        startCheckout(product);
    };

    const handleCloseAuthModal = () => {
        setShowAuthModal(false);
        setSelectedProduct(null);
    };

    // Handle Buy Now trigger after login
    useEffect(() => {
        const handleTriggerBuyNow = (event) => {
            const product = event.detail;
            if (isAuthenticated) {
                startCheckout(product);
            }
        };

        window.addEventListener('triggerBuyNow', handleTriggerBuyNow);
        
        return () => {
            window.removeEventListener('triggerBuyNow', handleTriggerBuyNow);
        };
    }, [isAuthenticated, startCheckout]);

    return (
        <div className="products-page">
            <section className="products">
                <div className="container">
                    <h2>Our Products</h2>
                    <div className="products-grid">
                        {products.map(product => (
                            <div key={product.id} className="product-card">
                                <div className="product-image">
                                    <div className="product-flower">{product.emoji}</div>
                                </div>
                                <div className="product-info">
                                    <h3>{product.name}</h3>
                                    <div className="product-price">${product.price}</div>
                                    <p className="product-description">{product.description}</p>
                                    <div className="product-buttons">
                                        <button 
                                            className="btn-add-to-cart"
                                            onClick={() => handleAddToCart(product)}
                                        >
                                            🛒 Add to Cart
                                        </button>
                                        <button 
                                            className="btn-buy-now"
                                            onClick={() => handleBuyNow(product)}
                                        >
                                            ⚡ Buy Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            <AuthModal 
                isOpen={showAuthModal}
                onClose={handleCloseAuthModal}
                product={selectedProduct}
            />
            
            <SuccessPopup 
                isOpen={showSuccessPopup}
                onClose={handleCloseSuccessPopup}
                product={addedProduct}
            />
        </div>
    );
};

export default ProductsPage;
