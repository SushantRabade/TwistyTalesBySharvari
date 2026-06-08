import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/reduxHooks';
import styled from '@emotion/styled';
import { Link, useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';

// Styled Components
const BackButton = styled(Link)`
    position: absolute;
    top: 1rem;
    left: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #666;
    text-decoration: none;
    font-size: 0.9rem;
    transition: all 0.3s ease;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(0, 0, 0, 0.1);
    
    &:hover {
        color: #ff6b6b;
        background: white;
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }
    
    i {
        font-size: 1rem;
    }
`;

const LoginContainer = styled.div`
    min-height: calc(100vh - 90px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const LoginCard = styled.div`
    background: white;
    border-radius: 20px;
    padding: 1.5rem;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    position: relative;
    overflow: hidden;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 5px;
        background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
    }
`;

const LoginHeader = styled.div`
    text-align: center;
    margin-bottom: 1rem;
`;

const LoginTitle = styled.h2`
    font-size: 2rem;
    margin-bottom: 0.5rem;
    color: #333;
    font-family: 'Dancing Script', cursive;
`;

const LoginSubtitle = styled.p`
    color: #666;
    font-size: 1rem;
`;

const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    margin-bottom: 0.8rem;
`;

const FormLabel = styled.label`
    font-weight: 600;
    color: #333;
    font-size: 0.9rem;
`;

const FormInput = styled.input`
    padding: 0.8rem;
    border: 2px solid #e1e8ed;
    border-radius: 10px;
    font-size: 1rem;
    transition: all 0.3s ease;
    
    &:focus {
        outline: none;
        border-color: #4ecdc4;
        box-shadow: 0 0 0 3px rgba(78, 205, 196, 0.1);
    }
    
    &.error {
        border-color: #ff6b6b;
    }
`;

const ErrorMessage = styled.span`
    color: #ff6b6b;
    font-size: 0.8rem;
    margin-top: 0.25rem;
`;

const SubmitButton = styled.button`
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
    color: white;
    border: none;
    padding: 0.8rem;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 1rem;
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 20px rgba(255, 107, 107, 0.3);
    }
    
    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none;
    }
`;

const Divider = styled.div`
    text-align: center;
    margin: 1.5rem 0;
    position: relative;
    
    &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        height: 1px;
        background: #e1e8ed;
    }
    
    span {
        background: white;
        padding: 0 1rem;
        color: #666;
        font-size: 0.9rem;
    }
`;

const RegisterLink = styled.div`
    text-align: center;
    margin-top: 1.5rem;
    font-size: 0.9rem;
    color: #666;
    
    a {
        color: #4ecdc4;
        text-decoration: none;
        font-weight: 600;
        
        &:hover {
            color: #45b7d1;
            text-decoration: underline;
        }
    }
`;

const ForgotPasswordLink = styled.button`
    background: none;
    border: none;
    color: #4ecdc4;
    font-size: 0.9rem;
    cursor: pointer;
    text-decoration: underline;
    margin-top: 0.5rem;
    font-weight: 600;
    
    &:hover {
        color: #45b7d1;
    }
`;

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 2rem;
`;

const ForgotPasswordModal = styled.div`
    background: white;
    border-radius: 16px;
    padding: 2rem;
    max-width: 400px;
    width: 100%;
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

const ModalTitle = styled.h2`
    color: #333;
    margin-bottom: 1.5rem;
    text-align: center;
    font-size: 1.5rem;
`;

const ModalMessage = styled.p`
    color: #666;
    margin-bottom: 1.5rem;
    text-align: center;
    line-height: 1.5;
`;

const ModalButton = styled.button`
    width: 100%;
    padding: 1rem;
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
    
    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none;
    }
`;

const CancelButton = styled.button`
    width: 100%;
    padding: 1rem;
    background: #f8f9fa;
    color: #666;
    border: 1px solid #dee2e6;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    margin-top: 0.5rem;
    transition: all 0.3s ease;
    
    &:hover {
        background: #e9ecef;
    }
`;

const LoadingSpinner = styled.div`
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 2px solid #ffffff;
    border-radius: 50%;
    border-top-color: transparent;
    animation: spin 0.8s linear infinite;
    margin-right: 0.5rem;
    
    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
`;

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');
    const [pendingProduct, setPendingProduct] = useState(null);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
    const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false);
    const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState('');
    const [forgotPasswordError, setForgotPasswordError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    // Check for pending product on mount
    useEffect(() => {
        const pending = localStorage.getItem('pendingProduct');
        if (pending) {
            setPendingProduct(JSON.parse(pending));
        }
    }, []);

    const handleForgotPassword = async () => {
        // Validate email
        if (!forgotPasswordEmail.trim()) {
            setForgotPasswordError('Email is required');
            return;
        }
        
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forgotPasswordEmail.trim())) {
            setForgotPasswordError('Please enter a valid email address');
            return;
        }
        
        setForgotPasswordError('');
        setForgotPasswordLoading(true);
        
        try {
            // Initialize EmailJS (you'll need to set up EmailJS account)
            emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key
            
            // Generate password reset token (simple implementation)
            const resetToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            const resetLink = `${window.location.origin}/reset-password?token=${resetToken}&email=${encodeURIComponent(forgotPasswordEmail)}`;
            
            // Send email using EmailJS
            const templateParams = {
                to_email: forgotPasswordEmail,
                reset_link: resetLink,
                user_name: forgotPasswordEmail.split('@')[0], // Extract name from email
                from_name: 'Twisty Tales by Sharvari'
            };
            
            const response = await emailjs.send(
                'YOUR_SERVICE_ID',    // Replace with your EmailJS service ID
                'YOUR_TEMPLATE_ID',   // Replace with your EmailJS template ID
                templateParams
            );
            
            if (response.status === 200) {
                setForgotPasswordSuccess('Password reset link has been sent to your email address!');
                setForgotPasswordLoading(false);
                
                // Store reset token (in real app, you'd store this in database)
                localStorage.setItem(`reset_${forgotPasswordEmail}`, JSON.stringify({
                    token: resetToken,
                    timestamp: Date.now()
                }));
                
                // Close modal after 3 seconds
                setTimeout(() => {
                    setShowForgotPassword(false);
                    setForgotPasswordSuccess('');
                    setForgotPasswordEmail('');
                }, 3000);
            } else {
                throw new Error('Failed to send email');
            }
            
        } catch (error) {
            console.error('EmailJS Error:', error);
            setForgotPasswordError('Failed to send password reset email. Please try again later.');
            setForgotPasswordLoading(false);
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
            newErrors.email = 'Please enter a valid email address';
        } else if (formData.email.trim().length > 100) {
            newErrors.email = 'Email address is too long';
        }
        
        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        } else if (formData.password.length > 50) {
            newErrors.password = 'Password is too long (maximum 50 characters)';
        } else if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(formData.password)) {
            newErrors.password = 'Password must contain at least one letter and one number';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        const result = await login(formData.email, formData.password);
        
        if (result.success) {
            setSuccessMessage('Login successful! Redirecting...');
            setError(''); // Clear any previous errors
            
            // Check for pending product from Buy Now
            const pendingProduct = localStorage.getItem('pendingProduct');
            const pendingCartCheckout = localStorage.getItem('pendingCartCheckout');
            
            setTimeout(() => {
                if (pendingProduct) {
                    // Clear the pending product
                    localStorage.removeItem('pendingProduct');
                    
                    // Redirect to products page to trigger Buy Now modal
                    navigate('/products');
                    
                    // Show a small delay before triggering Buy Now
                    setTimeout(() => {
                        const product = JSON.parse(pendingProduct);
                        // This will be handled by the ProductsPage component
                        window.dispatchEvent(new CustomEvent('triggerBuyNow', { detail: product }));
                    }, 500);
                } else if (pendingCartCheckout) {
                    // Clear the pending cart checkout
                    localStorage.removeItem('pendingCartCheckout');
                    
                    // Redirect to cart page to proceed with checkout
                    navigate('/cart');
                } else {
                    navigate('/');
                }
            }, 1500);
        } else {
            setError(result.error || 'Login failed. Please try again.');
            setSuccessMessage(''); // Clear any previous success message
        }
    };

    return (
        <LoginContainer>
            <BackButton to="/">
                <i className="fas fa-arrow-left"></i>
                Back to Home
            </BackButton>
            <LoginCard>
                <LoginHeader>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌻</div>
                    <LoginTitle>Welcome Back</LoginTitle>
                    <LoginSubtitle>Login to your Twisty Tales account</LoginSubtitle>
                    {pendingProduct && (
                        <div style={{
                            background: '#fff3cd',
                            color: '#856404',
                            padding: '0.8rem',
                            borderRadius: '8px',
                            marginTop: '1rem',
                            fontSize: '0.9rem',
                            border: '1px solid #ffeaa7'
                        }}>
                            🛒 Login to purchase {pendingProduct.name}
                        </div>
                    )}
                </LoginHeader>
                
                {successMessage && (
                    <div style={{
                        background: '#d4edda',
                        color: '#155724',
                        padding: '0.8rem',
                        borderRadius: '8px',
                        marginBottom: '1rem',
                        textAlign: 'center',
                        border: '1px solid #c3e6cb'
                    }}>
                        {successMessage}
                    </div>
                )}
                
                <LoginForm onSubmit={handleSubmit}>
                    <FormGroup>
                        <FormLabel>Email Address</FormLabel>
                        <FormInput
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className={errors.email ? 'error' : ''}
                            disabled={isLoading}
                        />
                        {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
                    </FormGroup>
                    
                    <FormGroup>
                        <FormLabel>Password</FormLabel>
                        <FormInput
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className={errors.password ? 'error' : ''}
                            disabled={isLoading}
                        />
                        {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
                        <ForgotPasswordLink 
                            type="button" 
                            onClick={() => setShowForgotPassword(true)}
                            disabled={isLoading}
                        >
                            Forgot Password?
                        </ForgotPasswordLink>
                    </FormGroup>
                    
                    {error && <ErrorMessage style={{ textAlign: 'center' }}>{error}</ErrorMessage>}
                    
                    <SubmitButton type="submit" disabled={isLoading}>
                        {isLoading && <LoadingSpinner />}
                        {isLoading ? 'Logging in...' : 'Login'}
                    </SubmitButton>
                </LoginForm>
                
                <Divider>
                    <span>OR</span>
                </Divider>
                
                <RegisterLink>
                    Don't have an account? <Link to="/register">Register here</Link>
                </RegisterLink>
            </LoginCard>
            
            {/* Forgot Password Modal */}
            {showForgotPassword && (
                <ModalOverlay onClick={() => setShowForgotPassword(false)}>
                    <ForgotPasswordModal onClick={(e) => e.stopPropagation()}>
                        <ModalTitle>🔐 Forgot Password</ModalTitle>
                        <ModalMessage>
                            Enter your email address and we'll send you a link to reset your password.
                        </ModalMessage>
                        
                        <FormGroup>
                            <FormLabel>Email Address</FormLabel>
                            <FormInput
                                type="email"
                                value={forgotPasswordEmail}
                                onChange={(e) => setForgotPasswordEmail(e.target.value)}
                                placeholder="Enter your email address"
                                className={forgotPasswordError ? 'error' : ''}
                                disabled={forgotPasswordLoading}
                            />
                            {forgotPasswordError && <ErrorMessage>{forgotPasswordError}</ErrorMessage>}
                        </FormGroup>
                        
                        {forgotPasswordSuccess && (
                            <div style={{
                                background: '#d4edda',
                                color: '#155724',
                                padding: '0.8rem',
                                borderRadius: '8px',
                                marginBottom: '1rem',
                                textAlign: 'center',
                                border: '1px solid #c3e6cb'
                            }}>
                                {forgotPasswordSuccess}
                            </div>
                        )}
                        
                        <ModalButton 
                            onClick={handleForgotPassword}
                            disabled={forgotPasswordLoading || forgotPasswordSuccess}
                        >
                            {forgotPasswordLoading && <LoadingSpinner />}
                            {forgotPasswordLoading ? 'Sending...' : 'Send Reset Link'}
                        </ModalButton>
                        
                        <CancelButton 
                            onClick={() => {
                                setShowForgotPassword(false);
                                setForgotPasswordEmail('');
                                setForgotPasswordError('');
                                setForgotPasswordSuccess('');
                            }}
                            disabled={forgotPasswordLoading}
                        >
                            Cancel
                        </CancelButton>
                    </ForgotPasswordModal>
                </ModalOverlay>
            )}
        </LoginContainer>
    );
};

export default LoginPage;
