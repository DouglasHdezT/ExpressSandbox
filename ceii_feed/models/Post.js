const mongosee = require("mongoose");
const Schema = mongosee.Schema;

const PostSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	description: String,
	image: String,
	likes: {
		type: Number,
		default: 0,
	},
	user: {
		type: String,
		required: true,
	}
}, {
	timestamps: true,
});

module.exports = mongosee.model("Post", PostSchema);