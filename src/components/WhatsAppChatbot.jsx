import React from 'react';
import styled from '@emotion/styled';

// WhatsApp Chatbot Component
const WhatsAppChatbot = () => {
    const handleWhatsAppClick = () => {
        const phoneNumber = '917218804545'; // Your WhatsApp number
        const message = encodeURIComponent('Hi! I\'m interested in your pipe cleaner flowers. Can you help me?');
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    };

    return (
        <WhatsAppContainer>
            <WhatsAppButton onClick={handleWhatsAppClick}>
                <WhatsAppIcon>
                    <i className="fab fa-whatsapp"></i>
                </WhatsAppIcon>
                <Tooltip className="tooltip">
                    Chat with us on WhatsApp!
                </Tooltip>
            </WhatsAppButton>
        </WhatsAppContainer>
    );
};

// Emotion Styled Components for WhatsApp Chatbot
const WhatsAppContainer = styled.div`
    position: fixed;
    bottom: 30px;
    right: 30px;
    z-index: 1000;

    @media (max-width: 768px) {
        bottom: 20px;
        right: 20px;
    }

    @media (max-width: 480px) {
        bottom: 15px;
        right: 15px;
    }
`;

const WhatsAppButton = styled.button`
    position: relative;
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, #25D366, #128C7E);
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 20px rgba(37, 211, 102, 0.3);
    transition: all 0.3s ease;
    animation: pulse 2s infinite;

    @media (max-width: 768px) {
        width: 55px;
        height: 55px;
    }

    @media (max-width: 480px) {
        width: 50px;
        height: 50px;
    }

    &:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 30px rgba(37, 211, 102, 0.4);
    }

    &:hover .tooltip {
        opacity: 1;
        visibility: visible;
    }

    &:active {
        transform: scale(0.95);
    }

    @keyframes pulse {
        0% {
            box-shadow: 0 4px 20px rgba(37, 211, 102, 0.3);
        }
        50% {
            box-shadow: 0 4px 30px rgba(37, 211, 102, 0.5);
        }
        100% {
            box-shadow: 0 4px 20px rgba(37, 211, 102, 0.3);
        }
    }
`;

const WhatsAppIcon = styled.div`
    color: white;
    font-size: 28px;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 768px) {
        font-size: 26px;
    }

    @media (max-width: 480px) {
        font-size: 24px;
    }
`;

const Tooltip = styled.div`
    position: absolute;
    right: 70px;
    top: 50%;
    transform: translateY(-50%);
    background: #333;
    color: white;
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 14px;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    pointer-events: none;

    @media (max-width: 768px) {
        right: 65px;
        font-size: 13px;
        padding: 6px 10px;
    }

    @media (max-width: 480px) {
        right: 60px;
        font-size: 12px;
        padding: 5px 8px;
    }

    &::after {
        content: '';
        position: absolute;
        left: 100%;
        top: 50%;
        transform: translateY(-50%);
        border: 6px solid transparent;
        border-left-color: #333;

        @media (max-width: 480px) {
            border-width: 5px;
        }
    }
`;

export default WhatsAppChatbot;
