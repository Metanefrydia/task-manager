const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports.getUsers = async (req, res) => {
    try{
        const users = await User.find({});

        res.status(201).json({
            status: "success",
            data: { users: users },
        });

    } catch (err) {
        res.status(400).json({
            status: "error",
            message: err,
        });
    }
}