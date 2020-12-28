const { Router } = require("express");
// const config = require("config");
// const shortid = require("shortid");
const Todo = require("../models/Todo");
// const auth = require("../middleware/auth.middleware");
const router = Router();

router.get("/" /*, auth*/, async (req, res) => {
  try {
    const todos = await Todo.find({});
    res.json(todos.reverse());
  } catch (e) {
    res.status(500).json({ message: "Something went wrong! Try again!" });
  }
});

router.post("/add" /*, auth*/, async (req, res) => {
  try {
    const { title } = req.body;
    const todo = new Todo({ title });
    let savedTodo = {};
    await todo.save().then((todo1) => (savedTodo = todo1));
    res.json({ todo: savedTodo });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something went wrong! Try again!" });
  }
});

router.delete("/delete/:id" /*, auth*/, async (req, res) => {
  try {
    const { id } = req.params;
    await Todo.findByIdAndRemove({ _id: id });
    res.json({});
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something went wrong! Try again!" });
  }
});

module.exports = router;
