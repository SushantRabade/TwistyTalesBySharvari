import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggleContainer = styled.div`
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
    background: ${props => props.isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
    backdrop-filter: blur(10px);
    border-radius: 50px;
    padding: 8px;
    border: 1px solid ${props => props.isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'};
    transition: all 0.3s ease;
`;

const ToggleButton = styled.button`
    background: ${props => props.isDarkMode ? '#4a5568' : '#f7fafc'};
    border: none;
    border-radius: 50px;
    padding: 12px 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
    transition: all 0.3s ease;
    box-shadow: ${props => props.isDarkMode ? '0 4px 15px rgba(0, 0, 0, 0.3)' : '0 4px 15px rgba(0, 0, 0, 0.1)'};

    &:hover {
        transform: translateY(-2px);
        box-shadow: ${props => props.isDarkMode ? '0 6px 20px rgba(0, 0, 0, 0.4)' : '0 6px 20px rgba(0, 0, 0, 0.15)'};
    }

    &:active {
        transform: translateY(0);
    }
`;

const ThemeIcon = styled.span`
    font-size: 20px;
    transition: all 0.3s ease;
`;

const ThemeLabel = styled.span`
    font-weight: 600;
    color: ${props => props.isDarkMode ? '#e2e8f0' : '#2d3748'};
    font-size: 14px;
`;

const ThemeToggle = () => {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <ThemeToggleContainer isDarkMode={isDarkMode}>
            <ToggleButton isDarkMode={isDarkMode} onClick={toggleTheme}>
                <ThemeIcon>
                    {isDarkMode ? '🌙' : '☀️'}
                </ThemeIcon>
                <ThemeLabel isDarkMode={isDarkMode}>
                    {isDarkMode ? 'Dark' : 'Light'}
                </ThemeLabel>
            </ToggleButton>
        </ThemeToggleContainer>
    );
};

export default ThemeToggle;
