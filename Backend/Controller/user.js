const user=require('../Models/user');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');


const login=function(req,res,next){
    const email=req.body.email;
    const password=req.body.password;

    user.findAll({
        where:{
            email:email
        }
    })
    .then(data=>{
        if(data){
            bcrypt.compare(password,data[0].password,(err,result)=>{
                if(result){
                    return res.send({status:"logged",token:generateAccessToken(data[0].id,data[0].name,data[0].ispremium)})
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
    user.findAll({
        where:{
            email:email
        }
    })
    .then(data=>{
        if(data.length>0){
            return res.send('user already exist');
        }else{
            bcrypt.hash(password,10,async(err,hash)=>{
                console.log(err)
            await user.create({
                name,
                email,
                password:hash,
                ispremiumuser:false
            })
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