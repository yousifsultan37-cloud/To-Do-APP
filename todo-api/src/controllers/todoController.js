const mongoose = require("mongoose");
const Todo = require("../models/Todo");

const isValidTodoId = (id) => mongoose.Types.ObjectId.isValid(id);

// GET /todos - Get all todos
const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    return res.status(200).json(todos);
  } catch (error) {
    console.error("Failed to get todos:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// GET /todos/:id - Get a todo by ID
const getTodoById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidTodoId(id)) {
      return res.status(400).json({ message: "Invalid todo ID" });
    }

    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    return res.status(200).json(todo);
  } catch (error) {
    console.error("Failed to get todo:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// POST /todos - Create a todo
const createTodo = async (req, res) => {
  try {
    const { title, completed } = req.body || {};

    if (typeof title !== "string" || !title.trim()) {
      return res.status(400).json({
        message: "Title is required and must be a non-empty string",
      });
    }

    if (completed !== undefined && typeof completed !== "boolean") {
      return res.status(400).json({
        message: "Completed must be a boolean",
      });
    }

    const todo = await Todo.create({
      title: title.trim(),
      completed,
    });

    return res.status(201).json(todo);
  } catch (error) {
    console.error("Failed to create todo:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// PUT /todos/:id - Update a todo
const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body || {};

    if (!isValidTodoId(id)) {
      return res.status(400).json({ message: "Invalid todo ID" });
    }

    const updates = {};

    if (title !== undefined) {
      if (typeof title !== "string" || !title.trim()) {
        return res.status(400).json({
          message: "Title must be a non-empty string",
        });
      }

      updates.title = title.trim();
    }

    if (completed !== undefined) {
      if (typeof completed !== "boolean") {
        return res.status(400).json({
          message: "Completed must be a boolean",
        });
      }

      updates.completed = completed;
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        message: "At least one valid field is required for update",
      });
    }

    const todo = await Todo.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    return res.status(200).json(todo);
  } catch (error) {
    console.error("Failed to update todo:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// DELETE /todos/:id - Delete a todo
const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidTodoId(id)) {
      return res.status(400).json({ message: "Invalid todo ID" });
    }

    const todo = await Todo.findByIdAndDelete(id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    return res.status(200).json({
      message: "Todo deleted successfully",
      todo,
    });
  } catch (error) {
    console.error("Failed to delete todo:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
};
