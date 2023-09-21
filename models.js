/* eslint-disable no-unused-vars */
const { Sequelize, DataTypes } = require('sequelize');
const yup = require('yup');

const sequelize = new Sequelize('stackexchange', 'postgres', 'mountblue@123', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
});

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

// ===============================Yup Validator==================================
const todoSchema = yup.object({
  text: yup.string().required(),
  iscompleted: yup.boolean().required(),
});

const schemaValidator = async (req, res, next) => {
  try {
    await todoSchema.validate(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

// ===============================Error Handler===================================
const errorHandler = (error, req, res, next) => {
  const errorCode = error.statusCode || 400;
  res.status(errorCode).send(error.message);
};
const invalidUrl = (req, res) => {
  res.status(400).send('Invalid URL');
};
//=================================Exports========================================

module.exports.sequelize = sequelize;
module.exports.schemaValidator = schemaValidator;
module.exports.todos = todos;
module.exports.errorHandler = errorHandler;
module.exports.invalidUrl = invalidUrl;
