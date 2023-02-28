const sequelize=require('../util/database');
const Sequelize=require('sequelize');
const data=sequelize.define('user',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },

    name:Sequelize.STRING,
    email:{
        type:Sequelize.STRING,
        
        allowNull:false
    },
    password:{
        type:Sequelize.STRING,
        
        allowNull:false
    },
    ispremium:Sequelize.BOOLEAN,
    total_expense:Sequelize.INTEGER
})

module.exports=data;