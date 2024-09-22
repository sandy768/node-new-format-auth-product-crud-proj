const nodemailer=require('nodemailer');

const createTransporter=(senderEmail,senderPassword)=>{
        const transporter=nodemailer.createTransport({
            host:'smtp',
            port:465,
            secure:false,
            requireTLS:true,
            service:'gmail',
            auth:{
                user:senderEmail,
                pass:senderPassword,
            },
        });
        return transporter;
};

const mailSend=(req,res,transport,mailReceiver)=>{
    transport.sendMail(mailReceiver,(err)=>{
        if(err){
            console.log("Error to send mail",err);
            req.flash('reg-err','Error to send email to your mailbox');
            res.redirect('/');
        }
        else{
            req.flash('reg-success','Successfully registered, Please check your mailbox for email verification');
            res.redirect('/');
        }
    })
}
module.exports={createTransporter,mailSend};