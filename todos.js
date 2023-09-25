const todos = require('./models').todos;
const schemaValidator = require('./middleware/yupvalidator').schemaValidator;
const express = require('express');
const router = express.Router();

// =================================API'S=========================

// Fetch todo : GET /todos
router.get('/', async (req, res, next) => {
  try {
    const allTodos = await todos.findAll();
    res.status(200).json({ allTodos });
  } catch (error) {
    next(error);
  }
});

// Fetch Todo Detail: GET /todos/:id
router.get('/:id', async (req, res, next) => {
  try {
    const todoId = parseInt(req.params.id);
    const todo = await todos.findByPk(todoId);

    if (isNaN(todoId)) {
      const error = new Error();
      error.statusCode = 400;
      error.message = 'Invalid URL';
      throw error;
    } else if (todo === null) {
      const error = new Error();
      error.statusCode = 404;
      error.message = 'Requested resource not found';
      throw error;
    } else {
      res.status(200).json(todo);
    }
  } catch (error) {
    error.message = {
      message: error.message,
    };
    next(error);
  }
});

// Create a todo:POST /todos
router.post('/', schemaValidator, async (req, res, next) => {
  try {
    const todo = await todos.create(req.body);
    res.status(201).json(todo);
  } catch (error) {
    next(error);
  }
});

//Update a todo: PUT /todos/:id
router.put('/:id', schemaValidator, async (req, res, next) => {
  try {
    const todoId = parseInt(req.params.id);
    const todo = await todos.findByPk(todoId);

    if (isNaN(todoId)) {
      const error = new Error();
      error.statusCode = 400;
      error.message = 'Invalid URL';
      throw error;
    } else if (todo === null) {
      const error = new Error();
      error.statusCode = 404;
      error.message = 'Requested resource not found';
      throw error;
    } else {
      await todos.update(req.body, {
        where: {
          id: Number(todoId),
        },
      });
      res.status(200).json(req.body);
    }
  } catch (error) {
    next(error);
  }
});

//Delete a todo: DELETE /todos/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const todoId = parseInt(req.params.id);
    const todo = await todos.findByPk(todoId);

    if (isNaN(todoId)) {
      const error = new Error();
      error.statusCode = 400;
      error.message = 'Invalid URL';
      throw error;
    } else if (todo === null) {
      const error = new Error();
      error.statusCode = 404;
      error.message = 'Requested resource not found';
      throw error;
    } else {
      const todo = await todos.destroy({
        where: {
          id: todoId,
        },
      });
      res.status(200).send(`${todo} deleted successfully!`);
    }
  } catch (error) {
    next(error);
  }
});

module.exports.router = router;
