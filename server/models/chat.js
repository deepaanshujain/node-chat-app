var mongoose = require('mongoose');

var Todo = mongoose.model('Chats', {
	message : {
		type : String,
		required : true,
		trim : true,
		minLength : 1
	},
	userId : {
		type : String,
		required : true,
		trim : true,
		minLength : 1
	},
	completed : {
		type : Boolean,
		default : false
	},
	completedAt : {
		type : Number,
		default : null
	}
});

module.exports = {Todo};


var schema = new mongoose.Schema({
    message:  String,
    senderId: String,
    receiverId : 
    body:   String,
    comments: [{ body: String, date: Date }],
    createdAt: { type: Date, default: Date.now },
    hidden: Boolean,
    meta: {
      votes: Number,
      favs:  Number
    }
  });
var Tank = mongoose.model('Chats', schema);


