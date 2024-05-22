const taskController = {};

taskController.createTask = async (req, res) => {
  try {
    const { task, isComplete } = req.body;
    const newTask = new Task({ task, isComplete });
    await newTask.save();
    res.status(200).json({
      status: "OK",
      data: newTask,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      error: err,
    });
  }
};

module.exports = taskController;
