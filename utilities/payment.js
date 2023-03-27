const request = require('request');
const path = require('path')
const _ = require('lodash');
const {Payment} = require('../models/payment.model');
const { sendWelcomeMessage } = require('./sendMessage');
const {initializePayment, verifyPayment} = require('./paystack')(request);


exports.initpayment = async (req, res, next) => {
    const form = _.pick(req.body,['fname','lname','email',  'phone', 'amount', 'payment_type']);
    form.metadata = {
        fullname : `${form.fname}  ${form.lname}`,
        surname: form.lname,
        firstname: form.fname,
        email: form.email,
        phone: form.phone,
        paymentType: form.payment_type
    }
    form.amount = parseFloat(form.amount.replace(/,/g, ''))
    form.amount *= 100;
    console.log(form.amount)
    initializePayment(form, (error, body)=>{
        let data = 'Error initializing paystack payment, please make sure you are connected to the internet'
        if(error) {
            console.log(error)
            return res.render('error', {
            data,
        })
        }
        response = JSON.parse(body);
        res.redirect(response.data.authorization_url)

    });


};

exports.verifypayment = async (req,res) => {
    const ref = req.query.reference;
    verifyPayment(ref, async (error, body)=>{
        if(error){
            //handle errors appropriately
            let data = "Paystack payment verification failed"
            res.status(500).render('error', {
                data,
            })
        }
        response = JSON.parse(body);        
        const data = _.at(response.data, ['reference', 'amount','customer.email', 'metadata.fullname', 'metadata.surname', 'metadata.firstname', 'metadata.phone', 'metadata.paymentType']);
      
        [reference, amount, email, fullname, surname, firstname, phone, paymentType] =  data;
       const pay = {reference, amount, email, fullname, surname, firstname, phone, paymentType}
  
       const existing = await Payment.findOne({
        reference:pay.reference
       })
       if(existing) return res.render("error", {data: "Payment Refernce Already Used"})
       Payment.create({
        fname: pay.firstname,
        lname: pay.surname,
        email,
        phone,
        reference,
        amount: pay.amount/100,
        paymentType
       })
       .then( async result=>{
        //send welcom message to mail
        await sendWelcomeMessage(result);
        await sendNewStudentAlert(result)
        res.redirect(`/e-receipt/${result.id}`)
       })
       .catch(e=>{
        console.log(e)
        res.status(500).send('an error occured')
       })
      
    })
};

exports.getReceipt = async(req, res)=>{
    const {id}= req.params
    Payment.findOne({
          _id:id,
    }).then(result=>{
        if(!result){
            let data = `Payment Reference not found`
            return res.render('error', {data})
        }
       return res.render('receipt', {
        user: result,
        })
    }).catch(e=>{
        res.status(500).render('error', {data: 'An Error Occured while fetching receipt'})
    })  
    
}




