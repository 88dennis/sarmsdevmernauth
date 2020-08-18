const mongoose = require('mongoose');

//SCHEMA
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: String,
    password: String,
    email: String,
    bio: String
});

//MODEL
//register your schema
//used to access/ create something in the db
const User = mongoose.model('User', UserSchema);

//EXPORT YOUR MODEL TO USE IT AND CONNECT TO OTHER FILES AND REQUIRE IT
module.exports = User;




// const mongoose = require('mongoose');

// //SCHEMA
// const Schema = mongoose.Schema;
// const BlogPostSchema = new Schema({
//     title: String,
//     body: String,
//     date: {
//         type: String,
//         default: Date.now(),
//     }
// });

// //MODEL
// //register your schema
// //used to access/ create something in the db
// const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

// //EXPORT YOUR MODEL TO USE IT AND CONNECT TO OTHER FILES AND REQUIRE IT
// module.exports = BlogPost;