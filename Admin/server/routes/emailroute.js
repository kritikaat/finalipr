import express from 'express';
import sendApprovalEmail from '../controllers/emailController.js';

const router = express.Router();

router.get('/test', (req, res) => {
    res.json({ message: 'Email router is working!' });
  });
  
  router.post('/send', (req, res) => {
    console.log('Email send route hit');
    console.log('Request body:', req.body);
    sendApprovalEmail(req, res);
  });
  

export default router;