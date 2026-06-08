import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunks for authentication operations
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check for admin credentials first
      if (email === 'admin@twistytales.com' && password === 'admin123') {
        const adminUser = { id: 1, name: 'Admin User', email, role: 'admin', avatar: '🌻' };
        localStorage.setItem('user', JSON.stringify(adminUser));
        return adminUser;
      }

      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const user = registeredUsers.find(u => u.email === email);

      if (!user) {
        throw new Error('No account found with this email. Please register first.');
      }
      if (user.password !== password) {
        throw new Error('Incorrect password. Please try again.');
      }

      const { password: _, ...userWithoutPassword } = user;
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      return userWithoutPassword;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ name, email, password, phone }, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      
      if (registeredUsers.some(u => u.email === email)) {
        throw new Error('User with this email already exists');
      }
      
      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password,
        phone: phone || '',
        avatar: '👤',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      registeredUsers.push(newUser);
      localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
      
      const { password: _, ...userWithoutPassword } = newUser;
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      
      return userWithoutPassword;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (userData, { getState, rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const { auth } = getState();
      const currentUser = auth.user;
      
      if (!currentUser) {
        throw new Error('No user logged in');
      }
      
      const updatedUser = {
        ...currentUser,
        ...userData,
        updatedAt: new Date().toISOString()
      };
      
      // Update in localStorage
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const userIndex = registeredUsers.findIndex(u => u.email === currentUser.email);
      
      if (userIndex !== -1) {
        registeredUsers[userIndex] = {
          ...registeredUsers[userIndex],
          ...userData,
          updatedAt: new Date().toISOString()
        };
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
      }
      
      return updatedUser;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updatePassword = createAsyncThunk(
  'auth/updatePassword',
  async ({ currentPassword, newPassword }, { getState, rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const { auth } = getState();
      const currentUser = auth.user;
      
      if (!currentUser) {
        throw new Error('No user logged in');
      }
      
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const userIndex = registeredUsers.findIndex(u => u.email === currentUser.email);
      
      if (userIndex === -1) {
        throw new Error('User not found');
      }
      
      if (registeredUsers[userIndex].password !== currentPassword) {
        throw new Error('Current password is incorrect');
      }
      
      registeredUsers[userIndex].password = newPassword;
      registeredUsers[userIndex].updatedAt = new Date().toISOString();
      localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
      
      return { success: true };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const uploadProfilePhoto = createAsyncThunk(
  'auth/uploadProfilePhoto',
  async (photoData, { getState, rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const { auth } = getState();
      const currentUser = auth.user;
      
      if (!currentUser) {
        throw new Error('No user logged in');
      }
      
      const updatedUser = {
        ...currentUser,
        profilePhoto: photoData,
        updatedAt: new Date().toISOString()
      };
      
      // Update in localStorage
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const userIndex = registeredUsers.findIndex(u => u.email === currentUser.email);
      
      if (userIndex !== -1) {
        registeredUsers[userIndex] = {
          ...registeredUsers[userIndex],
          profilePhoto: photoData,
          updatedAt: new Date().toISOString()
        };
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
      }
      
      return updatedUser;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  isLoading: false,
  error: null,
  isAuthenticated: !!JSON.parse(localStorage.getItem('user') || 'null')
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isLoading = false;
      state.error = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
    },
    clearError: (state) => {
      state.error = null;
    },
    setUserFromStorage: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update Password
      .addCase(updatePassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Upload Profile Photo
      .addCase(uploadProfilePhoto.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(uploadProfilePhoto.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(uploadProfilePhoto.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError, setUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
