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
        unique:true,
        allowNull:false
    },
    password:{
        type:Sequelize.STRING,
        unique:true,
        allowNull:false
    }
})

module.exports=data;