const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  try {
    req.todo = await Todo.findById(id);
    if (!req.todo) return res.sendStatus(404);
    next();
  } catch (error) {
    // Handle invalid ObjectId error
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'malformatted id' });
    }
    next(error);
  }
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const allowedFields = ['text', 'done'];
  const invalidFields = Object.keys(req.body).filter(
    key => !allowedFields.includes(key)
  );
  if (invalidFields.length > 0) {
    return res.status(400).json({ error: `Unknown fields: ${invalidFields.join(', ')}` });
  }
  try {
    await req.todo.updateOne(req.body);
    res.sendStatus(200);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
