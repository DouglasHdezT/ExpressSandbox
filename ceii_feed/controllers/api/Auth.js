const UserService = require("./../../services/User");

const controller = {}

controller.register = async (req, res) => { 
    const fieldValidation = UserService.verifyRegisterFields(req.body);
    if (!fieldValidation.success) { 
        return res.status(400).json(fieldValidation.content)
    }
    try {
        const { username, email } = req.body;
        const userExists = await UserService.findOneUsernameEmail(username, email);
        
        if (userExists.success) { 
            return res.status(409).json({
                error: "User already exists"
            });
        }

        const userRegistered = await UserService.register(req.body)
        if (!userRegistered.success) { 
            return res.status(409).json(userRegistered.content);
        }
        return res.status(201).json(userRegistered.content);
    } catch (e) { 
        return res.status(500).json({
            error: "Internal Server Error"
        })
    }
}

module.exports = controller;