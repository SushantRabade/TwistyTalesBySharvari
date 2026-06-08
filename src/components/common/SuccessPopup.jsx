import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'

const SuccessPopupOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 4000;
    padding: 2rem;
    animation: fadeIn 0.3s ease;
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;

const SuccessPopupCard = styled.div`
    background: white;
    border-radius: 16px;
    max-width: 400px;
    width: 100%;
    padding: 2rem;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    animation: slideUp 0.3s ease;
    text-align: center;
    
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

const SuccessIcon = styled.div`
    font-size: 4rem;
    margin-bottom: 1rem;
    animation: bounce 0.6s ease;
    
    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
        40% { transform: translateY(-10px); }
        60% { transform: translateY(-5px); }
    }
`;

const SuccessTitle = styled.h2`
    font-family: 'Dancing Script', cursive;
    font-size: 2rem;
    color: #333;
    margin-bottom: 0.5rem;
`;

const SuccessMessage = styled.p`
    color: #666;
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
    line-height: 1.6;
`;

const ProductInfo = styled.div`
    background: linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%);
    color: white;
    padding: 1rem;
    border-radius: 12px;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
`;

const ProductEmoji = styled.div`
    font-size: 2rem;
`;

const ProductDetails = styled.div`
    flex: 1;
    text-align: left;
`;

const ProductName = styled.div`
    font-weight: 600;
    font-size: 1.1rem;
    margin-bottom: 0.25rem;
`;

const ProductPrice = styled.div`
    font-size: 1.2rem;
    font-weight: 700;
`;

const SuccessButton = styled.button`
    background: linear-gradient(45deg, #4ecdc4, #45b7d1);
    color: white;
    border: none;
    padding: 1rem 2rem;
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

const CartLink = styled(SuccessButton)`
    background: linear-gradient(45deg, #ff6b6b, #ff8e53);
    margin-left: 0.5rem;
    
    &:hover {
        box-shadow: 0 5px 15px rgba(255, 107, 107, 0.3);
    }
`;

const SuccessPopup = ({ isOpen, onClose, product }) => {
    const navigate = useNavigate();
    
    if (!isOpen || !product) return null;

    const handleClose = () => {
        onClose();
    };

    const handleViewCart = () => {
        console.log('SuccessPopup - handleViewCart called');
        onClose();
        // Use React Router navigation instead of window.location to avoid full page reload
        navigate('/cart');
    };

    return (
        <SuccessPopupOverlay onClick={handleClose}>
            <SuccessPopupCard onClick={(e) => e.stopPropagation()}>
                <SuccessIcon>✨</SuccessIcon>
                <SuccessTitle>Added to Cart!</SuccessTitle>
                <SuccessMessage>
                    Beautiful! Your item has been successfully added to your shopping cart.
                </SuccessMessage>
                
                <ProductInfo>
                    <ProductEmoji>{product.emoji}</ProductEmoji>
                    <ProductDetails>
                        <ProductName>{product.name}</ProductName>
                        <ProductPrice>${product.price}</ProductPrice>
                    </ProductDetails>
                </ProductInfo>
                
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                    <SuccessButton onClick={handleClose}>
                        🌸 Continue Shopping
                    </SuccessButton>
                    <CartLink onClick={handleViewCart}>
                        🛒 View Cart
                    </CartLink>
                </div>
            </SuccessPopupCard>
        </SuccessPopupOverlay>
    );
};

export default SuccessPopup;
