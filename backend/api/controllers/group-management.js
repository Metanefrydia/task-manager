const mongoose = require('mongoose');
const Group = mongoose.model('Group');
const User = mongoose.model('User');

module.exports.addGroup = async (req, res) => {
    try {
        const group = await Group.create(req.body);
        // update grup userka
        // $push
        // const user = await User.create(req.body){
        //
        // }

        //const announcement = await Announcement.create(req.body);
        //     const user = await User.findOneAndUpdate(
        //       { _id: req.body.createdBy },
        //       { $push: { createdAnnouncements: announcement._id } }
        //     );

        console.log("ID grupy: " + group._id);
        // console.log(req.body.members)
        req.body.members.forEach( (id) => {
            console.log('user id: ' + id);
            console.log('grupowe id: ' + group._id);
            const user = User.findOneAndUpdate(
                { _id: id },
                { $push: {groups: group._id} }
            );
            // console.log(user);
        });

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

// PUT edycja :C, GET ukradniecie grup uzytkownika

module.exports.editGroup = async (req, res) => {
    try{
        console.log(req.params);

        const id = req.params.groupId;
        const groupData = req.body;
        console.log("ID: " + id);
        console.log("BODYY: " + JSON.stringify(groupData));

        // ??????????????????
        const group = await Group.findByIdAndUpdate(id, groupData);
    //    ????????????????????????

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

        // const id = req.params.userId;
        // const membership = await Group.find
    }

    catch (err){
        res.status(400).json({
            status: "not wow",
            message: err,
        });

    }
}

