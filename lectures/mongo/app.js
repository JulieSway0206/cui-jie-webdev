/**
 * Created by SeedofWind on 6/10/17.
 */

// load mongoose library
var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;

var connectionString = 'mongodb://localhost/webdev'; // for local
if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
    var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds031561.mlab.com:31561/heroku_bf49z5k7'; // user yours
}




mongoose.connect(connectionString);







var blogPostSchema = mongoose.Schema({
    title: String,
    body: String,
    postDate: {type: Date, default: Date.now},
    thumsUp: {type: Number, default: 0}
}, {collection: 'blogpost'});

var blogModel = mongoose.model("BlogPost", blogPostSchema);





deleteBlogPost("593c38c8a18c952964649d76" )
    .then(function (status) {
        console.log(status);
        return findAllBlogPosts();

    })
    .then(function (posts) {
        console.log(posts);
    });


function deleteBlogPost(postId) {
   return blogModel.remove({_id: postId});
}






function updateBlogPost(postId, newPost) {
    return blogModel
        .update({_id: postId}, {
        $set: newPost
        });
}


function findBlogPostByTitle(title) {
    return blogModel.find({title: title});
}


function findBlogPostById(postId) {
    // return an array
    // return blogModel.find({_id: postId});
    // // return the object without in an array
    // return blogModel.findOne({_id: postId});
    return blogModel.findById(postId);
}


function findAllBlogPosts() {
    // return blogModel.find(function (err, docs) {
    //     return docs;
    // });
    return blogModel.find();
}


function createBlogPost(blogPost) {
    // blogModel.create(blogPost, function (err, doc) {
    //     console.log(doc);
    // });
      return blogModel
          .create(blogPost);
          // .then(function (doc) {
          //     console.log(doc);
          // }, function (err) {
          //     console.error(err);
          // });
}

// createBlogPost({title: 'Post 678', body: 'Body 678'})
//     .then(function (doc) {
//         console.log(doc);
//     }, function (err) {
//         console.error(err);
//     });

// findAllBlogPosts()
//     .then(function (posts) {
//         console.log(posts);
//     });

// findBlogPostById("593c333a02bcba275fc2da80")
//     .then(function (blogPost) {
//         console.log(blogPost);
//     });

// findBlogPostByTitle("Post 456")
//     .then(function (doc) {
//         console.log(doc);
//     }, function (err) {
//         console.error(err);
//     });

// updateBlogPost("593c38c8a18c952964649d76", {
//     body: 'Body 789 Body 789 Body 789 la la'
// })
//     .then(function (status) {
//         return findBlogPostById("593c38c8a18c952964649d76");
//
//     }, function (err) {
//         console.error(err);
//     })
//     .then(function (post) {
//         console.log(post);
//     }, function (err) {
//         console.error(err);
//     });
