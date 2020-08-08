const UserService = require("./../../services/User");
const controller = {}

controller.getUser = (req, res) => { 
    const { user } = req;
    if (!user) { 
        return res.status(404).json({
            error: "User not found"
        });
	}
	
    return res.status(200).json({...user._doc, validTokens: undefined});
}

controller.updateByID = async (req, res) => { 
	const { user } = req;

	const verifyField = UserService.verifyUpdateFields(req.body);
	if (!verifyField.success) { 
		return res.status(400).json(verifyField.content);
	}

	if (!user) { 
		return res.status(404).json({
			error: "User not found"
		});
	}

	try {
		const userUpdated = await UserService.updateByID(user, verifyField.content);
		if (!userUpdated.success) { 
			return res.status(409).json(userUpdated.content);
		}

		return res.status(200).json(userUpdated.content);
	} catch (error) {
		return res.status(500).json({
			error: "Internal Server Error"
		})
	}
}

module.exports = controller;