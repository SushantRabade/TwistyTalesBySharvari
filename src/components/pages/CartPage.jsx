import React, { useState, useEffect } from 'react'
import { useCart, useAuth } from '../../hooks/reduxHooks'
import { useNavigate, Link } from 'react-router-dom'
import AuthModal from '../common/AuthModal'
import CheckoutModal from '../common/CheckoutModal'
import ConfirmRemoveModal from '../common/ConfirmRemoveModal'

const CartPage = () => {
    console.log('CartPage component is loading...');
    
    try {
        const cartContext = useCart();
        console.log('Cart context loaded successfully:', cartContext);
        
        const { items, totalItems, totalPrice, removeFromCart, updateQuantity, clearCart, addToCart } = cartContext;
        const { isAuthenticated } = useAuth();
        const navigate = useNavigate();
        const [showAuthModal, setShowAuthModal] = useState(false);
        const [showCheckoutModal, setShowCheckoutModal] = useState(false);
        const [showConfirmModal, setShowConfirmModal] = useState(false);
        const [itemToRemove, setItemToRemove] = useState(null);

        // Debug logging
        console.log('CartPage - Debug Info:');
        console.log('  items:', items);
        console.log('  totalItems:', totalItems);
        console.log('  totalPrice:', totalPrice);
        console.log('  isAuthenticated:', isAuthenticated);
        console.log('  localStorage cart:', localStorage.getItem('cart'));
        
        // Test cart state
        useEffect(() => {
            console.log('CartPage - useEffect - items changed:', items);
            console.log('CartPage - useEffect - items length:', items?.length || 0);
        }, [items]);

        const handleQuantityChange = (productId, newQuantity) => {
            console.log('CartPage - handleQuantityChange called:', { productId, newQuantity });
            if (newQuantity > 0) {
                updateQuantity(productId, newQuantity);
            }
        };

        const handleRemoveItem = (productId) => {
            const item = items.find(item => item.id === productId);
            if (item) {
                setItemToRemove(item);
                setShowConfirmModal(true);
            }
        };

        const confirmRemoveItem = () => {
            if (itemToRemove) {
                if (itemToRemove.id === 'clear-cart') {
                    clearCart();
                } else {
                    removeFromCart(itemToRemove.id);
                }
                setShowConfirmModal(false);
                setItemToRemove(null);
            }
        };

        const cancelRemoveItem = () => {
            setShowConfirmModal(false);
            setItemToRemove(null);
        };

        const handleClearCart = () => {
        if (items.length > 0) {
            setItemToRemove({ name: 'all items in your cart', id: 'clear-cart' });
            setShowConfirmModal(true);
        }
    };

        const handleProceedToCheckout = () => {
            if (!isAuthenticated) {
                // Show authentication modal
                setShowAuthModal(true);
                return;
            }
            
            // User is authenticated, show checkout modal
            setShowCheckoutModal(true);
        };

        const handleCloseAuthModal = () => {
            setShowAuthModal(false);
        };

        const handleCloseCheckoutModal = () => {
            setShowCheckoutModal(false);
        };

        // Test function to add a test item
        const handleAddTestItem = () => {
            const testItem = {
                id: 999,
                name: 'Test Flower',
                price: 25,
                description: 'A beautiful test flower',
                emoji: '🌹',
                quantity: 1
            };
            addToCart(testItem, 1);
        };

        // Test function to check quantity buttons
        const handleTestQuantityButtons = () => {
            console.log('Testing quantity buttons...');
            const buttons = document.querySelectorAll('.quantity-btn');
            console.log('Found quantity buttons:', buttons.length);
            buttons.forEach((btn, index) => {
                console.log(`Button ${index + 1}:`, btn.textContent, btn.innerHTML);
            });
        };

        // Check for pending cart checkout after login
        useEffect(() => {
            if (isAuthenticated) {
                const pendingCartCheckout = localStorage.getItem('pendingCartCheckout');
                if (pendingCartCheckout) {
                    // Clear the pending checkout
                    localStorage.removeItem('pendingCartCheckout');
                    
                    // Show a small delay then proceed with checkout
                    setTimeout(() => {
                        alert('Proceeding to checkout! (Checkout page to be implemented)');
                    }, 500);
                }
            }
        }, [isAuthenticated]);

        if (items.length === 0) {
            return (
                <div className="cart-page">
                    <section className="cart">
                        <div className="container">
                            <div className="cart-empty">
                                <div className="cart-empty-icon">🛒</div>
                                <h2>Your cart is empty</h2>
                                <p>Looks like you haven't added any flowers to your cart yet.</p>
                                <Link to="/products" className="btn-continue-shopping">
                                    🌸 Continue Shopping
                                </Link>
                            </div>
                        </div>
                    </section>
                </div>
            );
        }

        return (
            <div className="cart-page">
                <section className="cart">
                    <div className="container">
                        <div className="cart-header">
                            <h2>Shopping Cart ({totalItems} items)</h2>
                            <button 
                                className="btn-clear-cart"
                                onClick={handleClearCart}
                            >
                                🗑️ Clear Cart
                            </button>
                        </div>

                        <div className="cart-content">
                            <div className="cart-items">
                                {items.map(item => (
                                    <div key={item.id} className="cart-item">
                                        <div className="cart-item-image">
                                            <div className="cart-item-flower">{item.emoji}</div>
                                        </div>
                                        <div className="cart-item-details">
                                            <h3>{item.name}</h3>
                                            <p className="cart-item-description">{item.description}</p>
                                            <div className="cart-item-price">${item.price}</div>
                                        </div>
                                        <div className="cart-item-quantity">
                                            <div className="quantity-controls">
                                                <button 
                                                    className="quantity-btn"
                                                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                                    disabled={item.quantity <= 1}
                                                    title="Decrease quantity"
                                                >
                                                    −
                                                </button>
                                                <span className="quantity-value">{item.quantity}</span>
                                                <button 
                                                    className="quantity-btn"
                                                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                                    title="Increase quantity"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                        <div className="cart-item-total">
                                            <div className="item-total-price">${item.price * item.quantity}</div>
                                            <button 
                                                className="btn-remove-item"
                                                onClick={() => handleRemoveItem(item.id)}
                                            >
                                                🗑️ Remove
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="cart-summary">
                                <div className="summary-card">
                                    <h3>Order Summary</h3>
                                    <div className="summary-row">
                                        <span>Subtotal ({totalItems} items)</span>
                                        <span>${totalPrice}</span>
                                    </div>
                                    <div className="summary-row">
                                        <span>Delivery</span>
                                        <span>Free</span>
                                    </div>
                                    <div className="summary-row summary-total">
                                        <span>Total</span>
                                        <span>${totalPrice}</span>
                                    </div>
                                    <div className="summary-actions">
                                        <Link to="/products" className="btn-continue">
                                            🌸 Continue Shopping
                                        </Link>
                                        <button className="btn-checkout" onClick={handleProceedToCheckout}>
                                            ⚡ Proceed to Checkout
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                <AuthModal 
                    isOpen={showAuthModal}
                    onClose={handleCloseAuthModal}
                    product={{
                        name: `${totalItems} items`,
                        price: totalPrice,
                        emoji: '🛒'
                    }}
                />
                
                <CheckoutModal 
                    isOpen={showCheckoutModal}
                    onClose={handleCloseCheckoutModal}
                    cartItems={items}
                    totalPrice={totalPrice}
                    totalItems={totalItems}
                />
                
                <ConfirmRemoveModal 
                    isOpen={showConfirmModal}
                    onClose={cancelRemoveItem}
                    onConfirm={confirmRemoveItem}
                    itemName={itemToRemove?.name || ''}
                />
            </div>
        );

    } catch (error) {
        console.error('CartPage Error:', error);
        return (
            <div className="cart-page">
                <section className="cart">
                    <div className="container">
                        <div className="cart-empty">
                            <div className="cart-empty-icon">⚠️</div>
                            <h2>Cart Error</h2>
                            <p>There was an error loading the cart. Please try refreshing the page.</p>
                            <div style={{ marginTop: '1rem', padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
                                <strong>Error Details:</strong>
                                <pre style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>
                                    {error.message}
                                </pre>
                            </div>
                            <Link to="/products" className="btn-continue-shopping" style={{ marginTop: '1rem', display: 'inline-block' }}>
                                🌸 Continue Shopping
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
};

export default CartPage;
