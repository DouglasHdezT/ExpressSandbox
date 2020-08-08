const PostModel = require('../models/Post');
const debug = require("debug")("log");

const service = {};

service.verifyCreateFields = ({ title, description, image }) => { 
	let serviceResponse = {
		success: true,
		content: {
			message: "Fields fine!"
		}
	}

	if (!title) { 
		serviceResponse = {
			success: false,
			content: {
				error: "Title is required!"
			}
		}
		return serviceResponse;
	}

	return serviceResponse;
}

service.verifyUpdateFields = ({ title, description, image }) => {
	let serviceResponse = {
		success: true,
		content: {},
	}

	if (!title && !description && !image) { 
		serviceResponse = {
			success: false,
			content: {
				error: "All fields are empty"
			}
		}
		return serviceResponse;
	}

	if (title) serviceResponse.content.title = title;
	if (description) serviceResponse.content.description = description;
	if (image) serviceResponse.content.image = image;

	return serviceResponse;
}

service.verifyUserAuthority = (post, user) => { 
	let serviceResponse = {
		success: true,
		content: {
			message:"User authority verified"
		}
	}
	if (!post.user._id.equals(user._id)) { 
		serviceResponse = {
			success: false,
			content: {
				error:"This post doesnt belong to you"
			}
		}
	}
	return serviceResponse;
}

service.create = async ({ title, description, image }, userID) => { 
	let serviceResponse = {
		success: true,
		content: {
			message: "Post Created!"
		}
	}

	try {
		const post = new PostModel({
			title,
			description,
			image,
			user: userID
		});

		const postSaved = await post.save();

		if (!postSaved) {
			serviceResponse = {
				success: false,
				content: {
					error: "Post not created!"
				}
			}
		}

		return serviceResponse;
	} catch (error) {
		throw error;
	}
}

service.findOneByID = async (_id) => { 
	let serviceResponse = {
		success: true,
		content: {
			message: "Post Found!"
		}
	}

	try {
		const post = await PostModel.findById(_id)
			.populate("user", "username photo _id")
			.exec();
		if (!post) {
			serviceResponse = {
				success: false,
				content: {
					error: "Post not found"
				}
			}
		} else { 
			serviceResponse.content = post;
		}

		return serviceResponse;
	} catch (error) { 
		throw error;
	}
}

service.findAllByUserID = async (userID) => { 
	let serviceResponse = {
		success: true,
		content: {}
	}

	try {
		const posts = await PostModel.find({ user: userID })
			.populate("user", "username photo _id")
			.exec();
		
		serviceResponse.content = posts;
		return serviceResponse;
	} catch (error) {
		throw error;
	}
}

service.findAll = async (page, limit) => { 
	let serviceResponse = {
		success: true,
		content: {}
	}

	try {
		const posts = await PostModel.find({}, undefined, {
			skip: page * limit,
			limit: limit,
			sort: [{
				createdAt: -1
			}]
		}).populate("user", "username photo _id").exec();

		serviceResponse.content = {
			posts,
			count: posts.length,
			page,
			limit
		}

		return serviceResponse;
	} catch (error) { 
		throw error;
	}
}

service.addLike = async (post) => { 
	let serviceResponse = {
		success: true,
		content: {
			message: "Post Liked!"
		}
	}

	try {
		post.likes += 1;
		const postUpdated = await post.save();

		if (!postUpdated) { 
			serviceResponse = {
				success: false,
				content: {
					message: "Post not Liked"
				}
			}
		}

		return serviceResponse;
	} catch (error) { 
		throw error;
	}
}

service.updateOneByID = async (post, contentToUpdate) => { 
	let serviceResponse = {
		success: true,
		content: {
			message: "Post Updated!"
		}
	}

	try {

		post.history.push({
			title: post.title,
			description: post.description,
			image: post.image,
			modifiedAt: new Date(),
		}); 

		Object.keys(contentToUpdate).forEach(key => { 
			post[key] = contentToUpdate[key];
		})

		const updatedPost = await post.save();

		if (!updatedPost) { 
			serviceResponse = {
				success: false,
				content: {
					error: "Post not updated!"
				}
			}
		}

		return serviceResponse;
	} catch (error) {
		throw error;
	}
}

service.deleteOneByID = async (_id) => {
	let serviceResponse = {
		success: true,
		content: {
			message:"Post deleted!"
		}
	}

	try {
		const postDeleted = await PostModel.findByIdAndDelete(_id).exec()
		if (!postDeleted) { 
			serviceResponse = {
				success: false,
				content: {
					error: "Post not deleted"
				}
			}
		}
		return serviceResponse;
	} catch (error) {
		debug(error);
		throw error;
	}
 }

module.exports = service;