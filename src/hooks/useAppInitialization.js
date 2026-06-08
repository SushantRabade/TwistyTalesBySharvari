import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { loadCartFromStorage } from '../store/cartSlice'
import { setUserFromStorage } from '../store/authSlice'

export const useAppInitialization = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    // Load cart data from localStorage on app start
    dispatch(loadCartFromStorage());
    
    // Load user data from localStorage on app start
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        dispatch(setUserFromStorage(user));
      } catch (error) {
        console.error('Failed to parse user data:', error);
        localStorage.removeItem('user');
      }
    }
  }, [dispatch]);
};
