const express = require('express');
const router = express.Router();
const todos = require('./models').todos;
const schemaValidator = require('./models').schemaValidator;

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
    if (isNaN(req.params.id)) {
      throw new Error();
    }
    const todo = await todos.findAll({
      where: {
        id: todoId,
      },
    });
    if (todo.length === 0) {
      throw new Error();
    }
    res.status(200).json(todo);
  } catch (error) {
    error.statusCode = 404;
    error.message = {
      message: 'not found',
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
    const id = Number(req.params.id);
    if (isNaN(id)) {
      throw new Error('Id is not valid');
    }
    await todos.update(req.body, {
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(req.body);
  } catch (error) {
    next(error);
  }
});

//Delete a todo: DELETE /todos/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      throw new Error('Id is not valid');
    }
    const todo = await todos.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).send(`${todo} deleted successfully!`);
  } catch (error) {
    next(error);
  }
});

module.exports.router = router;
