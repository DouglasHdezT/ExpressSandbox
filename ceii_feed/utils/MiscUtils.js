const tools = {};

tools.verifyTypeNumber = (...nums) => { 
	const auxArray = nums.map(num => isNaN(parseInt(num)));
	return !auxArray.some(element => element === true);
}

module.exports = tools;