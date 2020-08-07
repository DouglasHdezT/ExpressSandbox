const UserModel = require("./../models/User")

const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,32})");
const emailRegex = new RegExp("^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$")

const service = {}

service.verifyRegisterFields = ({ username, email, password, name, photo }) => { 
    let serviceResponse = {
        success: true,
        content: {}
    }
    if (!username || !email || !password || !name) { 
        serviceResponse = {
            success: false,
            content: {
                error: "Required fields empty"
            }
        }
        return serviceResponse
    }

    if (!emailRegex.test(email)) { 
        serviceResponse = {
            success: false,
            content: {
                error: "Field format incorrect"
            }
        }
        return serviceResponse;
    }

    if (!passwordRegex.test(password)) { 
        serviceResponse = {
            success: false,
            content: {
                error: "Password must be 8-32 and strong"
            }
        }
        return serviceResponse;
    }
    return serviceResponse;
}

service.verifyLoginFields = ({ identifier, password }) => { 
	let serviceResponse = {
		success: true,
		content: {}
	}

	if (!identifier || !password) { 
		serviceResponse = {
			success: false,
			content: {
				error: "Required fields empty"
			}
		}

		return serviceResponse;
	}

	return serviceResponse;
}

service.verifyUpdateFields = ({ username, email, password, name, photo }) => { 
	let serviceResponse = {
		success: true,
		content: {},
	}

	if (
		!username && !email && !password &&
		!name && !photo
	) { 
		serviceResponse = {
			success: false,
			content: {
				error: "All fields are empty"
			}
		}
		return serviceResponse;
	}

	if (username) serviceResponse.content.username = username;
	
	if (email) { 
		if (!emailRegex.test(email)) { 
			serviceResponse = {
				success: false,
				content: {
					error: "Field format incorrect"
				}
			}
			return serviceResponse;
		}
		serviceResponse.content.email = email;	
	} 


	if (password) { 
		if (!passwordRegex.test(password)) { 
			serviceResponse = {
				success: false,
				content: {
					error: "Password must be 8-32 and strong"
				}
			}
			return serviceResponse;
		}

		serviceResponse.content.password = password;
	}

	if (name) serviceResponse.content.name = name;
	if (photo) serviceResponse.content.photo = photo;

	return serviceResponse;
}

service.findOneUsernameEmail = async (username, email) => { 
    let serviceResponse = {
        success: true,
        content: {}
    }

    try {
        const user = await UserModel.findOne({
            $or: [{ username: username }, {email: email}]
		}).exec()

        if (!user) {
            serviceResponse = {
                success: false,
                content: {
                    error: "User not found"
                }
            }
        } else { 
            serviceResponse.content = user;
        }
        return serviceResponse;
    } catch (error) { 
		throw error;
    }
}

service.findOneByID = async (_id) => { 
	let serviceResponse = {
		success: true,
		content: {}
	}
	
	try {
		const user = await UserModel.findById(_id)
			.select("-hashedPassword")
			.exec();
		
		if (!user) {
			serviceResponse = {
				success: false,
				content: {
					error: "User not found!"
				}
			}
		} else { 
			serviceResponse.content = user;
		}

		return serviceResponse;
	} catch (error) {
		throw error;
	}
}

service.register = async ({ username, email, password, name, photo }) => {
    let serviceResponse = {
        success: true,
        content: {
            message: "User registered"
        }
    }    
    try {
        const user = new UserModel({
            username,
            email,
            password,
            name,
            photo
        });
        const userSaved = await user.save()
        if (!userSaved) { 
            serviceResponse = {
                success: false,
                content: {
                    error: "User not registered"
                }
            }
        }
        return serviceResponse;
    } catch (error) { 
		throw error;
    }
}

service.updateByID = async (user, contentToUpdate) => { 
	let serviceResponse = {
		success: true,
		content: {
			message: "User updated"
		}
	}

	try {
		Object.keys(contentToUpdate).forEach(key => {
			user[key] = contentToUpdate[key];
		});
		
		const userUpdated = await user.save();

		if (!userUpdated) { 
			serviceResponse = {
				success: false,
				content: {
					error: "User not updated"
				}
			}
		}

		return serviceResponse;
	} catch (error) {
		throw error;
	}
}

module.exports = service;