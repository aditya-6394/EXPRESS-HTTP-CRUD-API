const express = require('express');
const sequelize = require('./models').sequelize;
const todosRouter = require('./todos').router;
const errorHandler = require('./models').errorHandler;
const invalidUrl = require('./models').invalidUrl;

const app = express();
const port = 8080;

app.use(express.json());
app.use(async (req, res, next) => {
  try {
    await sequelize.authenticate();
    next();
  } catch (error) {
    console.log(error);
  }
});
app.use('/todos', todosRouter);
app.use(errorHandler);
app.use(invalidUrl);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
