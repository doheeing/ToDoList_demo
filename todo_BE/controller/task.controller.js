const Task = require("../model/Task");

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

taskController.getTask = async (req, res) => {
  try {
    const taskList = await Task.find({}).select("-__v");
    res.status(200).json({
      status: "OK",
      data: taskList,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      error: err,
    });
  }
};

taskController.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      throw new Error("해당 내용이 없습니다");
    }
    // 요청 본문(req.body)의 키들을 가져옴.
    const fields = Object.keys(req.body);

    // 각 키에 대해, 해당 키의 값을 작업 객체에 업데이트
    fields.forEach((item) => {
      task[item] = req.body[item];
    });

    await task.save();

    res.status(200).json({ status: "success", data: task });
  } catch {
    res.status(400).json({
      status: "error",
      error: err,
    });
  }
};

taskController.deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      throw new Error("해당 내용을 찾을 수 없습니다.");
    }
    res.status(200).json({
      status: "OK",
      data: deletedTask,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      error: err,
    });
  }
};

module.exports = taskController;
