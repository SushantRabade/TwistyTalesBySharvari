import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser, updateProfile, updatePassword, uploadProfilePhoto, logout, clearError } from '../store/authSlice';
import { addItem, removeItem, updateQuantity, clearCart, clearError as clearCartError, loadCartFromStorage } from '../store/cartSlice';

// Auth hooks
export const useAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  
  return {
    ...auth,
    login: (credentials) => dispatch(loginUser(credentials)),
    register: (userData) => dispatch(registerUser(userData)),
    logout: () => dispatch(logout()),
    updateProfile: (userData) => dispatch(updateProfile(userData)),
    updatePassword: (passwordData) => dispatch(updatePassword(passwordData)),
    uploadProfilePhoto: (photoData) => dispatch(uploadProfilePhoto(photoData)),
    clearError: () => dispatch(clearError())
  };
};

// Cart hooks
export const useCart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  
  return {
    ...cart,
    addItem: (product, quantity) => dispatch(addItem({ product, quantity })),
    removeItem: (itemId) => dispatch(removeItem(itemId)),
    updateQuantity: (itemId, quantity) => dispatch(updateQuantity({ itemId, quantity })),
    clearCart: () => dispatch(clearCart()),
    clearError: () => dispatch(clearCartError()),
    loadCart: () => dispatch(loadCartFromStorage())
  };
};

// Selector hooks for specific data
export const useCurrentUser = () => {
  return useSelector(state => state.auth.user);
};

export const useIsAuthenticated = () => {
  return useSelector(state => state.auth.isAuthenticated);
};

export const useCartItems = () => {
  return useSelector(state => state.cart.items);
};

export const useCartTotals = () => {
  return useSelector(state => ({
    totalItems: state.cart.totalItems,
    totalPrice: state.cart.totalPrice
  }));
};
