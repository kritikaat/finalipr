import nodemailer from 'nodemailer';

// Email validation function
const isValidEmail = (email) => {
  // Comprehensive email regex
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailRegex.test(String(email).toLowerCase());
};

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'krutika20023@gmail.com',
    pass: 'jdgijuvnwwnzgpuu',
  },
});

const sendApprovalEmail = async (req, res) => {
  try {
    console.log('sendApprovalEmail called');
    console.log('Request body:', req.body);

    const { id, email, name } = req.body;

    // Check if all required fields are present
    if (!id || !email || !name) {
      console.log('Missing required fields:', { id, email, name });
      return res.status(400).json({
        error: 'Missing required fields',
        received: { id, email, name },
        body: req.body
      });
    }

    // Clean and validate email
    const cleanEmail = String(email).trim().toLowerCase();
    
    if (!isValidEmail(cleanEmail)) {
      console.log('Invalid email format:', cleanEmail);
      return res.status(400).json({
        error: 'Invalid email format',
        receivedEmail: email,
        cleanedEmail: cleanEmail
      });
    }

    const mailOptions = {
      from: 'krutika20023@gmail.com',
      to: cleanEmail,
      subject: 'Request For Exhibition Approved',
      html: `
      <div style="background-color: #f3f4f6; padding: 40px; font-family: Arial, sans-serif;">
        <div style="background-color: white; border-radius: 8px; padding: 24px; max-width: 600px; margin: 0 auto; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <h2 style="font-size: 24px; color: #1f2937; margin-bottom: 16px;">Exhibition Confirmation</h2>
          <p style="color: #4b5563; margin-bottom: 16px;">
            Dear ${name},
          </p>
          <p style="color: #4b5563; margin-bottom: 16px;">
            We are pleased to inform you that your request to host our exhibition at your school has been approved. We are excited about the opportunity to collaborate and showcase our work to your students and staff.
          </p>
          <p style="color: #4b5563; margin-bottom: 16px;">
            Should you have any questions, feel free to contact us.
          </p>
          <p style="color: #4b5563; font-weight: 600; margin-top: 16px;">Thank you!</p>
          <p style="color: #6b7280; font-size: 14px; margin-top: 8px;">- IPR Team</p>
        </div>
      </div>
      `,
    };

    // Log email options before sending
    console.log('Preparing to send email with options:', {
      to: mailOptions.to,
      from: mailOptions.from,
      subject: mailOptions.subject
    });

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.response);

    res.status(200).json({
      message: 'Email sent successfully',
      sentTo: cleanEmail,
      requestId: id,
      messageId: info.messageId
    });

  } catch (error) {
    console.error('Nodemailer error:', error);
    res.status(500).json({
      error: 'Failed to send email',
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

export default sendApprovalEmail;