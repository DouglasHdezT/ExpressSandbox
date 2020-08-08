const Crypto = require("crypto");

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	hashedPassword: {
		type: String,
		default: ""
	},
	name: {
		type: String,
		required: true,
	},
	photo: String,
	savedPosts: {
		type: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Post"
		}]
	},
	validTokens: [String],
}, {
	timestamps: true
});

UserSchema
	.virtual("password")
	.set(function (password) { 
		this.hashedPassword = Crypto.createHmac("sha256", password).digest("hex");
	})

UserSchema.methods = {
	comparePassword: function (password) { 
		return (
			Crypto.createHmac("sha256", password).digest("hex") === this.hashedPassword
		);
	}
}	
module.exports = mongoose.model("User", UserSchema);