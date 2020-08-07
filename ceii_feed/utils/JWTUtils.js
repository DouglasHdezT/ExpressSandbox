const jwt = require("jsonwebtoken");
const secret = process.env.JWTSECRET || "Secret";
const expTime = process.env.JWTEXPTIME || "1m";

const tools = {};

tools.createToken = (_id) => { 
	const payload = {
		_id
	};

	return jwt.sign(payload, secret, {
		expiresIn: expTime,
	})
}

tools.verifyToken = (token) => { 
	try {
		return jwt.verify(token, secret);
	} catch (error) { 
		return false;
	}
}

module.exports = tools;