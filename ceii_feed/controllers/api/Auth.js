const UserService = require("../../services/User");
const { createToken } = require("../../utils/JWTUtils");

const controller = {};

controller.register = async (req, res) => { 
	const fieldsValidation = UserService.verifyRegisterFields(req.body);
	if (!fieldsValidation.success) { 
		return res.status(400).json(fieldsValidation.content);
	}

	try {
		const { username, email } = req.body;
		
		const userExists = await UserService.findOneByUsernameEmail(username, email);
		if (userExists.success) { 
			return res.status(409).json({
				error: "User already exists"
			})
		}

		const userRegistered = await UserService.register(req.body);
		if (!userRegistered.success) { 
			return res.status(409).json(userRegistered.content);
		}

		return res.status(201).json(userRegistered.content);

	} catch (error) {
		return res.status(500).json({
			error: "Internal Server Error"
		})
	}
}

controller.login = async (req, res) => { 
	const fieldsValidation = UserService.verifyLoginFields(req.body);
	if (!fieldsValidation.success) { 
		return res.status(400).json(fieldsValidation.content);
	}

	try {
		const { identifier, password } = req.body;

		const userExists = await UserService.findOneByUsernameEmail(identifier, identifier);
		if (!userExists.success) {
			return res.status(404).json(userExists.content);
		}

		if (!userExists.content.comparePassword(password)) {
			return res.status(403).json({
				error: "Incorrect Password"
			});
		}

		return res.status(200).json({
			token: createToken(userExists.content._id),
		})
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			error: "Internal server error"
		})
	}
}

module.exports = controller;