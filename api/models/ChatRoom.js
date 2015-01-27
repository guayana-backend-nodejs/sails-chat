/**
* ChatRoom.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var slugify = require("underscore.string/slugify");

module.exports = {


  schema: true,

  attributes: {
    title : {
      type: 'string',
      required: true
    },
    slug  : {
      type: 'string',
      required: true,
      unique: true
    }
  },
   beforeValidate: function(chatRoom, next){

     console.log('New Record');
     console.log(chatRoom);

     var newSlug = slugify(chatRoom.title);

     ChatRoom.findOne({
       slug: newSlug
     },function(err, record) {

       if(err) return next(err);

       //if a record exists
       if(record){
         console.log('Existing Room');
         console.log(record);
         return next({
           err: ["A record already exists with the same slug: "+ record.slug]
         });
       }else{

         chatRoom.slug = newSlug;
       }

       next();
     });
   }
};

