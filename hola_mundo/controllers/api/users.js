const controller = {};
const data = [
	"Douglas",
	"Pedro",
	"Alejandra",
	"Tupic",
	"Roberto",
	"Nelson",
	"Banchon",
	"Victor",
	"Lucho",
	"Elsy",
	"Cesar",
	"Alcoleas",
	"Karla",
	"David",
	"Francisco",
	"Moemeister",
	"Manuel",
	"Marlene",
	"Maxisun",
	"Salvador",
	"Sarita",
	"Richie",
	"Stanley",
	"Adolfo",
	"Ernesto",
	"Freddy",
	"Karen",
	"Oscar",
	"Rocio",
	"Rene",
	"Antonio"
];

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

controller.getUserByID = (req, res) => {
	const { id } = req.params;
	const idParsed = parseInt(id);

	if (isNaN(idParsed)) { 
		return res.status(400).json({
			msg: "Bad Request!"
		})
	}

	if (idParsed < 0 || idParsed >= data.length) { 
		return res.status(404).json({
			msg: "Not found"
		})
	}

	res.status(200).json({
		person: data[idParsed]
	});
}

module.exports = controller;