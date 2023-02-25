const user=require('../Models/userdata');
const userdata=require('../Models/userdata')

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
            if(data[0].password===password){
                return res.send("successfully logged in")
            }else{
                return res.send("password incorrect");
            }
        }else{
            return res.send("user not found");
        }
    })
}

const register=function(req,res,next){
    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;
    userdata.findAll({
        where:{
            email:email
        }
    })
    .then(data=>{
        if(data){
            return res.send('user already exist');
        }else{
            userdata.create({
                name:name,
                email:email,
                password:password
            }
            ).then(result=>{
                return res.send('successfully saved');
            }).catch(err=>{
                return res.send(err);
            })
        }
    })

    

}
module.exports={
    login,
    register
}