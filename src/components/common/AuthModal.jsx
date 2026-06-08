import React from 'react'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'

const AuthModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 3000;
    padding: 2rem;
    animation: fadeIn 0.3s ease;
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;

const AuthModalCard = styled.div`
    background: white;
    border-radius: 16px;
    max-width: 400px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    animation: slideUp 0.3s ease;
    position: relative;
    
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

const AuthModalHeader = styled.div`
    padding: 2rem 2rem 1rem;
    text-align: center;
    border-bottom: 1px solid #e9ecef;
`;

const AuthModalTitle = styled.h2`
    font-family: 'Dancing Script', cursive;
    font-size: 2rem;
    color: #333;
    margin-bottom: 0.5rem;
`;

const AuthModalSubtitle = styled.p`
    color: #666;
    font-size: 1rem;
    margin-bottom: 1rem;
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

const AuthModalBody = styled.div`
    padding: 2rem;
`;

const AuthMessage = styled.p`
    color: #666;
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 2rem;
    text-align: center;
`;

const AuthButtons = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const AuthButton = styled.button`
    padding: 1rem 2rem;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: center;
    text-decoration: none;
    display: block;
`;

const LoginButton = styled(AuthButton)`
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
    color: white;
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(255, 107, 107, 0.3);
    }
`;

const RegisterButton = styled(AuthButton)`
    background: transparent;
    color: #4ecdc4;
    border: 2px solid #4ecdc4;
    
    &:hover {
        background: #4ecdc4;
        color: white;
        transform: translateY(-2px);
    }
`;

const CancelButton = styled(AuthButton)`
    background: #f8f9fa;
    color: #666;
    
    &:hover {
        background: #e9ecef;
    }
`;

const AuthModal = ({ isOpen, onClose, product }) => {
    const navigate = useNavigate();

    if (!isOpen || !product) return null;

    const isCartCheckout = product.emoji === '🛒';

    const handleLogin = () => {
        // Store the appropriate data for after login
        if (isCartCheckout) {
            localStorage.setItem('pendingCartCheckout', 'true');
        } else {
            localStorage.setItem('pendingProduct', JSON.stringify(product));
        }
        navigate('/login');
        onClose();
    };

    const handleRegister = () => {
        // Store the appropriate data for after registration
        if (isCartCheckout) {
            localStorage.setItem('pendingCartCheckout', 'true');
        } else {
            localStorage.setItem('pendingProduct', JSON.stringify(product));
        }
        navigate('/register');
        onClose();
    };

    return (
        <AuthModalOverlay onClick={onClose}>
            <AuthModalCard onClick={(e) => e.stopPropagation()}>
                <AuthModalHeader>
                    <AuthModalTitle>Authentication Required</AuthModalTitle>
                    <AuthModalSubtitle>Please login or register to continue</AuthModalSubtitle>
                    
                    <ProductInfo>
                        <ProductEmoji>{product.emoji}</ProductEmoji>
                        <ProductDetails>
                            <ProductName>{product.name}</ProductName>
                            <ProductPrice>${product.price}</ProductPrice>
                        </ProductDetails>
                    </ProductInfo>
                </AuthModalHeader>
                
                <AuthModalBody>
                    <AuthMessage>
                        {isCartCheckout 
                            ? `To checkout your cart with ${product.name} totaling $${product.price}, you'll need to login or create an account. This helps us provide you with the best shopping experience and secure checkout process.`
                            : `To purchase this beautiful arrangement, you'll need to login or create an account. This helps us provide you with the best shopping experience and secure checkout process.`
                        }
                    </AuthMessage>
                    
                    <AuthButtons>
                        <LoginButton onClick={handleLogin}>
                            🔐 Login to Continue
                        </LoginButton>
                        
                        <RegisterButton onClick={handleRegister}>
                            🌟 Create New Account
                        </RegisterButton>
                        
                        <CancelButton onClick={onClose}>
                            Cancel
                        </CancelButton>
                    </AuthButtons>
                </AuthModalBody>
            </AuthModalCard>
        </AuthModalOverlay>
    );
};

export default AuthModal;
