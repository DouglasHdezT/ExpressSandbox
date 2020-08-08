const PostService = require("../../services/Post");
const UserService = require("../../services/User");

const { verifyID } = require('../../utils/MongoUtils');
const { verifyTypeNumber } = require('../../utils/MiscUtils');

const controller = {};

controller.create = async (req, res) => { 
	const fieldsValidation = PostService.verifyCreateFields(req.body);
	if (!fieldsValidation.success) { 
		return res.status(400).json(fieldsValidation.content);
	}

	try { 
		const { user } = req;
		const createPost = await PostService.create(req.body, user._id);
		if (!createPost.success) { 
			return res.status(409).json(createPost.content);
		}

		res.status(201).json(createPost.content);
	} catch (error) {
		return res.status(500).json({
			error: "Internal Server Error",
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
			error: "Internal Server Error"
		})
	}
}

controller.findAllByUser = async (req, res) => { 
	const { id = req.user._id } = req.query;

	if (!verifyID(id)) { 
		return res.status(400).json({
			error: "Error in ID"
		});
	}

	try {
		const userExists = await UserService.findOneByID(id);
		if (!userExists.success) { 
			return res.status(404).json(userExists.content);
		}

		const postsByUser = await PostService.findAllByUserID(id);
		return res.status(200).json(postsByUser.content);
		
	} catch (error) {
		return res.status(500).json({
			error: "Internal server error"
		})
	}
}

controller.findAll = async (req, res) => { 
	const { page = 0, limit = 10 } = req.query; 
	console.log(req.user);

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
			error: "Internal Server Error"
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
			error: "Internal Server Error"
		})
	}
}

controller.updatePost = async (req, res) => { 
	const { _id } = req.body;

	if (!verifyID(_id)) { 
		return res.status(400).json({
			error: "Error in ID"
		})
	}

	const fieldVerified = PostService.verifyUpdateFields(req.body);
	if (!fieldVerified.success) { 
		return res.status(400).json(fieldVerified.content);
	}

	try {
		const postExists = await PostService.findOneByID(_id);
		if (!postExists.success) { 
			return res.status(404).json(postExists.content);
		}

		const { user } = req;
		const userAuthority = PostService.verifyUserAuthority(postExists.content, user);
		if (!userAuthority.success) { 
			return res.status(401).json(userAuthority.content)
		}

		const postUpdated = await PostService.updateOneByID(
			postExists.content,
			fieldVerified.content,
		);

		if (!postUpdated.success) { 
			return res.status(409).json(postUpdated.content); 
		}

		return res.status(200).json(postUpdated.content);
	} catch (error) {
		return res.status(500).json({
			error: "Internal server error"
		})
	}
}

controller.deleteOneByID = async (req, res) => { 
  const { _id } = req.body;
  if (!verifyID(_id)) { 
    return res.status(400).json({
      error: "Error in ID"
    });
  }
  try {
    const postExist = await PostService.findOneByID(_id);
    if (!postExist.success) { 
      return res.status(404).json(postExist.content);
		}

		const { user } = req;
		const userAuthority = PostService.verifyUserAuthority(postExist.content, user);
		if (!userAuthority.success) { 
			return res.status(401).json(userAuthority.content)
		}

    const deleted = await PostService.deleteOneByID(_id);
    if (!deleted.success) { 
      return res.status(409).json(deleted.content)
    }
    res.status(200).json(deleted.content);
  } catch (error) {
    return res.status(500).json({
      error: "Internal Server Error"
    });
   }
}

module.exports = controller;