const mongoose = require('mongoose');
const Task = mongoose.model('Task');

module.exports.addTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        
        res.status(201).json({
          status: "success",
          data: { task: task },
        });
      } catch (err) {
        res.status(400).json({
          status: "error",
          message: err,
        });
      }
}

module.exports.getTasks = async (req, res) => {
    try {
        const date = req.params.date;

        const tasks = await Task.find(
            {date: date}
        )

        res.status(201).json({
            status: "success",
            data: tasks,
        });
    } catch (err) {
        res.status(400).json({
            status: "error",
            message: err,
        });
    }
}

module.exports.editTask = async  (req, res) => {
    try {
        const id = req.params.taskId;
        const taskData = req.body;

        const task = await Task.findByIdAndUpdate(id, taskData);

        res.status(201).json({
            status: "success",
            data: { task: task },
        });
    } catch (err) {
        res.status(400).json({
            status: "error",
            message: err,
        });
    }

}

module.exports.deleteTask = async (req,res) => {
    try{

        const id = req.params.taskId;

        const task = await Task.findByIdAndDelete(
            {_id: id}
        );

        res.status(201).json({
            status: "succes",
        });
    }

    catch (err){
        res.status(400).json({
            status: "error",
            message: err,
        });
    }
}