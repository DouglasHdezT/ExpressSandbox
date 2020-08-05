const tools = {};

tools.verifyNumberType = (...nums) => { 
	const array = nums.map(num => isNaN(parseInt(num)));
	return !array.some(element => element === true);
}

module.exports = tools;