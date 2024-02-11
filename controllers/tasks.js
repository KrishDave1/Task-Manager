const Task = require("../models/Tasks");

const getAllTasks = (req, res) => {
  res.send("get all Task");
};

const createTask = async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({task})
};

const getSingleTask = (req, res) => {
  res.json({id : req.params.id});
};

const updateTask = (req, res) => {
  res.send("update task");
};

const deleteTask = (req, res) => {
  res.send("delete task");
};

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  getSingleTask,
  deleteTask,
};