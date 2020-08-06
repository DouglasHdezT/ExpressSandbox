const PostModel = require('../models/Post');

const service = {};

service.verifyCreateFields = ({ title, description, image, user }) => { 
	let serviceResponse = {
		success: true,
		content: {
			message: "Fields fine!"
		}
	}

	if (!title || !user) { 
		serviceResponse = {
			success: false,
			content: {
				error: "Empty fields!"
			}
		}
		return serviceResponse;
	}

	/**
	 * TODO: Verificación de tipo (ID Usuario), etc
	 */

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

service.create = async ({ title, description, image, user }) => { 
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
			user
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
		throw new Error("Internal Server Error");
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
		const post = await PostModel.findById(_id).exec();
		if (!post) {
			serviceResponse = {
				success: false,
				content: {
					error: "Post not found!"
				}
			}
		} else { 
			serviceResponse.content = post;
		}

		return serviceResponse;
	} catch (e) { 
		throw new Error("Internal Server Error");
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
				updatedAt: -1
			}]
		}).exec();

		serviceResponse.content = {
			posts,
			count: posts.length,
			page,
			limit
		}

		return serviceResponse;
	} catch (e) { 
		throw new Error("Internal Server Error");
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
	} catch (e) { 
		throw new Error("Internal Server Error");
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
		const updatedPost = await PostModel.findByIdAndUpdate(post._id, {
			...contentToUpdate,
			$push: {
				history: {
					title: post.title,
					description: post.description,
					image: post.image,
					modifiedAt: new Date(),
				}
			}
		});

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
		throw new Error("Internal server error")
	}
}

module.exports = service;