const user=require('../Models/userdata');
const userdata=require('../Models/userdata')
const bcrypt=require('bcrypt');

const login=function(req,res,next){
    const email=req.body.email;
    const password=req.body.password;

    userdata.findAll({
        where:{
            email:email
        }
    })
    .then(data=>{
        if(data){
            bcrypt.compare(password,data[0].password,(err,result)=>{
                if(result){
                    console.log("abcdf");
                    return res.send({status:"logged"})
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
    userdata.findAll({
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
    


module.exports={
    login,
    register
}