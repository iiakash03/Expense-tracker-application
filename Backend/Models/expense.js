const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const expenseSchema=new Schema({
    category:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    }

    
})

module.exports=mongoose.model('expense',expenseSchema);