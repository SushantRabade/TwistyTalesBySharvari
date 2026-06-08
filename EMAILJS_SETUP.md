# EmailJS Setup Guide for Password Reset

This guide will help you set up EmailJS to send real password reset emails from your Twisty Tales application.

## 🚀 Quick Setup Steps

### 1. Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### 2. Create Email Service
1. Go to Dashboard → Email Services
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Connect your email account
5. Copy your **Service ID**

### 3. Create Email Template
1. Go to Dashboard → Email Templates
2. Click "Create New Template"
3. Use the template below (copy and paste)
4. Copy your **Template ID**

### 4. Get Public Key
1. Go to Dashboard → Account
2. Copy your **Public Key**

## 📧 Email Template

Use this template for your password reset email:

**Template Name:** Password Reset
**Template ID:** template_password_reset

### Subject:
```
Password Reset Request - Twisty Tales
```

### HTML Content:
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset - Twisty Tales</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
        }
        .container {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .logo {
            font-size: 2.5rem;
            margin-bottom: 10px;
        }
        .title {
            color: #4ecdc4;
            font-size: 1.5rem;
            margin-bottom: 10px;
        }
        .content {
            margin-bottom: 30px;
        }
        .reset-button {
            display: inline-block;
            background: linear-gradient(45deg, #4ecdc4, #45b7d1);
            color: white;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            margin: 20px 0;
        }
        .reset-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(78, 205, 196, 0.3);
        }
        .footer {
            text-align: center;
            color: #666;
            font-size: 0.9rem;
            margin-top: 30px;
        }
        .warning {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            color: #856404;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">🌻</div>
            <h1 class="title">Twisty Tales by Sharvari</h1>
            <h2>Password Reset Request</h2>
        </div>
        
        <div class="content">
            <p>Hello {{user_name}},</p>
            <p>We received a request to reset your password for your Twisty Tales account. Click the button below to reset your password:</p>
            
            <div style="text-align: center;">
                <a href="{{reset_link}}" class="reset-button">Reset Password</a>
            </div>
            
            <div class="warning">
                <strong>⚠️ Important:</strong>
                <ul>
                    <li>This link will expire in 1 hour for security reasons</li>
                    <li>If you didn't request this password reset, please ignore this email</li>
                    <li>Never share this link with anyone</li>
                </ul>
            </div>
            
            <p>If the button above doesn't work, you can copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #4ecdc4; font-size: 0.9rem;">{{reset_link}}</p>
        </div>
        
        <div class="footer">
            <p>Thank you for choosing Twisty Tales by Sharvari! 🌸</p>
            <p>Need help? Contact us at support@twistytales.com</p>
        </div>
    </div>
</body>
</html>
```

### Template Variables:
- `{{user_name}}` - User's name (extracted from email)
- `{{reset_link}}` - Password reset link

## ⚙️ Configuration

### Replace these values in LoginPage.jsx:

```javascript
// Replace with your actual EmailJS credentials
emailjs.init("YOUR_PUBLIC_KEY");           // Your Public Key
'YOUR_SERVICE_ID',                  // Your Service ID  
'YOUR_TEMPLATE_ID',                  // Your Template ID
```

### Example:
```javascript
emailjs.init("abc123def456ghi789");           // Your actual public key
'service_gmail_com',                     // Your actual service ID
'template_password_reset',                 // Your actual template ID
```

## 🔧 Update Your Code

In `src/components/pages/LoginPage.jsx`, replace the placeholder values:

```javascript
const response = await emailjs.send(
    'YOUR_ACTUAL_SERVICE_ID',    // Replace with your service ID
    'YOUR_ACTUAL_TEMPLATE_ID',   // Replace with your template ID
    templateParams
);
```

## 🎯 Testing

1. **Start your app:** `npm run dev`
2. **Go to login page:** `http://localhost:3001/login`
3. **Click "Forgot Password?"**
4. **Enter your email** and click "Send Reset Link"
5. **Check your email** for the reset link

## 📧 Alternative: Using SMTP

If you prefer not to use EmailJS, you can implement SMTP using:

### Option 1: Node.js Backend
```javascript
// Create a simple backend API endpoint
app.post('/api/forgot-password', async (req, res) => {
    const { email } = req.body;
    // Send email using nodemailer
});
```

### Option 2: Formspree
```javascript
// Use Formspree for form submissions
fetch('https://formspree.io/f/your-form-id', {
    method: 'POST',
    body: JSON.stringify({ email, resetLink })
});
```

## 🔒 Security Considerations

1. **Token Expiration:** Set tokens to expire after 1 hour
2. **Rate Limiting:** Limit requests per email/IP
3. **Validation:** Verify email format before sending
4. **HTTPS:** Always use HTTPS in production

## 🚨 Troubleshooting

### Common Issues:
1. **"Email not sending"** - Check EmailJS configuration
2. **"Invalid template"** - Verify template variables
3. **"CORS error"** - Ensure EmailJS domain is whitelisted
4. **"No email received"** - Check spam folder

### Debug Mode:
Enable console logging to see detailed error messages:
```javascript
console.log('EmailJS Error:', error);
```

## 📞 Support

- **EmailJS Documentation:** [https://www.emailjs.com/docs](https://www.emailjs.com/docs)
- **Twisty Tales Support:** support@twistytales.com
- **EmailJS Support:** support@emailjs.com

---

**🎉 Your password reset feature will be fully functional once you complete this setup!**

**Next Steps:**
1. ✅ Set up EmailJS account
2. ✅ Create email template  
3. ✅ Update credentials in code
4. ✅ Test the functionality
5. ✅ Deploy to production

**Your users will then receive real password reset emails!** 🌸📧✨
