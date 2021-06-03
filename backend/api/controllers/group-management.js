const mongoose = require('mongoose');
const Group = mongoose.model('Group');
const User = mongoose.model('User');

module.exports.addGroup = async (req, res) => {
    try {
        const group = await Group.create(req.body);

        const users = await User.updateMany(
            { _id: { $in: req.body.members } },
            { $push: { groups: group._id } }
        );

        res.status(201).json({
          status: "success",
          data: { group: group, usersUpdated: users },
        });
      } catch (err) {
        res.status(400).json({
          status: "error",
          message: err,
        });
      }
}

module.exports.editGroup = async (req, res) => {
    try{
        const id = req.params.groupId;
        const groupData = req.body;

        const groupBefore = await Group.findById(id)
        const usersBefore = await User.updateMany(
            { _id: { $in: groupBefore.members } },
            { $pull: { groups: id } }
        );

        const group = await Group.findByIdAndUpdate(id, groupData);

        const users = await User.updateMany(
            { _id: { $in: req.body.members } },
            { $push: { groups: group._id } }
        );

        res.status(201).json({
            status: "succes",
            data: { group: group, users: users },
        })
    }

    catch(err){
        res.status(400).json({
            status: "error",
            message: err,
        });
    }

}

module.exports.getGroups = async (req, res) => {
    try{

        const id = req.params.userId;

        const membership = await Group.find(
            {members: id}
            )

        res.status(201).json({
           status: "succes",
            data: membership,
        });
    }

    catch (err){
        res.status(400).json({
            status: "error",
            message: err,
        });

    }
}

module.exports.deleteGroup = async (req,res) => {
    try{

        const id = req.params.groupId;

        const groupBefore = await Group.findById(id)
        const usersBefore = await User.updateMany(
            { _id: { $in: groupBefore.members } },
            { $pull: { groups: id } }
        );

        const group = await Group.findByIdAndDelete(
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