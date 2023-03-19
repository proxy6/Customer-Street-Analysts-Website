const mongoose = require('mongoose');
const paymentLogSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        trim: true
    },
    lname:{
        type: String,
        required: true, 
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true
    },
    amount:{
        type: String,
        required: true
    },
    reference: {
        type: String,
        required: true
    },
    paymentType: {
        type: String,
        required: true
    },
},
{
    timestamps: true
})
const Payment = mongoose.model('Payment', paymentLogSchema);

exports.Payment = Payment;