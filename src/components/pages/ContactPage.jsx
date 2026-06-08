import React, { useState } from 'react'
import styled from '@emotion/styled'

// Emotion Styled Components for ContactPage
const ContactSection = styled.section`
    padding: 80px 0;
    background: white;
    width: 100%;
    min-height: 100vh;
    display: block;
`;

const ContactContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    width: 100%;
    display: block;
`;

const ContactTitle = styled.h2`
    text-align: center;
    font-size: 3rem;
    margin-bottom: 1rem;
    font-family: 'Dancing Script', cursive;
    color: #333;
    display: block;
`;

const ContactSubtitle = styled.p`
    text-align: center;
    font-size: 1.2rem;
    margin-bottom: 3rem;
    color: #666;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    display: block;
`;

const ContactContent = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    max-width: 1000px;
    margin: 0 auto;
    width: 100%;
    align-items: start;
`;

const ContactInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    width: 100%;
    height: 100%;
    justify-content: space-between;
`;

const ContactInfoTitle = styled.h3`
    font-size: 1.3rem;
    margin-bottom: 0.8rem;
    color: #333;
    display: block;
`;

const ContactItem = styled.div`
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 0.5rem;
    background: #f8f9fa;
    border-radius: 6px;
    transition: all 0.3s ease;
    flex: 1;
    min-height: 60px;

    &:hover {
        background: #e9ecef;
        transform: translateY(-2px);
    }
`;

const ContactIcon = styled.i`
    font-size: 1.2rem;
    color: #ff6b6b;
    width: 30px;
    text-align: center;
`;

const ContactItemContent = styled.div``;

const ContactItemTitle = styled.h4`
    font-size: 0.9rem;
    margin-bottom: 0.1rem;
    color: #333;
`;

const ContactItemText = styled.p`
    color: #666;
    font-size: 0.8rem;
`;

const ContactHours = styled.div`
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid #eee;
    background: #f8f9fa;
    padding: 1rem;
    border-radius: 8px;
`;

const ContactHoursTitle = styled.h4`
    color: #333;
    margin-bottom: 0.8rem;
    font-size: 1rem;
`;

const ContactHoursText = styled.p`
    color: #666;
    font-size: 0.85rem;
    margin: 0.3rem 0;
`;

const ContactForm = styled.div`
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    padding: 2.5rem;
    border-radius: 15px;
    width: 100%;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const ContactFormTitle = styled.h3`
    font-size: 1.7rem;
    margin-bottom: 1.5rem;
    color: #333;
    text-align: center;
`;

const FormGroup = styled.div`
    margin-bottom: 1.5rem;
`;

const FormLabel = styled.label`
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: #333;
    font-size: 0.9rem;
`;

const FormInput = styled.input`
    width: 100%;
    padding: 16px;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    background: white;
    transition: all 0.3s ease;
    box-sizing: border-box;

    &:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.2);
    }
`;

const FormSelect = styled.select`
    width: 100%;
    padding: 16px;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    background: white;
    transition: all 0.3s ease;
    box-sizing: border-box;

    &:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.2);
    }
`;

const FormTextarea = styled.textarea`
    width: 100%;
    padding: 16px;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-family: 'Poppins', sans-serif;
    resize: vertical;
    min-height: 120px;
    
    &:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(78, 205, 196, 0.1);
    }
    
    &.error {
        border: 2px solid #ff6b6b;
    }
`;

const ErrorMessage = styled.span`
    color: #ff6b6b;
    font-size: 0.8rem;
    margin-top: 0.5rem;
    display: block;
`;

const LoadingSpinner = styled.div`
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 2px solid #ffffff;
    border-radius: 50%;
    border-top-color: transparent;
    animation: spin 0.8s linear infinite;
    margin-right: 0.5rem;
    
    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
`;

const PaymentSection = styled.div`
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 2px solid #e9ecef;
`;

const PaymentTitle = styled.h4`
    text-align: center;
    color: #333;
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
`;

const PaymentButtons = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const PayPalButton = styled.button`
    width: 100%;
    padding: 14px;
    background: linear-gradient(135deg, #0070ba, #003087);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    &:hover {
        background: linear-gradient(135deg, #003087, #001c41);
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0, 112, 186, 0.3);
    }
`;

const ShopifyButton = styled.button`
    width: 100%;
    padding: 14px;
    background: linear-gradient(135deg, #95bf47, #5a8f2b);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    &:hover {
        background: linear-gradient(135deg, #5a8f2b, #3d5f1f);
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(149, 191, 71, 0.3);
    }
`;

const CODButton = styled.button`
    width: 100%;
    padding: 14px;
    background: linear-gradient(135deg, #28a745, #1e7e34);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    &:hover {
        background: linear-gradient(135deg, #1e7e34, #155724);
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(40, 167, 69, 0.3);
    }
`;

const SubmitButton = styled.button`
    width: 100%;
    padding: 16px;
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-sizing: border-box;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }
`;

const PaymentIcon = styled.i`
    font-size: 1.2rem;
`;

// ContactPage Component
const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        product: '',
        quantity: '1',
        price: '',
        paymentMethod: '',
        address: '',
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = () => {
        const newErrors = {};
        
        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        } else if (formData.name.trim().length > 50) {
            newErrors.name = 'Name must be less than 50 characters';
        } else if (!/^[a-zA-Z\s]+$/.test(formData.name.trim())) {
            newErrors.name = 'Name should only contain letters and spaces';
        }
        
        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        } else if (formData.email.length > 100) {
            newErrors.email = 'Email address is too long';
        }
        
        // Product validation
        if (!formData.product) {
            newErrors.product = 'Please select a product';
        }
        
        // Quantity validation
        if (!formData.quantity || formData.quantity < 1) {
            newErrors.quantity = 'Please select a valid quantity';
        } else if (formData.quantity > 10) {
            newErrors.quantity = 'Maximum quantity is 10 items per order';
        } else if (!Number.isInteger(Number(formData.quantity))) {
            newErrors.quantity = 'Quantity must be a whole number';
        }
        
        // Price validation
        if (!formData.price) {
            newErrors.price = 'Price is required';
        }
        
        // Address validation
        if (!formData.address.trim()) {
            newErrors.address = 'Delivery address is required';
        } else if (formData.address.trim().length < 15) {
            newErrors.address = 'Please enter a complete address (minimum 15 characters)';
        } else if (formData.address.trim().length > 200) {
            newErrors.address = 'Address is too long (maximum 200 characters)';
        } else if (!/[a-zA-Z0-9\s,.-]/.test(formData.address.trim())) {
            newErrors.address = 'Address contains invalid characters';
        }
        
        // Payment method validation
        if (!formData.paymentMethod) {
            newErrors.paymentMethod = 'Please select a payment method';
        }
        
        // Message validation (optional but with length limits)
        if (formData.message && formData.message.trim().length > 500) {
            newErrors.message = 'Message is too long (maximum 500 characters)';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        // Calculate price based on product and quantity
        let newFormData = { ...formData, [name]: value };
        
        if (name === 'product' || name === 'quantity') {
            const productPrices = {
                'mini': 15,
                'standard': 25,
                'large': 40,
                'custom': 50
            };
            
            const basePrice = productPrices[newFormData.product] || 0;
            const quantity = parseInt(newFormData.quantity) || 1;
            const totalPrice = basePrice * quantity;
            
            newFormData.price = `$${totalPrice}`;
        }
        
        setFormData(newFormData);
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handlePayment = (method) => {
        if (method === 'paypal') {
            // PayPal integration
            window.open('https://www.paypal.com/paypalme/twistytales', '_blank');
        } else if (method === 'shopify') {
            // Shopify integration
            window.open('https://shop.twistytales.com', '_blank');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        setIsSubmitting(true);
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            if (formData.paymentMethod === 'paypal' || formData.paymentMethod === 'shopify') {
                alert(`Please complete your payment using ${formData.paymentMethod === 'paypal' ? 'PayPal' : 'Shopify'} to confirm your order.`);
            } else {
                alert('Thank you for your order! We will contact you soon for cash on delivery.');
            }
            
            setFormData({ 
                name: '', 
                email: '', 
                product: '', 
                quantity: '1',
                price: '', 
                paymentMethod: '', 
                address: '',
                message: '' 
            });
            setErrors({});
        } catch (error) {
            alert('An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactInfo = [
        { icon: 'fas fa-envelope', title: 'Email', content: 'twistytales@example.com' },
        { icon: 'fab fa-instagram', title: 'Instagram', content: '@twistytales_by_sharvari' },
        { icon: 'fas fa-phone', title: 'Phone', content: '+91 98765 43210' },
        { icon: 'fas fa-map-marker-alt', title: 'Location', content: 'Mumbai, India' }
    ];

    return (
        <div className="contact-page">
            <ContactSection>
                <ContactContainer>
                    <ContactTitle>Get in Touch</ContactTitle>
                    <ContactSubtitle>Ready to order your custom pipe cleaner flowers? We'd love to hear from you!</ContactSubtitle>
                    <ContactContent>
                        <ContactInfo>
                            <ContactInfoTitle>Contact Information</ContactInfoTitle>
                            {contactInfo.map((info, index) => (
                                <ContactItem key={index}>
                                    <ContactIcon className={info.icon}></ContactIcon>
                                    <ContactItemContent>
                                        <ContactItemTitle>{info.title}</ContactItemTitle>
                                        <ContactItemText>{info.content}</ContactItemText>
                                    </ContactItemContent>
                                </ContactItem>
                            ))}
                            <ContactHours>
                                <ContactHoursTitle>Business Hours</ContactHoursTitle>
                                <ContactHoursText>Monday - Friday: 10:00 AM - 6:00 PM</ContactHoursText>
                                <ContactHoursText>Saturday: 10:00 AM - 4:00 PM</ContactHoursText>
                                <ContactHoursText>Sunday: Closed</ContactHoursText>
                            </ContactHours>
                        </ContactInfo>
                        <ContactForm>
                            <ContactFormTitle>Order Request Form</ContactFormTitle>
                            <form onSubmit={handleSubmit}>
                                <FormGroup>
                                    <FormInput
                                        type="text"
                                        name="name"
                                        placeholder="Your Name *"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        className={errors.name ? 'error' : ''}
                                        disabled={isSubmitting}
                                    />
                                    {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
                                </FormGroup>
                                <FormGroup>
                                    <FormInput
                                        type="email"
                                        name="email"
                                        placeholder="Your Email *"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className={errors.email ? 'error' : ''}
                                        disabled={isSubmitting}
                                    />
                                    {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
                                </FormGroup>
                                <FormGroup>
                                    <FormSelect
                                        name="product"
                                        value={formData.product}
                                        onChange={handleInputChange}
                                        required
                                        className={errors.product ? 'error' : ''}
                                        disabled={isSubmitting}
                                    >
                                        <option value="">Select a Product *</option>
                                        <option value="mini">Mini Bouquet - $15</option>
                                        <option value="standard">Standard Bouquet - $25</option>
                                        <option value="large">Large Arrangement - $40</option>
                                        <option value="custom">Custom Design - $50+</option>
                                    </FormSelect>
                                    {errors.product && <ErrorMessage>{errors.product}</ErrorMessage>}
                                </FormGroup>
                                <FormGroup>
                                    <FormLabel>Quantity</FormLabel>
                                    <FormInput
                                        type="number"
                                        name="quantity"
                                        value={formData.quantity}
                                        onChange={handleInputChange}
                                        min="1"
                                        max="10"
                                        required
                                        className={errors.quantity ? 'error' : ''}
                                        disabled={isSubmitting}
                                    />
                                    {errors.quantity && <ErrorMessage>{errors.quantity}</ErrorMessage>}
                                </FormGroup>
                                <FormGroup>
                                    <FormLabel>Total Price</FormLabel>
                                    <FormInput
                                        type="text"
                                        name="price"
                                        value={formData.price}
                                        readOnly
                                        placeholder="Price will be calculated"
                                        className="price-display"
                                        disabled={isSubmitting}
                                    />
                                    {errors.price && <ErrorMessage>{errors.price}</ErrorMessage>}
                                </FormGroup>
                                <FormGroup>
                                    <FormLabel>Delivery Address</FormLabel>
                                    <FormTextarea
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        placeholder="Enter your complete delivery address (street, city, state, pincode)"
                                        className={errors.address ? 'error' : ''}
                                        disabled={isSubmitting}
                                    />
                                    {errors.address && <ErrorMessage>{errors.address}</ErrorMessage>}
                                </FormGroup>
                                <FormGroup>
                                    <FormSelect
                                        name="paymentMethod"
                                        value={formData.paymentMethod}
                                        onChange={handleInputChange}
                                        required
                                        className={errors.paymentMethod ? 'error' : ''}
                                        disabled={isSubmitting}
                                    >
                                        <option value="">Select Payment Method *</option>
                                        <option value="cod">Cash on Delivery</option>
                                        <option value="paypal">PayPal</option>
                                        <option value="shopify">Shopify</option>
                                    </FormSelect>
                                    {errors.paymentMethod && <ErrorMessage>{errors.paymentMethod}</ErrorMessage>}
                                </FormGroup>
                                <FormGroup>
                                    <FormTextarea
                                        name="message"
                                        placeholder="Special requests, occasion details, or messages..."
                                        rows="4"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        disabled={isSubmitting}
                                    ></FormTextarea>
                                </FormGroup>
                                
                                {/* Payment Buttons */}
                                <PaymentSection>
                                    <PaymentTitle>Complete Your Order</PaymentTitle>
                                    <PaymentButtons>
                                        {formData.paymentMethod === 'paypal' && (
                                            <PayPalButton 
                                                type="button" 
                                                onClick={() => handlePayment('paypal')}
                                            >
                                                <PaymentIcon className="fab fa-paypal"></PaymentIcon>
                                                Pay with PayPal
                                            </PayPalButton>
                                        )}
                                        {formData.paymentMethod === 'shopify' && (
                                            <ShopifyButton 
                                                type="button" 
                                                onClick={() => handlePayment('shopify')}
                                            >
                                                <PaymentIcon className="fab fa-shopify"></PaymentIcon>
                                                Pay with Shopify
                                            </ShopifyButton>
                                        )}
                                        {formData.paymentMethod === 'cod' && (
                                            <CODButton 
                                                type="submit"
                                                disabled={isSubmitting}
                                            >
                                                {isSubmitting && <LoadingSpinner />}
                                                <PaymentIcon className="fas fa-money-bill-wave"></PaymentIcon>
                                                {isSubmitting ? 'Processing...' : 'Confirm Cash on Delivery'}
                                            </CODButton>
                                        )}
                                    </PaymentButtons>
                                </PaymentSection>
                                
                                <SubmitButton type="submit">Send Order Request</SubmitButton>
                            </form>
                        </ContactForm>
                    </ContactContent>
                </ContactContainer>
            </ContactSection>
        </div>
    );
};

export default ContactPage;
