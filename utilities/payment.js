const request = require('request');
const path = require('path')
const _ = require('lodash');
const {Payment} = require('../models/payment.model')
const {initializePayment, verifyPayment} = require('./paystack')(request);


exports.initpayment = async (req, res, next) => {
    // const payment = await Payment.findOne({
    //     where:{
    //         email: req.body.email,
    //         verified: true
    //     }
    // })
    // if (payment){
    //     let data= 'Email Already Used to make payment';
    //     res.render('payment-not-found-page', {
    //         data,
    //     })
    // }
    const form = _.pick(req.body,['fname','lname','email',  'phone', 'amount', 'payment_type']);
    form.metadata = {
        fullname : `${form.fname}  ${form.lname}`,
        surname: form.lname,
        firstname: form.fname,
        email: form.email,
        phone: form.phone,
        paymentType: form.payment_type
    }
    
    form.amount *= 100;
    initializePayment(form, (error, body)=>{
        let data = 'Error initializing paystack payment, please make sure you are connected to the internet'
        if(error) {
            console.log(error)
            return res.render('payment-not-found-page', {
            data,
        })
        }
        response = JSON.parse(body);
        res.redirect(response.data.authorization_url)

    });


};

exports.verifypayment = async (req,res) => {
    const ref = req.query.reference;
    verifyPayment(ref, (error, body)=>{
        if(error){
            //handle errors appropriately
            let data = "Paystack payment verification failed"
            res.status(500).render('payment-not-found-page', {
                data,
            })
        }
        response = JSON.parse(body);        
        const data = _.at(response.data, ['reference', 'amount','customer.email', 'metadata.fullname', 'metadata.surname', 'metadata.firstname', 'metadata.phone', 'metadata.paymentType']);
      
        [reference, amount, email, fullname, surname, firstname, phone, paymentType] =  data;
       const pay = {reference, amount, email, fullname, surname, firstname, phone, paymentType}
        
       const existing = Payment.findOne({
        reference:pay.reference
       })
      // if(existing) return res.render("error", {data: "Payment Refernce Already Used"})
       Payment.create({
        fname: pay.firstname,
        lname: pay.surname,
        email,
        phone,
        reference,
        amount: pay.amount/100,
        paymentType
       })
       .then(result=>{
        console.log(result)
        res.redirect(`/e-receipt/${result.id}`)
       })
       .catch(e=>{
        console.log(e)
        res.status(500).send('an error occured')
       })
       
        // Payment.create({
        //  reference: pay.reference,
        //  email: pay.email,
        //  amount: pay.amount/100,
        //  fullName: pay.full_name, 
        //  surname: pay.surname,
        //  firstName: pay.first_name,
        //  otherName: pay.other_name,
        //  plateNum:  pay.plate_num,
        //  phoneNum: pay.phone_num,
        //  verified: true  
        // })
        // .then(result=>{
        //     res.redirect(`/paystack/e-receipt/${result.id}`)
        // })
        // .catch((e)=>{
        //    res.status(500).send('an error occured')
        // })
      
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
        res.status(500).send('Payment Reference Not Found')
    })  
    
}




