import React, { useState } from 'react'
import styled from '@emotion/styled'

const CheckoutModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 5000;
    padding: 2rem;
    animation: fadeIn 0.3s ease;
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;

const CheckoutModalCard = styled.div`
    background: white;
    border-radius: 16px;
    max-width: 600px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    animation: slideUp 0.3s ease;
    
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

const CheckoutModalHeader = styled.div`
    padding: 2rem 2rem 1rem;
    text-align: center;
    border-bottom: 1px solid #e9ecef;
`;

const CheckoutModalTitle = styled.h2`
    font-family: 'Dancing Script', cursive;
    font-size: 2.5rem;
    color: #333;
    margin-bottom: 0.5rem;
`;

const CheckoutModalSubtitle = styled.p`
    color: #666;
    font-size: 1.1rem;
`;

const CheckoutModalBody = styled.div`
    padding: 2rem;
`;

const CheckoutStep = styled.div`
    margin-bottom: 2rem;
    
    &:last-child {
        margin-bottom: 0;
    }
`;

const StepTitle = styled.h3`
    font-size: 1.3rem;
    color: #333;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const StepNumber = styled.div`
    width: 30px;
    height: 30px;
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 0.9rem;
`;

const AddressOptions = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1rem;
`;

const AddressOption = styled.label`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem;
    border: 2px solid #e9ecef;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
        border-color: #4ecdc4;
        background: #f8f9fa;
    }
    
    input[type="radio"] {
        accent-color: #4ecdc4;
    }
`;

const CustomAddressInput = styled.textarea`
    width: 100%;
    padding: 1rem;
    border: 2px solid #e9ecef;
    border-radius: 8px;
    font-size: 1rem;
    font-family: inherit;
    resize: vertical;
    min-height: 100px;
    margin-top: 1rem;
    
    &:focus {
        outline: none;
        border-color: #4ecdc4;
        box-shadow: 0 0 0 3px rgba(78, 205, 196, 0.1);
    }
`;

const PaymentOptions = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
`;

const PaymentOption = styled.label`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem;
    border: 2px solid #e9ecef;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: center;
    
    &:hover {
        border-color: #4ecdc4;
        background: #f8f9fa;
    }
    
    input[type="radio"] {
        accent-color: #4ecdc4;
    }
    
    .payment-icon {
        font-size: 2rem;
    }
    
    .payment-name {
        font-weight: 600;
        color: #333;
    }
`;

const OrderSummary = styled.div`
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    padding: 1.5rem;
    border-radius: 12px;
    margin-bottom: 2rem;
`;

const SummaryRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
    
    &:last-child {
        margin-bottom: 0;
        padding-top: 0.5rem;
        border-top: 2px solid #dee2e6;
        font-weight: 700;
        font-size: 1.1rem;
    }
`;

const CheckoutActions = styled.div`
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
`;

const CancelButton = styled.button`
    padding: 1rem 2rem;
    background: #f8f9fa;
    color: #666;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
        background: #e9ecef;
    }
`;

const ConfirmButton = styled.button`
    padding: 1rem 2rem;
    background: linear-gradient(45deg, #4ecdc4, #45b7d1);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(78, 205, 196, 0.3);
    }
`;

const CheckoutModal = ({ isOpen, onClose, cartItems, totalPrice, totalItems }) => {
    const [selectedAddress, setSelectedAddress] = useState('home');
    const [customAddress, setCustomAddress] = useState('');
    const [selectedPayment, setSelectedPayment] = useState('cod');

    if (!isOpen) return null;

    const handleConfirmOrder = () => {
        // Here you would typically process the order
        alert('Order confirmed! Thank you for your purchase. 🌸');
        onClose();
        // You might want to clear the cart here or redirect to a success page
    };

    const addresses = [
        { id: 'home', label: 'Home Address', value: '123 Flower Street, Garden City, GC 12345' },
        { id: 'work', label: 'Work Address', value: '456 Business Ave, Commerce District, CD 67890' },
        { id: 'custom', label: 'Custom Address', value: 'custom' }
    ];

    const paymentMethods = [
        { id: 'cod', name: 'Cash on Delivery', icon: '💵' },
        { id: 'paypal', name: 'PayPal', icon: '💳' },
        { id: 'shopify', name: 'Shopify Pay', icon: '🛍️' },
        { id: 'google', name: 'Google Pay', icon: '💳' }
    ];

    return (
        <CheckoutModalOverlay onClick={onClose}>
            <CheckoutModalCard onClick={(e) => e.stopPropagation()}>
                <CheckoutModalHeader>
                    <CheckoutModalTitle>Checkout</CheckoutModalTitle>
                    <CheckoutModalSubtitle>Complete your flower order</CheckoutModalSubtitle>
                </CheckoutModalHeader>
                
                <CheckoutModalBody>
                    {/* Order Summary */}
                    <CheckoutStep>
                        <StepTitle>
                            <StepNumber>1</StepNumber>
                            Order Summary
                        </StepTitle>
                        <OrderSummary>
                            <SummaryRow>
                                <span>Items ({totalItems})</span>
                                <span>${totalPrice}</span>
                            </SummaryRow>
                            <SummaryRow>
                                <span>Delivery</span>
                                <span>Free</span>
                            </SummaryRow>
                            <SummaryRow>
                                <span>Total</span>
                                <span>${totalPrice}</span>
                            </SummaryRow>
                        </OrderSummary>
                    </CheckoutStep>

                    {/* Delivery Address */}
                    <CheckoutStep>
                        <StepTitle>
                            <StepNumber>2</StepNumber>
                            Delivery Address
                        </StepTitle>
                        <AddressOptions>
                            {addresses.map(address => (
                                <AddressOption key={address.id}>
                                    <input
                                        type="radio"
                                        name="address"
                                        value={address.id}
                                        checked={selectedAddress === address.id}
                                        onChange={(e) => setSelectedAddress(e.target.value)}
                                    />
                                    <div>
                                        <div style={{ fontWeight: 600 }}>{address.label}</div>
                                        {address.id === 'custom' ? (
                                            <CustomAddressInput
                                                placeholder="Enter your custom address..."
                                                value={customAddress}
                                                onChange={(e) => setCustomAddress(e.target.value)}
                                            />
                                        ) : (
                                            <div style={{ color: '#666', fontSize: '0.9rem' }}>
                                                {address.value}
                                            </div>
                                        )}
                                    </div>
                                </AddressOption>
                            ))}
                        </AddressOptions>
                    </CheckoutStep>

                    {/* Payment Method */}
                    <CheckoutStep>
                        <StepTitle>
                            <StepNumber>3</StepNumber>
                            Payment Method
                        </StepTitle>
                        <PaymentOptions>
                            {paymentMethods.map(method => (
                                <PaymentOption key={method.id}>
                                    <input
                                        type="radio"
                                        name="payment"
                                        value={method.id}
                                        checked={selectedPayment === method.id}
                                        onChange={(e) => setSelectedPayment(e.target.value)}
                                    />
                                    <div className="payment-icon">{method.icon}</div>
                                    <div className="payment-name">{method.name}</div>
                                </PaymentOption>
                            ))}
                        </PaymentOptions>
                    </CheckoutStep>

                    {/* Actions */}
                    <CheckoutActions>
                        <CancelButton onClick={onClose}>
                            Cancel
                        </CancelButton>
                        <ConfirmButton onClick={handleConfirmOrder}>
                            🌸 Confirm Order
                        </ConfirmButton>
                    </CheckoutActions>
                </CheckoutModalBody>
            </CheckoutModalCard>
        </CheckoutModalOverlay>
    );
};

export default CheckoutModal;
