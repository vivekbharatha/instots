/**
 * PostController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  createPost: function (req, res, next) {
    var title = req.param('title'), content = req.param('content');

    if (!title || !content) return res.json({error: 'Missing Fields'});

    Post.create({title: title, content: content}).exec(function (err, post) {
      if (err) return res.json({error: err});
      if (req.isSocket) {
        Post.publishCreate(post, req);
        console.log('A new post -> ' + post.title + ' has been created!');
      }

      return res.json({success: 'Post to world', post: post});
    });
  },
  getPosts: function (req, res, next) {

    Post.find().sort('createdAt DESC').exec(function (err, posts) {
      if (err) return res.json({error: err});
      if (req.isSocket) {
        Post.watch(req);
        console.log('User with socket id ' + sails.sockets.id(req) + ' is now subscribed to the model class \'post\'.');
      }
      return res.json({posts: posts});
    });
  }

};

