const { response } = require('express');
const expense=require('../Models/expense');
const user=require('../Models/user');
const sequelize=require('../util/database');
const AWS=require('aws-sdk');



function uploadTos3(data,filename){
    try{
    const BUCKET_NAME='expensesofusers';
    const IAM_USER_KEY='AKIA3QEOPLEUJ33O3E67'
    const IAM_USER_SECRET='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'

    let s3bucket=new AWS.S3({
        accessKeyId:IAM_USER_KEY,
        secretAccessKey:IAM_USER_SECRET,
    })

        var params={
            Bucket:BUCKET_NAME,
            Key:filename,
            Body:data,
            ACL:'public-read'
        }
        return new Promise((resolve,reject)=>{
        s3bucket.upload(params,(err,s3response)=>{
            console.log(err);
            if(err){
                //reject(console.log('errrrrrr',err))
            }else{
                //console.log('success',s3response);
                resolve(s3response.Location)

            }
        }) 
    }) 
}catch(err){
    console.log(err);
}  

}




const download=async(req,res,next)=>{
    try{
    const expenses=await req.user.getExpenses();
    
    const stringifyExpenses=JSON.stringify(expenses)
    const userID=req.user.id;
    const filename=`Expenses${userID}/${new Date()}.txt`;
    const fileUrl=await uploadTos3(stringifyExpenses,filename);
    console.log(fileUrl);
    res.json({status:201,fileUrl,success:true})
    }catch(err){
        console.log(err);
    }
}

const addExpense=async (req,res,next)=>{
    const t=await sequelize.transaction();

    const price=req.body.price
    const description=req.body.description
    const category=req.body.category

    const totalprice=await user.findAll({
        attributes:['total_expense'],
        where:{
            id:req.user.id
        }

    })
    const updatedPrice=+totalprice[0].dataValues.total_expense+ +price;

    user.update(
        {total_expense:updatedPrice},
        {where:{id:req.user.id}},
        {transaction:t}
    )

    expense.create({
        price:price,
        category:category,
        description:description,
        userId:req.user.id},
        {transaction:t}   
    )
    .then((response)=>{
        console.log('responseeeded',response);
        res.json(response)
        t.commit();
    })
    .catch(err=>{
        t.rollback();
        console.log(err); 
    })
}


const getExpenses=(req,res,next)=>{

    expense.findAll({
        where:{
            userId:req.user.id
        }
    })
    .then(data=>{
        res.send(data);
    })
}

const deleteExpense=async (req,res,next)=>{
    const t=await sequelize.transaction();

 try{
    const id=req.params.userId;

    const amount=await user.findAll({
        attributes:['total_expense'],
        where:{
            id:req.user.id
        }
    },
    {transaction:t}
    
    )

    const currentamount=await expense.findAll({
        attributes:['price'],
        where:{
            id:id,
        }

    },
    {transaction:t}
    )

    const updatedprice=amount[0].total_expense-currentamount[0].price;

    await user.update(
        {total_expense:updatedprice},
        {where:{id:req.user.id}},
    )

    
    const result=await expense.destroy({
        where:{
            id:id
        },
    },
    )
        res.send("deleted");
        t.commit();
        
}
catch(err){
    console.log(err);
    t.rollback()
}
}

module.exports={
    addExpense,
    getExpenses,
    deleteExpense,
    download
}