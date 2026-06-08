import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useNavigate, useSearchParams } from 'react-router-dom';

const ResetContainer = styled.div`
    min-height: calc(100vh - 90px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const ResetCard = styled.div`
    background: white;
    border-radius: 20px;
    padding: 2rem;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
`;

const ResetHeader = styled.div`
    text-align: center;
    margin-bottom: 2rem;
`;

const ResetTitle = styled.h1`
    color: #333;
    margin-bottom: 0.5rem;
    font-size: 1.8rem;
`;

const ResetSubtitle = styled.p`
    color: #666;
    margin-bottom: 2rem;
    line-height: 1.5;
`;

const FormGroup = styled.div`
    margin-bottom: 1.5rem;
`;

const FormLabel = styled.label`
    display: block;
    margin-bottom: 0.5rem;
    color: #333;
    font-weight: 600;
`;

const FormInput = styled.input`
    width: 100%;
    padding: 1rem;
    border: 2px solid #e1e8ed;
    border-radius: 8px;
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

const ErrorMessage = styled.div`
    color: #ff6b6b;
    font-size: 0.9rem;
    margin-top: 0.5rem;
`;

const SuccessMessage = styled.div`
    color: #28a745;
    font-size: 0.9rem;
    margin-top: 0.5rem;
`;

const ResetButton = styled.button`
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

const BackLink = styled.div`
    text-align: center;
    margin-top: 1.5rem;
    
    a {
        color: #4ecdc4;
        text-decoration: none;
        font-weight: 600;
        
        &:hover {
            text-decoration: underline;
        }
    }
`;

const ResetPasswordPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');
    const [isValidToken, setIsValidToken] = useState(null);

    const token = searchParams.get('token');
    const email = searchParams.get('email');

    useEffect(() => {
        if (!token || !email) {
            setError('Invalid reset link. Please request a new password reset.');
            setIsValidToken(false);
            return;
        }

        // Verify token from localStorage
        const storedData = localStorage.getItem(`reset_${email}`);
        if (storedData) {
            const { token: storedToken, timestamp } = JSON.parse(storedData);
            
            // Check if token is valid (not expired - 1 hour)
            const oneHour = 60 * 60 * 1000;
            const isExpired = Date.now() - timestamp > oneHour;
            
            if (storedToken === token && !isExpired) {
                setIsValidToken(true);
                setError('');
            } else {
                setError('Reset link has expired or is invalid. Please request a new password reset.');
                setIsValidToken(false);
            }
        } else {
            setError('Invalid reset link. Please request a new password reset.');
            setIsValidToken(false);
        }
    }, [token, email]);

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        } else if (formData.password.length > 50) {
            newErrors.password = 'Password is too long (maximum 50 characters)';
        } else if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(formData.password)) {
            newErrors.password = 'Password must contain at least one letter and one number';
        }
        
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        setIsLoading(true);
        setError('');
        setSuccessMessage('');
        
        try {
            // Simulate API call to reset password
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // In a real app, you would update the password in your database
            // For demo purposes, we'll just show success message
            setSuccessMessage('Password has been reset successfully!');
            
            // Clear the reset token
            localStorage.removeItem(`reset_${email}`);
            
            // Redirect to login page after 2 seconds
            setTimeout(() => {
                navigate('/login');
            }, 2000);
            
        } catch (error) {
            setError('Failed to reset password. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear errors when user types
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    if (isValidToken === null) {
        return (
            <ResetContainer>
                <ResetCard>
                    <ResetHeader>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔐</div>
                        <ResetTitle>Verifying Reset Link...</ResetTitle>
                        <ResetSubtitle>Please wait while we verify your reset link.</ResetSubtitle>
                    </ResetHeader>
                </ResetCard>
            </ResetContainer>
        );
    }

    if (isValidToken === false) {
        return (
            <ResetContainer>
                <ResetCard>
                    <ResetHeader>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
                        <ResetTitle>Invalid Reset Link</ResetTitle>
                        <ResetSubtitle>{error}</ResetSubtitle>
                    </ResetHeader>
                    <BackLink>
                        <a href="/login">← Back to Login</a>
                    </BackLink>
                </ResetCard>
            </ResetContainer>
        );
    }

    return (
        <ResetContainer>
            <ResetCard>
                <ResetHeader>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔐</div>
                    <ResetTitle>Reset Password</ResetTitle>
                    <ResetSubtitle>Enter your new password below.</ResetSubtitle>
                </ResetHeader>
                
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
                
                <form onSubmit={handleSubmit}>
                    <FormGroup>
                        <FormLabel>New Password</FormLabel>
                        <FormInput
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your new password"
                            className={errors.password ? 'error' : ''}
                            disabled={isLoading}
                        />
                        {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
                    </FormGroup>
                    
                    <FormGroup>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormInput
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm your new password"
                            className={errors.confirmPassword ? 'error' : ''}
                            disabled={isLoading}
                        />
                        {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword}</ErrorMessage>}
                    </FormGroup>
                    
                    {error && <ErrorMessage style={{ textAlign: 'center' }}>{error}</ErrorMessage>}
                    
                    <ResetButton type="submit" disabled={isLoading}>
                        {isLoading ? 'Resetting...' : 'Reset Password'}
                    </ResetButton>
                </form>
                
                <BackLink>
                    <a href="/login">← Back to Login</a>
                </BackLink>
            </ResetCard>
        </ResetContainer>
    );
};

export default ResetPasswordPage;
