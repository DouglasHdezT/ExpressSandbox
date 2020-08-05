const PostService = require("../../services/Post");
const { verifyID } = require('../../utils/MongoUtils');
const { verifyTypeNumber } = require('../../utils/MiscUtils');

const controller = {};

controller.create = async (req, res) => { 
	const fieldsValidation = PostService.verifyCreateFields(req.body);
	if (!fieldsValidation.success) { 
		return res.status(400).json(fieldsValidation.content);
	}

	try { 
		const createPost = await PostService.create(req.body);
		if (!createPost.success) { 
			return res.status(500).json(createPost.content);
		}

		res.status(201).json(createPost.content);
	} catch (error) {
		return res.status(500).json({
			error: error.message,
		})
	}
}

controller.findOneByID = async (req, res) => { 
	const { _id } = req.params;

	if (!verifyID(_id)) { 
		return res.status(400).json({
			error: "Error in ID"
		})
	}

	try {
		const postExists = await PostService.findOneByID(_id);
		if (!postExists.success) { 
			return res.status(404).json(postExists.content);
		}

		return res.status(200).json(postExists.content);
	} catch (e) { 
		return res.status(500).json({
			error: e.message
		})
	}
}

controller.findAll = async (req, res) => { 
	const { page = 0, limit = 10 } = req.query; 

	if (!verifyTypeNumber(page, limit)) { 
		return res.status(400).json({
			error: "Mistype in query"
		})
	}

	try {
		const postsResponse = await PostService.findAll(parseInt(page), parseInt(limit));
		res.status(200).json(postsResponse.content);
	} catch(e){ 
		return res.status(500).json({
			error: e.message
		})
	}
}

controller.addLike = async (req, res) => { 
	const { _id } = req.body;

	if (!verifyID(_id)) { 
		return res.status(400).json({
			error: "Error in ID"
		})
	}

	try {
		const postExists = await PostService.findOneByID(_id);
		if (!postExists.success) {
			return res.status(404).json(postExists.content);
		}

		const likeAdded = await PostService.addLike(postExists.content);
		if (!likeAdded.success) { 
			return res.status(409).json(likeAdded.content);
		}

		return res.status(200).json(likeAdded.content);
	} catch (e) {
		return res.status(500).json({
			error: e.message
		})
	}
}
module.exports = controller;