const express = require("express");

const client = require("../configs/db");

const authenticate = require("../middlewares/authenticate")

const Todo = require("../models/todo.model");

const router = express.Router();

router.post("", async (req, res) => {
  try {
    const todo = await Todo.create(req.body);

    const todos = await Todo.find().lean().exec();

    client.set("todos", JSON.stringify(todos));

    return res.status(201).send(todo);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.get("", async (req, res) => {
  try {
    client.get("todos", async function (err, fetchedTodos) {
      if (fetchedTodos) {
        const todos = JSON.parse(fetchedTodos);

        return res.status(200).send({ todos});
      } else {
        try {
          const todos = await Todo.find().lean().exec();

          client.set("todos", JSON.stringify(todos));

          return res.status(200).send({ todos });
        } catch (err) {
          return res.status(500).send({ message: err.message });
        }
      }
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    client.get(`todos.${req.params.id}`, async function (err, fetchedTodo) {
      if (fetchedTodo) {
        const todo = JSON.parse(fetchedTodo);

        return res.status(200).send({ todo});
      } else {
        
          const todo = await Todo.findById(req.params.id).lean().exec();

          client.set(`todos.${req.params.id}`, JSON.stringify(todo));

          return res.status(200).send({ todo });
  
      }
    });
  } catch (err) {
    return res.status(401).send({ message: err.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();

    const todos = await Todo.find().lean().exec();

    client.set(`todos.${req.params.id}`, JSON.stringify(todo));
    client.set("todos", JSON.stringify(todos));

    return res.status(200).send(todo);
  } catch (err) {
    return res.status(401).send({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id).lean().exec();

    const todos = await Todo.find().lean().exec();

    client.del(`todos.${req.params.id}`);
    client.set("todos", JSON.stringify(todos));

    return res.status(200).send(todo);
  } catch (err) {
    return res.status(401).send({ message: err.message });
  }
});

module.exports = router;
