/**
 * Created by v3xvard on 24/9/15.
 */
/**
 * Comment.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    post: {
      model :'post'
    },
    comment: {
      type: 'string',
      required: true
    },
    postedBy: {
      type: 'string',
      defaultsTo: ''
    }
  }
};

