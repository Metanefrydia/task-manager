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