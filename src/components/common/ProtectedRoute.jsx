import React from 'react';
import { useIsAuthenticated } from '../../hooks/reduxHooks';
import { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';

const LoadingContainer = styled.div`
    min-height: calc(100vh - 90px);
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
`;

const LoadingSpinner = styled.div`
    width: 50px;
    height: 50px;
    border: 4px solid #e1e8ed;
    border-top: 4px solid #4ecdc4;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = useIsAuthenticated();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => { setIsLoading(false); }, []);
    const location = useLocation();

    if (isLoading) {
        return (
            <LoadingContainer>
                <LoadingSpinner />
            </LoadingContainer>
        );
    }

    if (!isAuthenticated) {
        // Redirect to login with return url
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;
