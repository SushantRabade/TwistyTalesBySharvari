import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Cart Context
const CartContext = createContext();

// Initial state
const initialState = {
    items: [],
    totalItems: 0,
    totalPrice: 0,
    isOpen: false,
    checkoutItem: null,
    checkoutStep: 1, // 1: quantity, 2: address, 3: payment
    selectedAddress: null,
    selectedPayment: null,
    orderQuantity: 1
};

// Action types
const CART_ACTIONS = {
    ADD_TO_CART: 'ADD_TO_CART',
    REMOVE_FROM_CART: 'REMOVE_FROM_CART',
    UPDATE_QUANTITY: 'UPDATE_QUANTITY',
    CLEAR_CART: 'CLEAR_CART',
    TOGGLE_CART: 'TOGGLE_CART',
    SET_CHECKOUT_ITEM: 'SET_CHECKOUT_ITEM',
    SET_CHECKOUT_STEP: 'SET_CHECKOUT_STEP',
    SET_ORDER_QUANTITY: 'SET_ORDER_QUANTITY',
    SET_SELECTED_ADDRESS: 'SET_SELECTED_ADDRESS',
    SET_SELECTED_PAYMENT: 'SET_SELECTED_PAYMENT',
    COMPLETE_CHECKOUT: 'COMPLETE_CHECKOUT',
    SET_INITIAL_CART: 'SET_INITIAL_CART'
};

// Reducer function
const cartReducer = (state, action) => {
    switch (action.type) {
        case CART_ACTIONS.ADD_TO_CART: {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            
            if (existingItem) {
                const updatedItems = state.items.map(item =>
                    item.id === action.payload.id
                        ? { ...item, quantity: item.quantity + action.payload.quantity }
                        : item
                );
                
                return {
                    ...state,
                    items: updatedItems,
                    totalItems: state.totalItems + action.payload.quantity,
                    totalPrice: state.totalPrice + (action.payload.price * action.payload.quantity)
                };
            } else {
                return {
                    ...state,
                    items: [...state.items, action.payload],
                    totalItems: state.totalItems + action.payload.quantity,
                    totalPrice: state.totalPrice + (action.payload.price * action.payload.quantity)
                };
            }
        }
        
        case CART_ACTIONS.SET_INITIAL_CART: {
            return {
                ...state,
                items: action.payload.items || [],
                totalItems: action.payload.totalItems || 0,
                totalPrice: action.payload.totalPrice || 0
            };
        }
        
        case CART_ACTIONS.REMOVE_FROM_CART: {
            const itemToRemove = state.items.find(item => item.id === action.payload);
            const updatedItems = state.items.filter(item => item.id !== action.payload);
            
            return {
                ...state,
                items: updatedItems,
                totalItems: state.totalItems - itemToRemove.quantity,
                totalPrice: state.totalPrice - (itemToRemove.price * itemToRemove.quantity)
            };
        }
        
        case CART_ACTIONS.UPDATE_QUANTITY: {
            const { id, quantity } = action.payload;
            const item = state.items.find(item => item.id === id);
            const oldQuantity = item.quantity;
            const updatedItems = state.items.map(item =>
                item.id === id ? { ...item, quantity } : item
            );
            
            return {
                ...state,
                items: updatedItems,
                totalItems: state.totalItems - oldQuantity + quantity,
                totalPrice: state.totalPrice - (item.price * oldQuantity) + (item.price * quantity)
            };
        }
        
        case CART_ACTIONS.CLEAR_CART:
            return {
                ...state,
                items: [],
                totalItems: 0,
                totalPrice: 0
            };
        
        case CART_ACTIONS.TOGGLE_CART:
            return {
                ...state,
                isOpen: !state.isOpen
            };
        
        case CART_ACTIONS.SET_CHECKOUT_ITEM:
            return {
                ...state,
                checkoutItem: action.payload,
                checkoutStep: 1,
                orderQuantity: 1,
                selectedAddress: null,
                selectedPayment: null
            };
        
        case CART_ACTIONS.SET_CHECKOUT_STEP:
            return {
                ...state,
                checkoutStep: action.payload
            };
        
        case CART_ACTIONS.SET_ORDER_QUANTITY:
            return {
                ...state,
                orderQuantity: action.payload
            };
        
        case CART_ACTIONS.SET_SELECTED_ADDRESS:
            return {
                ...state,
                selectedAddress: action.payload
            };
        
        case CART_ACTIONS.SET_SELECTED_PAYMENT:
            return {
                ...state,
                selectedPayment: action.payload
            };
        
        case CART_ACTIONS.COMPLETE_CHECKOUT:
            return {
                ...state,
                checkoutItem: null,
                checkoutStep: 1,
                orderQuantity: 1,
                selectedAddress: null,
                selectedPayment: null
            };
        
        default:
            return state;
    }
};

// Cart Provider Component
export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    // Load cart from localStorage on mount
    useEffect(() => {
        console.log('CartProvider - Loading cart from localStorage...');
        const savedCart = localStorage.getItem('cart');
        console.log('CartProvider - savedCart:', savedCart);
        
        if (savedCart) {
            try {
                const parsedCart = JSON.parse(savedCart);
                console.log('CartProvider - parsedCart:', parsedCart);
                dispatch({ type: CART_ACTIONS.SET_INITIAL_CART, payload: parsedCart });
            } catch (error) {
                console.error('Error loading cart from localStorage:', error);
            }
        } else {
            console.log('CartProvider - No saved cart found, using initial state');
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify({
            items: state.items,
            totalItems: state.totalItems,
            totalPrice: state.totalPrice
        }));
    }, [state.items, state.totalItems, state.totalPrice]);

    // Action creators
    const addToCart = (product, quantity = 1) => {
        dispatch({
            type: CART_ACTIONS.ADD_TO_CART,
            payload: { ...product, quantity }
        });
    };

    const removeFromCart = (productId) => {
        dispatch({
            type: CART_ACTIONS.REMOVE_FROM_CART,
            payload: productId
        });
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            dispatch({
                type: CART_ACTIONS.UPDATE_QUANTITY,
                payload: { id: productId, quantity }
            });
        }
    };

    const clearCart = () => {
        dispatch({ type: CART_ACTIONS.CLEAR_CART });
    };

    const toggleCart = () => {
        dispatch({ type: CART_ACTIONS.TOGGLE_CART });
    };

    const startCheckout = (product) => {
        dispatch({
            type: CART_ACTIONS.SET_CHECKOUT_ITEM,
            payload: product
        });
    };

    const setCheckoutStep = (step) => {
        dispatch({
            type: CART_ACTIONS.SET_CHECKOUT_STEP,
            payload: step
        });
    };

    const setOrderQuantity = (quantity) => {
        dispatch({
            type: CART_ACTIONS.SET_ORDER_QUANTITY,
            payload: quantity
        });
    };

    const setSelectedAddress = (address) => {
        dispatch({
            type: CART_ACTIONS.SET_SELECTED_ADDRESS,
            payload: address
        });
    };

    const setSelectedPayment = (payment) => {
        dispatch({
            type: CART_ACTIONS.SET_SELECTED_PAYMENT,
            payload: payment
        });
    };

    const completeCheckout = () => {
        dispatch({ type: CART_ACTIONS.COMPLETE_CHECKOUT });
    };

    const value = {
        ...state,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleCart,
        startCheckout,
        setCheckoutStep,
        setOrderQuantity,
        setSelectedAddress,
        setSelectedPayment,
        completeCheckout
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to use cart context
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export default CartContext;
