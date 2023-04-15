const User=require('../Models/user');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');


const login=function(req,res,next){
    const email=req.body.email;
    const password=req.body.password;

    User.findOne(
        {
            email:email
        }
    )
    .then(data=>{
        if(data){
            console.log(data)
            bcrypt.compare(password,data.password,(err,result)=>{
                if(result){
                    return res.send({status:"logged",token:generateAccessToken(data.id,data.name,data.ispremium)})
                }else{
                    return res.send("password incorrect");
                }

            })
        }else{
            return res.send("user not found");
        }
    })
}

const register=function(req,res,next){
    
    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password
    User.find(
        {
            email:email
        }
    )
    .then(data=>{
        if(data.length>0){
            return res.send('user already exist');
        }else{
            bcrypt.hash(password,10,async(err,hash)=>{
                console.log(err)
                let user=new User({
                name,
                email,
                password:hash,
                ispremiumuser:false  
                }) 
            await user.save()
            .then(result=>{
                res.json(result);
            })
            .catch(err=>{
                console.log(err);
            })
        })
    }
})
}

function generateAccessToken(id,name,ispremium){
    return jwt.sign({userId:id,name:name,ispremium:ispremium},'secretkey');
}
    


module.exports={
    login,
    register
}