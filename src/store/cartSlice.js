import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunks for cart operations
export const loadCartFromStorage = createAsyncThunk(
  'cart/loadFromStorage',
  async (_, { rejectWithValue }) => {
    try {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      return rejectWithValue('Failed to load cart from storage');
    }
  }
);

export const saveCartToStorage = createAsyncThunk(
  'cart/saveToStorage',
  async (cartItems, { rejectWithValue }) => {
    try {
      localStorage.setItem('cart', JSON.stringify(cartItems));
      return cartItems;
    } catch (error) {
      return rejectWithValue('Failed to save cart to storage');
    }
  }
);

const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  isLoading: false,
  error: null
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { product, quantity = 1 } = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          ...product,
          quantity,
          addedAt: new Date().toISOString()
        });
      }
      
      // Update totals
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalPrice = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
      
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter(item => item.id !== itemId);
      
      // Update totals
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalPrice = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
      
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    
    updateQuantity: (state, action) => {
      const { itemId, quantity } = action.payload;
      const item = state.items.find(item => item.id === itemId);
      
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(item => item.id !== itemId);
        } else {
          item.quantity = quantity;
        }
        
        // Update totals
        state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
        state.totalPrice = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
        
        // Save to localStorage
        localStorage.setItem('cart', JSON.stringify(state.items));
      }
    },
    
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
      localStorage.removeItem('cart');
    },
    
    setCart: (state, action) => {
      state.items = action.payload;
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalPrice = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Load from storage
      .addCase(loadCartFromStorage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadCartFromStorage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
        state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
        state.totalPrice = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
        state.error = null;
      })
      .addCase(loadCartFromStorage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Save to storage
      .addCase(saveCartToStorage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(saveCartToStorage.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(saveCartToStorage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { addItem, removeItem, updateQuantity, clearCart, setCart, clearError } = cartSlice.actions;
export default cartSlice.reducer;
