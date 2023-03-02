const sequelize=require('../util/database');
const Sequelize=require('sequelize');
const { v4: uuidv4 } = require('uuid');


const forgotpassword=sequelize.define('forgotpassword',{
    id:{
        type:Sequelize.UUID(),
        defaultValue: Sequelize.UUIDV4,
        allowNull:false,
        primaryKey:true
    },
    isactive:Sequelize.BOOLEAN
})

module.exports=forgotpassword