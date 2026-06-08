import React, { useState, useEffect } from 'react'
import { useAuth } from '../../hooks/reduxHooks'
import styled from '@emotion/styled'
import { Link, useNavigate } from 'react-router-dom'

// Styled Components (reusing from Login)
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

const RegisterContainer = styled.div`
    min-height: calc(100vh - 90px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const RegisterCard = styled.div`
    background: white;
    border-radius: 20px;
    padding: 1rem;
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

const RegisterHeader = styled.div`
    text-align: center;
    margin-bottom: 0.8rem;
`;

const RegisterTitle = styled.h2`
    font-size: 2rem;
    margin-bottom: 0.3rem;
    color: #333;
    font-family: 'Dancing Script', cursive;
`;

const RegisterSubtitle = styled.p`
    color: #666;
    font-size: 1rem;
`;

const RegisterForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    margin-bottom: 0.6rem;
`;

const FormLabel = styled.label`
    font-weight: 600;
    color: #333;
    font-size: 0.9rem;
`;

const FormInput = styled.input`
    padding: 0.6rem;
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

const FormTextarea = styled.textarea`
    padding: 0.6rem;
    border: 2px solid #e1e8ed;
    border-radius: 10px;
    font-size: 1rem;
    font-family: 'Poppins', sans-serif;
    resize: vertical;
    min-height: 80px;
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

const PasswordRequirements = styled.div`
    font-size: 0.75rem;
    color: #666;
    margin-top: 0.25rem;
    
    .requirement {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        margin-top: 0.25rem;
        
        &.met {
            color: #4ecdc4;
        }
        
        &.not-met {
            color: #ff6b6b;
        }
    }
`;

const SubmitButton = styled.button`
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
    color: white;
    border: none;
    padding: 0.6rem;
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

const LoginLink = styled.p`
    text-align: center;
    margin-top: 1.5rem;
    color: #666;
    
    a {
        color: #4ecdc4;
        text-decoration: none;
        font-weight: 600;
        
        &:hover {
            text-decoration: underline;
        }
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

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');
    const [pendingProduct, setPendingProduct] = useState(null);
    const { register } = useAuth();
    const navigate = useNavigate();

    // Check for pending product on mount
    useEffect(() => {
        const pending = localStorage.getItem('pendingProduct');
        if (pending) {
            setPendingProduct(JSON.parse(pending));
        }
    }, []);

    const validateForm = () => {
        const newErrors = {};
        
        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        } else if (formData.name.trim().length > 50) {
            newErrors.name = 'Name must be less than 50 characters';
        } else if (!/^[a-zA-Z\s]+$/.test(formData.name.trim())) {
            newErrors.name = 'Name should only contain letters and spaces';
        }
        
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
        } else if (!/(?=.*[!@#$%^&*])/.test(formData.password)) {
            newErrors.password = 'Password must contain at least one special character (!@#$%^&*)';
        }
        
        // Confirm password validation
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const getPasswordRequirements = () => {
        const requirements = [
            { text: 'At least 6 characters', met: formData.password.length >= 6 },
            { text: 'Contains letters', met: /[a-zA-Z]/.test(formData.password) },
            { text: 'Contains numbers', met: /\d/.test(formData.password) }
        ];
        
        return requirements;
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
        
        const result = await register(
            formData.name,
            formData.email,
            formData.password,
            formData.confirmPassword
        );
        
        if (result.success) {
            setSuccessMessage('Registration successful! Redirecting...');
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
            setError(result.error || 'Registration failed. Please try again.');
            setSuccessMessage(''); // Clear any previous success message
        }
    };

    const passwordRequirements = getPasswordRequirements();

    return (
        <RegisterContainer>
            <BackButton to="/">
                <i className="fas fa-arrow-left"></i>
                Back to Home
            </BackButton>
            <RegisterCard>
                <RegisterHeader>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌸</div>
                    <RegisterTitle>Create Account</RegisterTitle>
                    <RegisterSubtitle>Join the Twisty Tales family</RegisterSubtitle>
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
                            🛒 Complete registration to purchase {pendingProduct.name}
                        </div>
                    )}
                </RegisterHeader>
                
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
                
                <RegisterForm onSubmit={handleSubmit}>
                    <FormGroup>
                        <FormLabel>Full Name</FormLabel>
                        <FormInput
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            className={errors.name ? 'error' : ''}
                            disabled={isLoading}
                        />
                        {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
                    </FormGroup>
                    
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
                            placeholder="Create a password"
                            className={errors.password ? 'error' : ''}
                            disabled={isLoading}
                        />
                        {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
                        {formData.password && (
                            <PasswordRequirements>
                                {passwordRequirements.map((req, index) => (
                                    <div 
                                        key={index} 
                                        className={`requirement ${req.met ? 'met' : 'not-met'}`}
                                    >
                                        {req.met ? '✓' : '○'} {req.text}
                                    </div>
                                ))}
                            </PasswordRequirements>
                        )}
                    </FormGroup>
                    
                    <FormGroup>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormInput
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm your password"
                            className={errors.confirmPassword ? 'error' : ''}
                            disabled={isLoading}
                        />
                        {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword}</ErrorMessage>}
                    </FormGroup>
                    
                    {error && <ErrorMessage style={{ textAlign: 'center' }}>{error}</ErrorMessage>}
                    
                    <SubmitButton type="submit" disabled={isLoading}>
                        {isLoading && <LoadingSpinner />}
                        {isLoading ? 'Creating Account...' : 'Create Account'}
                    </SubmitButton>
                </RegisterForm>
                
                <Divider>
                    <span>OR</span>
                </Divider>
                
                <LoginLink>
                    Already have an account? <Link to="/login">Login here</Link>
                </LoginLink>
            </RegisterCard>
        </RegisterContainer>
    );
};

export default RegisterPage;
