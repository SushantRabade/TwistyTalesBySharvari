import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { 
  HomePage, 
  AboutPage, 
  GalleryPage, 
  ProductsPage, 
  ContactPage, 
  CartPage, 
  LoginPage, 
  RegisterPage, 
  ResetPasswordPage, 
  ProfilePage,
  Navigation,
  Footer,
  WhatsAppChatbot,
  ProtectedRoute
} from './components'
import { useAppInitialization } from './hooks/useAppInitialization'

const AppContent = () => {
  useAppInitialization()
  
  return (
    <div className="app">
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } 
        />
      </Routes>
      <Footer />
      <WhatsAppChatbot />
    </div>
  )
}

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
