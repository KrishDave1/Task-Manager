const express = require('express');
const router = express.Router();
const {
  getAllTasks,
  createTask,
  updateTask,
  getSingleTask,
  deleteTask,
} = require("../controllers/tasks");

router.route('/').get(getAllTasks).post(createTask);
router.route('/:id').get(getSingleTask).patch(updateTask).delete(deleteTask);

//Put and patch are both used for updating the existing data. But the difference is that put is used to update the entire object(replace the item) and patch is used to update only the required fields of the object.



module.exports = router;