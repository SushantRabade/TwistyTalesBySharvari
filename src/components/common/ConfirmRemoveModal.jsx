import React from 'react'
import styled from '@emotion/styled'

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
    animation: fadeIn 0.3s ease;
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;

const ConfirmModal = styled.div`
    background: white;
    border-radius: 16px;
    padding: 2rem;
    max-width: 400px;
    width: 100%;
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

const ModalIcon = styled.div`
    font-size: 3rem;
    margin-bottom: 1rem;
`;

const ModalTitle = styled.h2`
    color: #333;
    margin-bottom: 1rem;
    font-size: 1.5rem;
`;

const ModalMessage = styled.p`
    color: #666;
    margin-bottom: 1.5rem;
    line-height: 1.5;
`;

const ModalActions = styled.div`
    display: flex;
    gap: 1rem;
    justify-content: center;
`;

const ConfirmButton = styled.button`
    padding: 0.8rem 1.5rem;
    background: linear-gradient(45deg, #ff6b6b, #ff8e53);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(255, 107, 107, 0.3);
    }
`;

const CancelButton = styled.button`
    padding: 0.8rem 1.5rem;
    background: #f8f9fa;
    color: #666;
    border: 1px solid #dee2e6;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
        background: #e9ecef;
    }
`;

const ConfirmRemoveModal = ({ isOpen, onClose, onConfirm, itemName }) => {
    if (!isOpen) return null;

    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    const handleCancel = () => {
        onClose();
    };

    return (
        <ModalOverlay onClick={onClose}>
            <ConfirmModal onClick={(e) => e.stopPropagation()}>
                <ModalIcon>🗑️</ModalIcon>
                <ModalTitle>Remove Item</ModalTitle>
                <ModalMessage>
                    Are you sure you want to remove <strong>{itemName}</strong> from your cart?
                </ModalMessage>
                <ModalActions>
                    <CancelButton onClick={handleCancel}>
                        Cancel
                    </CancelButton>
                    <ConfirmButton onClick={handleConfirm}>
                        Remove Item
                    </ConfirmButton>
                </ModalActions>
            </ConfirmModal>
        </ModalOverlay>
    );
};

export default ConfirmRemoveModal;
