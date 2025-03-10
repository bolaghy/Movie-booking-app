const express = require('express');
const router = express.Router();
const { createPayment, getAllPayments, getPaymentById,
    updatePayment, deletePayment, }= require('../Controllers/PaymentController'); 


router.post('/create-payment', createPayment);
router.get('/all-payment', getAllPayments);
router.get('/payment/:id', getPaymentById);
router.put('/update-payment/:id', updatePayment);
router.delete('/delete-payment/:id', deletePayment);    

module.exports = router;              