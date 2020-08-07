const UserService = require("./../../services/User");
const controller = {}

controller.getUser = (req, res) => { 
    const { user } = req;
    if (!user) { 
        return res.status(404).json({
            error: "User not found"
        });
    }
    return res.status(200).json(user);
}

module.exports = controller;