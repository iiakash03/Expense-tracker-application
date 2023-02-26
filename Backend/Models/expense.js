const sequelize=require('../util/database');
const Sequelize=require('sequelize');

const expense=sequelize.define('expense',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },

    category:Sequelize.STRING,
    price:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    description:{
        type:Sequelize.STRING,
        allowNull:false
    }

})

module.exports=expense;