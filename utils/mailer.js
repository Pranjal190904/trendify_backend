const nodeMailer=require('nodemailer');
const {mail,mailPass}=require('../config/env.config')

function sendMail(email,otp)
{
    const transporter=nodeMailer.createTransport({
        service:'gmail',
        auth:{
            user:mail,
            pass:mailPass
        }
    })

    const mailOptions={
        from: mail,
        to: email,
        body: `<p style="font-size: 25px" >Here is your OTP for verification.<br><b>OTP : ${otp}</b></p>`
    }

    try{
        transporter.sendMail(mailOptions);
        console.log("mail sent successfully.")
    }
    catch(err)
    {
        console.log(err);
    }
}

module.exports=sendMail