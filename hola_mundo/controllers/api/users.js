const controller = {};

controller.signUp = (req, res) => { 
	console.log(req.body);
	const { username, email, password } = req.body;

	console.log(`
		-----------------
		username: ${username}
		email: ${email}
		password: ${password}
		-----------------
	`);

	if (!username || !email || !password ) { 
		return res.status(400).json({
			msg: "Faltan campos :c"
		})
	}

	res.status(200).json({
		msg: "User registered",
	});
}

module.exports = controller;