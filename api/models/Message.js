/**
* Message.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var slugify = require("underscore.string/slugify");
var moment = require('moment');
module.exports = {

  schema: true,

  attributes: {

    chatRoomId: {
      type: 'string',
      required: true
    },

    userId: {
      type: 'string',
      required: true
    },

    content: {
      type: 'string',
      required: true
    },
    toJSON: function() {
      var obj = this.toObject();
        obj.createdAt = moment(obj.createdAt, 'HH:MM:SS');
        return obj;
      }
  },
  beforeValidate: function(message, next){

    var chatRoomSlug = slugify(message.chatRoomId);

    ChatRoom.findOne({
      slug: chatRoomSlug
    },function(err, record) {

      if(err) return next(err);

      //if a record exists
      if(record){

        console.log(record);

          message.chatRoomId = record.id;

      }else{
        return next({
          err: ["The Chat Room doesn't exits "]
        });
      }

      next();
    });
  },

};

