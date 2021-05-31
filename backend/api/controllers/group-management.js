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

// PUT edycja :C, GET ukradniecie grup uzytkownika

module.exports.editGroup = async (req, res) => {
    try{
        const id = req.params.groupId;
        const groupData = req.body;

        const group = await Group.findByIdAndUpdate(id, groupData);

        res.status(201).json({
            status: "very succes much wow",
            data: { group: group },
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
        console.log(req.params)

        const id = req.params.userId;
        const membership = await Group.find(
            {members: id}
            )

        console.log(membership);

        res.status(201).json({
           status: "gucci versace",
            message: membership,
        });
    }

    catch (err){
        res.status(400).json({
            status: "not wow",
            message: err,
        });

    }
}

