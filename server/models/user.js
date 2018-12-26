var mongoose = require('mongoose');

// var User = mongoose.model('User', {
// 	email : {
// 		type : String,
// 		required : true,
// 		trim : true,
// 		minLength : 1
// 	}
// });


// module.exports = {User};

var userSchema = new mongoose.Schema({
    email :  {type : String, required: true},
    password : {type : String, required : true},
    status : { type: Boolean, default: true },
    createdAt :  { type: Date, default: Date.now }
  });

userSchema.statics.getUserByEmail = (emailId, callback) => {
    var matchObj   = {'email' : emailId},
        projectObj = {__v : 0};
    User.find(matchObj, projectObj, (err, user) => {
      if(err){
        console.error(err);
        callback(err, null);
      }
      callback(null, user);
    });
    // .skip(0)
}

var User = mongoose.model('User', userSchema);

module.exports = {User};


