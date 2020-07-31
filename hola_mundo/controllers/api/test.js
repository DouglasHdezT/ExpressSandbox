const controller = {};

controller.getData = (req, res) => { 
	/**
	 * Flow logic
	 */

	res.status(200).json([
		{ name: "Douglas", age: 22 },
		{ name: "Pedro", age: 22 }
	])
}

controller.getPerson = (req, res) => { 
	res.status(200).json({
		name: "Douglas",
		age: 22
	}); 
}

controller.statusTest = (req, res) => {
	let name = "Douglas"; //Imaginacion body.name
	
	if (name !== undefined) {
		res.status(200).json({
			msg: "Todo bien!"
		})
	} else { 
		res.status(400).json({
			msg:"Chale, te faltó el name!"
		})
	}
}
 
controller.getMethod = (req, res) => { 
	res.status(200).json({
		msg: "Metodo GET"
	})
}

controller.postMethod = (req, res) => { 
	res.status(200).json({
		msg: "Metodo POST"
	})
}

controller.putMethod = (req, res) => { 
	res.status(200).json({
		msg: "Metodo PUT"
	})
}

controller.patchMethod = (req, res) => { 
	res.status(200).json({
		msg: "Metodo PATCH"
	})
}

controller.deleteMethod = (req, res) => { 
	res.status(200).json({
		msg: "Metodo DELETE"
	})
}

module.exports = controller;