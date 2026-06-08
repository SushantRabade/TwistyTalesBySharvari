import React from 'react'
import { useCart } from '../../context/CartContext'

const BuyNowModal = () => {
    const { 
        checkoutItem, 
        checkoutStep, 
        orderQuantity,
        selectedAddress,
        selectedPayment,
        setCheckoutStep,
        setOrderQuantity,
        setSelectedAddress,
        setSelectedPayment,
        completeCheckout,
        addToCart
    } = useCart();

    if (!checkoutItem) return null;

    const handleQuantityChange = (newQuantity) => {
        if (newQuantity > 0 && newQuantity <= 99) {
            setOrderQuantity(newQuantity);
        }
    };

    const handleAddToCartAndContinue = () => {
        addToCart(checkoutItem, orderQuantity);
        setCheckoutStep(2);
    };

    const handleAddressSelect = (address) => {
        setSelectedAddress(address);
        setCheckoutStep(3);
    };

    const handlePaymentSelect = (payment) => {
        setSelectedPayment(payment);
    };

    const handleCompleteOrder = () => {
        // Add the item to cart with selected quantity
        addToCart(checkoutItem, orderQuantity);
        
        // Show success message
        alert(`Order placed successfully!\n\nProduct: ${checkoutItem.name}\nQuantity: ${orderQuantity}\nAddress: ${selectedAddress}\nPayment: ${selectedPayment}\n\nTotal: $${checkoutItem.price * orderQuantity}`);
        
        // Complete checkout
        completeCheckout();
    };

    const handleClose = () => {
        completeCheckout();
    };

    const addresses = [
        'Home: 123 Flower Street, Mumbai, Maharashtra 400001',
        'Office: 456 Business Park, Mumbai, Maharashtra 400002',
        'Other: Custom delivery address'
    ];

    const paymentMethods = [
        { id: 'cod', name: 'Cash on Delivery', icon: '💵' },
        { id: 'paypal', name: 'PayPal', icon: '💳' },
        { id: 'shopify', name: 'Shopify Pay', icon: '🛍️' },
        { id: 'gpay', name: 'Google Pay', icon: '📱' }
    ];

    const renderStepContent = () => {
        switch (checkoutStep) {
            case 1:
                return (
                    <div className="checkout-step">
                        <h3>🌸 Select Quantity</h3>
                        <div className="product-summary">
                            <div className="product-info">
                                <span className="product-emoji">{checkoutItem.emoji}</span>
                                <div>
                                    <h4>{checkoutItem.name}</h4>
                                    <p>${checkoutItem.price} each</p>
                                </div>
                            </div>
                            <div className="quantity-selector">
                                <button 
                                    className="quantity-btn"
                                    onClick={() => handleQuantityChange(orderQuantity - 1)}
                                    disabled={orderQuantity <= 1}
                                >
                                    −
                                </button>
                                <input 
                                    type="number" 
                                    value={orderQuantity}
                                    onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                                    className="quantity-input"
                                    min="1"
                                    max="99"
                                />
                                <button 
                                    className="quantity-btn"
                                    onClick={() => handleQuantityChange(orderQuantity + 1)}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <div className="step-total">
                            <span>Total: ${checkoutItem.price * orderQuantity}</span>
                        </div>
                        <div className="step-actions">
                            <button className="btn-secondary" onClick={handleClose}>
                                Cancel
                            </button>
                            <button className="btn-primary" onClick={handleAddToCartAndContinue}>
                                Add to Cart & Continue →
                            </button>
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="checkout-step">
                        <h3>📍 Select Delivery Address</h3>
                        <div className="address-list">
                            {addresses.map((address, index) => (
                                <label key={index} className="address-option">
                                    <input 
                                        type="radio" 
                                        name="address" 
                                        value={address}
                                        checked={selectedAddress === address}
                                        onChange={(e) => handleAddressSelect(e.target.value)}
                                    />
                                    <span className="address-text">{address}</span>
                                </label>
                            ))}
                        </div>
                        <div className="step-actions">
                            <button className="btn-secondary" onClick={() => setCheckoutStep(1)}>
                                ← Back
                            </button>
                            <button 
                                className="btn-primary" 
                                onClick={() => selectedAddress && setCheckoutStep(3)}
                                disabled={!selectedAddress}
                            >
                                Continue to Payment →
                            </button>
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div className="checkout-step">
                        <h3>💳 Select Payment Method</h3>
                        <div className="payment-list">
                            {paymentMethods.map((method) => (
                                <label key={method.id} className="payment-option">
                                    <input 
                                        type="radio" 
                                        name="payment" 
                                        value={method.id}
                                        checked={selectedPayment === method.id}
                                        onChange={(e) => handlePaymentSelect(e.target.value)}
                                    />
                                    <span className="payment-info">
                                        <span className="payment-icon">{method.icon}</span>
                                        <span className="payment-name">{method.name}</span>
                                    </span>
                                </label>
                            ))}
                        </div>
                        <div className="order-summary">
                            <h4>Order Summary</h4>
                            <div className="summary-item">
                                <span>{checkoutItem.name} x {orderQuantity}</span>
                                <span>${checkoutItem.price * orderQuantity}</span>
                            </div>
                            <div className="summary-item">
                                <span>Delivery</span>
                                <span>Free</span>
                            </div>
                            <div className="summary-total">
                                <span>Total</span>
                                <span>${checkoutItem.price * orderQuantity}</span>
                            </div>
                        </div>
                        <div className="step-actions">
                            <button className="btn-secondary" onClick={() => setCheckoutStep(2)}>
                                ← Back
                            </button>
                            <button 
                                className="btn-success" 
                                onClick={handleCompleteOrder}
                                disabled={!selectedPayment}
                            >
                                ⚡ Complete Order
                            </button>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="buy-now-modal-overlay">
            <div className="buy-now-modal">
                <div className="modal-header">
                    <h2>⚡ Buy Now - Quick Checkout</h2>
                    <button className="modal-close" onClick={handleClose}>
                        ✕
                    </button>
                </div>
                
                <div className="modal-progress">
                    <div className={`progress-step ${checkoutStep >= 1 ? 'active' : ''}`}>
                        <span className="step-number">1</span>
                        <span className="step-label">Quantity</span>
                    </div>
                    <div className={`progress-step ${checkoutStep >= 2 ? 'active' : ''}`}>
                        <span className="step-number">2</span>
                        <span className="step-label">Address</span>
                    </div>
                    <div className={`progress-step ${checkoutStep >= 3 ? 'active' : ''}`}>
                        <span className="step-number">3</span>
                        <span className="step-label">Payment</span>
                    </div>
                </div>

                <div className="modal-content">
                    {renderStepContent()}
                </div>
            </div>
        </div>
    );
};

export default BuyNowModal;
