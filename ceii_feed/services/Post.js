const PostModel = require("../models/Post");

const service = {};

service.verifyCreateFields = ({ title, description, image, user }) => { 
	let serviceResponse = {
		success: true,
		content: {
			message: "Fields fine!"
		},
	};

	if (!title || !user) { 
		serviceResponse = {
			success: false,
			content: {
				message: "Post not created"
			},
		};
		return serviceResponse;
	}

	/**
	 * TODO: Agregar validación de usuario.
	 */
	return serviceResponse;	
}

service.create = async ({ title, description, image, user }) => { 
	let serviceResponse = {
		success: true,
		content: {
			message: "Post created"
		}
	};

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
					message: "Post not created"
				}
			}
		}
	} catch (error) {
		serviceResponse = {
			success: false,
			content: {
				message: "Internal server error"
			}
		}
	} finally { 
		return serviceResponse;
	}
}

module.exports = service;