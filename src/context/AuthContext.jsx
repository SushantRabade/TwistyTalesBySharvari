import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Check if user is logged in on app start
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            setIsLoading(true);
            setError(null);
            
            // Simulate API call (replace with actual API)
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Get registered users from localStorage
            const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
            
            // Check for admin credentials first
            if (email === 'admin@twistytales.com' && password === 'admin123') {
                const userData = {
                    id: 1,
                    name: 'Admin User',
                    email: email,
                    role: 'admin',
                    avatar: '🌻'
                };
                setUser(userData);
                localStorage.setItem('user', JSON.stringify(userData));
                return { success: true };
            }
            
            // Check if user exists in registered users
            const registeredUser = registeredUsers.find(u => u.email === email);
            
            if (!registeredUser) {
                throw new Error('No account found with this email. Please register first.');
            }
            
            if (registeredUser.password !== password) {
                throw new Error('Incorrect password. Please try again.');
            }
            
            // Login successful - remove password from user data for security
            const { password: _, ...userData } = registeredUser;
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            return { success: true };
            
        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (name, email, password, confirmPassword) => {
        try {
            setIsLoading(true);
            setError(null);
            
            // Validate inputs
            if (!name || !email || !password) {
                throw new Error('All fields are required');
            }
            
            if (password !== confirmPassword) {
                throw new Error('Passwords do not match');
            }
            
            if (password.length < 6) {
                throw new Error('Password must be at least 6 characters');
            }
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Get existing registered users
            const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
            
            // Check if email already exists
            const existingUser = registeredUsers.find(u => u.email === email);
            if (existingUser) {
                throw new Error('An account with this email already exists. Please use a different email.');
            }
            
            // Create new user
            const newUser = {
                id: Date.now(),
                name: name,
                email: email,
                password: password, // In production, this should be hashed
                role: 'user',
                avatar: '👤',
                createdAt: new Date().toISOString()
            };
            
            // Store user in registered users database
            registeredUsers.push(newUser);
            localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
            
            // Auto-login after successful registration
            const { password: _, ...userData } = newUser;
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            
            return { success: true };
        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        setError(null);
    };

    const updateProfile = async (userData) => {
        try {
            setIsLoading(true);
            setError(null);
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const updatedUser = {
                ...user,
                ...userData,
                updatedAt: new Date().toISOString()
            };
            
            // Update user in localStorage
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
            
            // Update user in registered users database
            const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
            const userIndex = registeredUsers.findIndex(u => u.email === user.email);
            if (userIndex !== -1) {
                registeredUsers[userIndex] = {
                    ...registeredUsers[userIndex],
                    ...userData,
                    updatedAt: new Date().toISOString()
                };
                localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
            }
            
            return { success: true };
        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setIsLoading(false);
        }
    };

    const updatePassword = async (currentPassword, newPassword) => {
        try {
            setIsLoading(true);
            setError(null);
            
            // Validate inputs
            if (!currentPassword || !newPassword) {
                throw new Error('Both current and new passwords are required');
            }
            
            if (newPassword.length < 6) {
                throw new Error('New password must be at least 6 characters');
            }
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Get registered users
            const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
            const userIndex = registeredUsers.findIndex(u => u.email === user.email);
            
            if (userIndex === -1) {
                throw new Error('User not found');
            }
            
            // Verify current password
            if (registeredUsers[userIndex].password !== currentPassword) {
                throw new Error('Current password is incorrect');
            }
            
            // Update password
            registeredUsers[userIndex].password = newPassword;
            registeredUsers[userIndex].updatedAt = new Date().toISOString();
            localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
            
            return { success: true };
        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setIsLoading(false);
        }
    };

    const uploadProfilePhoto = async (photoData) => {
        try {
            setIsLoading(true);
            setError(null);
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            const updatedUser = {
                ...user,
                profilePhoto: photoData,
                updatedAt: new Date().toISOString()
            };
            
            // Update user in localStorage
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
            
            // Update user in registered users database
            const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
            const userIndex = registeredUsers.findIndex(u => u.email === user.email);
            if (userIndex !== -1) {
                registeredUsers[userIndex] = {
                    ...registeredUsers[userIndex],
                    profilePhoto: photoData,
                    updatedAt: new Date().toISOString()
                };
                localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
            }
            
            return { success: true };
        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setIsLoading(false);
        }
    };

    const value = {
        user,
        isLoading,
        error,
        login,
        register,
        logout,
        updateProfile,
        updatePassword,
        uploadProfilePhoto,
        isAuthenticated: !!user
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
