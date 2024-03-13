/** @format */

const Task = require("../models/Tasks");
// This is the model we created in models folder.
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({}); // writing this means it will return all the tasks.
  res.status(200).json({ tasks });
  // res.status(200).json({ tasks, amount : tasks.length});
  // res.status(200).json({ success: true, data: { tasks, nbHits: tasks. length } });
});
//The whole logic of controller is passed as a argument to asyncWrapper function and then it returns a function which is then used as a middleware function in the routes.Inside the asyncWrapper function, we are using the try catch block to handle the error. This is done to avoid writing try catch block in every function

const createTask = asyncWrapper (async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task }); // same as .json({ task: task }).201 means new task created.
});

const getSingleTask = asyncWrapper (async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404));
  } 
  // The above error will occur if the id syntax is correct yet still there is no object with that id.In case of 500 error, the id syntax is not right(meaning less number of characters or more number of characters in id).
  res.status(200).json({ task });
});

const deleteTask = asyncWrapper (async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404));
  }
  // res.status(200).json({task});
  res.status(200).json({ msg: `Task deleted successfully` });
});

const updateTask = asyncWrapper (async (req, res) => {
    const { id: taskID } = req.params; // This is method of destructuring and taskId directly gets the value of id from req.params.
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true, // This is used to return the updated object.
      runValidators: true, // without this the validators setup in the schema will not run.
    });

    if (!task) {
      return next(createCustomError(`No task with id : ${taskID}`, 404));
    }

    res.status(200).json({ task }); 
});

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  getSingleTask,
  deleteTask,
};
