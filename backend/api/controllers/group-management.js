const mongoose = require('mongoose');
const Group = mongoose.model('Group');

module.exports.addGroup = async (req, res) => {
    try {
        const group = await Group.create(req.body);

        res.status(201).json({
          status: "success",
          data: { group: group },
        });
      } catch (err) {
        res.status(400).json({
          status: "error",
          message: err,
        });
      }
}