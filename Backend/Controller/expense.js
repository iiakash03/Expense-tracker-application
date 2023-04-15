const { response } = require('express');
const Expense=require('../Models/expense');
const user=require('../Models/user');
//const sequelize=require('../util/database');
//const AWS=require('aws-sdk');



function uploadTos3(data,filename){
    try{
    const BUCKET_NAME=process.env.BUCKET_NAME;
    const IAM_USER_KEY=process.env.IAM_USER_KEY;
    const IAM_USER_SECRET=process.env.IAM_USER_SECRET

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

    const price=req.body.price
    const description=req.body.description
    const category=req.body.productname

    const totalprice=await user.find({
        attributes:['total_expense'],
        where:{
            id:req.user.id
        }

    })
    // const updatedPrice=+totalprice[0].dataValues.total_expense+ +price;

    // user.update(
    //     {total_expense:updatedPrice},
    //     {where:{id:req.user.id}},
    //     {transaction:t}
    // )

    let expense=new Expense({
        price:price,
        category:category,
        description:description,
        userId:req.user.id
    })

    expense.save()
    .then((response)=>{
        console.log('responseeeded',response);
        res.json(response)
    })
    .catch(err=>{
        
        console.log(err); 
    })
}


const getExpenses=async (req,res,next)=>{
    try{
    let page=req.query.page || 1;

    const ITEMS_PER_PAGE=req.query.rows || 5;

    const count=await Expense.count({
            userId:req.user.id
    })

    //console.log(count/ITEMS_PER_PAGE);

    if(page==='last'){
        page=Math.floor(count/ITEMS_PER_PAGE)+1;
    }
    //console.log('bwhjdv3e3ydgriyg4r',count);
    let totalItems;

    const expenses=await Expense.find(
        {
            userId:req.user.id
        }
    )
    console.log(expenses);
    res.send(expenses);

    // res.json({
    //     expenses:expenses,
    //     currentPage:page,
    //     hasNextPage:ITEMS_PER_PAGE*page<count,
    //     nextPage:+page + +1,
    //     hasPreviousPage:page>1,
    //     previousPage:page-1,
    //     lastPage:Math.ceil(totalItems/ITEMS_PER_PAGE),
    // })
}catch(err){
    console.log(err);
}
    
}


const deleteExpense=async (req,res,next)=>{

 try{
    const id=req.params.userId;

    // const amount=await user.findAll({
    //     attributes:['total_expense'],
    //     where:{
    //         id:req.user.id
    //     }
    // },

    
    // )

    // const currentamount=await expense.findAll({
    //     attributes:['price'],
    //     where:{
    //         id:id,
    //     }

    // },
    // )

    //const updatedprice=amount[0].total_expense-currentamount[0].price;

    // await user.update(
    //     {total_expense:updatedprice},
    //     {where:{id:req.user.id}},
    // )

    
    await Expense.deleteOne({ _id: id });
        res.send("deleted");
        
}
catch(err){
    console.log(err);
}
}


const updateExpense=async (req,res,next)=>{
    try{
        const id=req.params.userId;
        console.log(id);
        const resp=await Expense.findOne(
            {
                _id:id
            }
        
        )
        
        res.send(resp);
        

    }catch(err){
        console.log(err);
    }

}

module.exports={
    addExpense,
    getExpenses,
    deleteExpense,
    download,
    updateExpense
}