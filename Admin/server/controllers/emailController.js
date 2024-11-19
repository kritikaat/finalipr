import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'krutika20023@gmail.com',
    pass: 'jdgijuvnwwnzgpuu',
  },
});

const sendApprovalEmail = async (req, res) => {
  console.log('sendApprovalEmail called');
  console.log('Request body:', req.body);
  
  const { id, email } = req.body;
  
  if (!id || !email) {
    return res.status(400).json({ 
      error: 'Missing required fields',
      received: { id, email },
      body: req.body 
    });
  }

  const mailOptions = {
    from: 'krutika20023@gmail.com',
    to: email,
    subject: 'Request For IPR Visit Approved',
    html: `
    <div class="bg-gray-100 min-h-screen flex flex-col items-center justify-center py-10 px-5">
      <div class="bg-white shadow-lg rounded-lg max-w-md w-full p-6">
        <h2 class="text-xl font-bold text-gray-800 mb-4">IPR Visit Confirmation</h2>
        <p class="text-gray-700 mb-4">
          Dear Visitor, 
        </p>
        <p class="text-gray-700 mb-4">
          We are pleased to inform you that your request has been approved. Kindly ensure that you visit the IPR facility on the scheduled time. We look forward to hosting you.
        </p>
        <p class="text-gray-700 mb-4">
          Should you have any questions, feel free to contact us.
        </p>
        <p class="text-gray-700 font-semibold mt-4">Thank you!</p>
        <p class="text-gray-500 text-sm mt-2">- IPR Team</p>
      </div>
    </div>
  `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ 
      message: 'Email sent successfully',
      sentTo: email,
      requestId: id 
    });
  } catch (error) {
    console.error('Nodemailer error:', error);
    res.status(500).json({ 
      error: 'Failed to send email',
      details: error.message 
    });
  }
};

export default sendApprovalEmail;