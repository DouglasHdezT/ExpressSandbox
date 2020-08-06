const mongoose = require("mongoose");
const tools = {}

tools.verifyID = (_id) => { 
	if (!_id) { 
		return false;
	}

	return mongoose.Types.ObjectId.isValid(_id); 
}

module.exports = tools;