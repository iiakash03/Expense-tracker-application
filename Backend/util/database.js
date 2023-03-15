const Sequelize = require('sequelize');

const sequelize = new Sequelize('expensetracker', 'akash', 'akash8958', {
  dialect: 'mysql',
  host:'database-1.cdpq8su721ft.us-east-2.rds.amazonaws.com'
});

module.exports = sequelize;
