const mongoose = require("mongoose");
const tools = {};

tools.verifyID = (_id) => { 
	if (!_id) {
		return false;
	}

	if (!mongoose.Types.ObjectId.isValid(_id)) { 
		return false;
	}

	return true;
}

module.exports = tools;