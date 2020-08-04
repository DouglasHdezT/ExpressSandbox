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
	} catch (error) {
		serviceResponse = {
			success: false,
			content: {
				error: "Internal Server Error"
			}
		}
	} finally { 
		return serviceResponse;
	}
}

module.exports = service;