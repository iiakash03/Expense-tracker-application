require('dotenv').config();
const forgotpassword=(req,res,next)=>{
    const email1=req.body.email;
    console.log(email1.email);
   
const Sib = require('sib-api-v3-sdk')
var defaultClient = Sib.ApiClient.instance;

var apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.API_KEY;
var transEmailApi = new Sib.TransactionalEmailsApi();

const sender={
    email:'aaku1835@gmail.com'
}

const recievers=[
{
    email:email1
}

]

transEmailApi.sendTransacEmail({
    sender,
    to:recievers,
    subject:'password reset link',
    textContent:'click here to reset password'
}).then(
    console.log()
)
.catch((err)=>{
    console.log(err);
}
)


}

module.exports={
    forgotpassword
}