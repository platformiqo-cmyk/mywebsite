/// <reference path="../pb_data/types.d.ts" />
onRecordAfterCreateSuccess((e) => {
  const userEmail = e.record.get("email");
  const userId = e.record.id;
  const userName = e.record.get("name") || "User";
  
  // Determine the login URL based on environment
  const loginUrl = "http://localhost:5173/login";
  
  // Generate a temporary password message (user should change it immediately)
  const tempPasswordNote = "Your account has been created with a temporary password. Please log in and change your password immediately in your account settings.";
  
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f9f9f9;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            overflow: hidden;
          }
          .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 40px 20px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 600;
          }
          .content {
            padding: 40px 30px;
          }
          .greeting {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 20px;
            color: #333;
          }
          .section {
            margin-bottom: 30px;
          }
          .section-title {
            font-size: 14px;
            font-weight: 600;
            color: #667eea;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 12px;
          }
          .info-box {
            background-color: #f5f5f5;
            border-left: 4px solid #667eea;
            padding: 15px;
            margin: 15px 0;
            border-radius: 4px;
            font-size: 14px;
          }
          .button {
            display: inline-block;
            background-color: #667eea;
            color: white;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 4px;
            font-weight: 600;
            margin: 20px 0;
            transition: background-color 0.3s;
          }
          .button:hover {
            background-color: #764ba2;
          }
          .account-details {
            background-color: #f0f4ff;
            border: 1px solid #e0e7ff;
            padding: 20px;
            border-radius: 4px;
            margin: 20px 0;
            font-size: 14px;
          }
          .account-details p {
            margin: 8px 0;
          }
          .label {
            font-weight: 600;
            color: #667eea;
          }
          .footer {
            background-color: #f9f9f9;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e0e0e0;
            font-size: 12px;
            color: #666;
          }
          .footer a {
            color: #667eea;
            text-decoration: none;
          }
          .divider {
            height: 1px;
            background-color: #e0e0e0;
            margin: 30px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to Our Platform!</h1>
          </div>
          
          <div class="content">
            <div class="greeting">
              Hello ${userName},
            </div>
            
            <p>Thank you for creating an account with us! We're excited to have you on board. Your account has been successfully created and is ready to use.</p>
            
            <div class="section">
              <div class="section-title">Account Created</div>
              <p>Your account has been activated and you can now access all features and resources available on our platform.</p>
            </div>
            
            <div class="account-details">
              <p><span class="label">Account ID:</span> ${userId}</p>
              <p><span class="label">Email:</span> ${userEmail}</p>
              <p><span class="label">Status:</span> Active</p>
            </div>
            
            <div class="section">
              <div class="section-title">Getting Started</div>
              <p>Click the button below to log in to your account:</p>
              <center>
                <a href="${loginUrl}" class="button">Log In to Your Account</a>
              </center>
            </div>
            
            <div class="info-box">
              <strong>⚠️ Important Security Notice:</strong><br>
              Your account has been created with a temporary password. For your security, please log in immediately and change your password in your account settings. Use a strong, unique password that you haven't used elsewhere.
            </div>
            
            <div class="section">
              <div class="section-title">Password Security</div>
              <ol>
                <li>Log in using your email and temporary password</li>
                <li>Navigate to Settings → Security</li>
                <li>Click "Change Password"</li>
                <li>Enter your new secure password</li>
                <li>Save your changes</li>
              </ol>
            </div>
            
            <div class="divider"></div>
            
            <div class="section">
              <div class="section-title">Need Help?</div>
              <p>If you have any questions or need assistance, our support team is here to help:</p>
              <p>
                <strong>Email:</strong> <a href="mailto:support@example.com">support@example.com</a><br>
                <strong>Response Time:</strong> Within 24 hours
              </p>
            </div>
            
            <p style="color: #666; font-size: 14px; margin-top: 30px;">
              Best regards,<br>
              <strong>The Platform Team</strong>
            </p>
          </div>
          
          <div class="footer">
            <p>This is an automated message. Please do not reply to this email.</p>
            <p>© 2024 Our Platform. All rights reserved.</p>
            <p>
              <a href="http://localhost:5173">Visit Our Website</a> | 
              <a href="http://localhost:5173/privacy">Privacy Policy</a> | 
              <a href="http://localhost:5173/terms">Terms of Service</a>
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
  
  try {
    const message = new MailerMessage({
      from: {
        address: $app.settings().meta.senderAddress,
        name: $app.settings().meta.senderName
      },
      to: [{ address: userEmail }],
      subject: "Welcome to Our Platform - Account Created Successfully",
      html: htmlContent
    });
    
    $app.newMailClient().send(message);
  } catch (error) {
    console.log("Welcome email send error: " + error.message);
  }
  
  e.next();
}, "users");