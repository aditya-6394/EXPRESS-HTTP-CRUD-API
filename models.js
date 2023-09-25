/* eslint-disable no-unused-vars */
const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DBUSER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    port: process.env.PORT,
    dialect: process.env.DIALECT,
  },
);

// ==============================Model for ToDo==================================
const todos = sequelize.define(
  'todos',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    iscompleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    timestamps: false,
  },
);

//=================================Exports========================================

module.exports.sequelize = sequelize;

module.exports.todos = todos;
