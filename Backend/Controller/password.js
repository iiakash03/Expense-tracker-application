const User = require('../Models/user')
const uuid = require('uuid');
const forgotPasswordRequest = require('../Models/forgotPasswordRequest')
const sequelize = require('../util/database')
const bcrypt = require('bcryptjs');



require('dotenv').config();
const forgotpassword = async (req, res, next) => {
    const t = await sequelize.transaction();
    const email1 = req.body.email;
    console.log(email1)
    const user = await User.findAll({
        where: { email: email1 }
    })

    if (user) {
        const id = uuid.v4();
        forgotPasswordRequest.create({
            id,
            isactive: true,
            userId: user[0].dataValues.id,

        },
            { transaction: t }
        ).catch(err => {
            throw new Error(err)
        })

        const Sib = require('sib-api-v3-sdk')
        var defaultClient = Sib.ApiClient.instance;

        var apiKey = defaultClient.authentications['api-key'];
        apiKey.apiKey = process.env.API_KEY;
        var transEmailApi = new Sib.TransactionalEmailsApi();

        const sender = {
            email: process.env.MAIL
        }

        const recievers = [
            {
                email: email1
            }

        ]

        await transEmailApi.sendTransacEmail({
            sender,
            to: recievers,
            subject: 'password reset link',
            textContent: 'click here to reset password',
            htmlContent: `<a href="http://3.139.69.145:3000/password/resetpassword/${id}">Reset password</a>`,
        })
        t.commit();
        res.send("done");
    }
    else {
        return res.send("user does not exist");
    }


}



const passwordreset = async (req, res, next) => {
    const id = req.params.id;
    console.log(id)
    const resetpassword = await forgotPasswordRequest.findOne({ where: { id } })
    console.log(resetpassword.isactive)
    if (resetpassword) {
        if(resetpassword.isactive===true){
        resetpassword.update({ isactive: false });
        res.status(200).send(`<html>
                                    <script>
                                        function formsubmitted(e){
                                            e.preventDefault();
                                            console.log('called')
                                        }
                                    </script>
                                    <form action="/password/updatepassword/${id}" method="get">
                                        <label for="newpassword">Enter New password</label>
                                        <input name="newpassword" type="password" required></input>
                                        <button>reset password</button>
                                    </form>
                                </html>`
        )
        res.end()
                                    }else{
                                        return res.send("Link expired");
                                    }
                                    
    }
}

const updatepassword = (req, res) => {

    try {
        const { newpassword } = req.query;
        const { resetpasswordid } = req.params;
        forgotPasswordRequest.findOne({ where: { id: resetpasswordid } }).then(resetpasswordrequest => {
            User.findOne({ where: { id: resetpasswordrequest.userId } }).then(user => {
                // console.log('userDetails', user)
                if (user) {
                    //encrypt the password

                    const saltRounds = 10;
                    bcrypt.genSalt(saltRounds, function (err, salt) {
                        if (err) {
                            console.log(err);
                            throw new Error(err);
                        }
                        bcrypt.hash(newpassword, salt, function (err, hash) {
                            // Store hash in your password DB.
                            if (err) {
                                console.log(err);
                                throw new Error(err);
                            }
                            user.update({ password: hash }).then(() => {
                                res.status(201).json({ message: 'Successfuly update the new password' })
                            })
                        });
                    });
                } else {
                    return res.status(404).json({ error: 'No user Exists', success: false })
                }
            })
        })
    } catch (error) {
        return res.status(403).json({ error, success: false })
    }

}




module.exports = {
    forgotpassword,updatepassword,passwordreset
}