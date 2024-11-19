import express from 'express';
import exhibitionemailController from '../controllers/exhibitionemailController.js';


const router = express.Router();

router.get('/test', (req, res) => {
    res.json({ message: 'Email router is working!' });
  });
  
  router.post('/sendexhibtion', (req, res) => {
    console.log('Email send route hit');
    console.log('Request body:', req.body);
    exhibitionemailController(req, res);
  });
  

export default router;