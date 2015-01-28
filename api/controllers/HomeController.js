/**
 * HomeController
 *
 * @description :: Server-side logic for managing the App
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    index: function(req, res, next){
    	//cargar lista de rooms

    	// // var rooms = ChatRoom.find();
    	// console.log(ChatRoom.find());

    	ChatRoom.find({},function (err,chatrooms){
    		if(err) return next(err);

    		if(!chatrooms)return next("no hay");

    		console.log(chatrooms);
      		
      		res.view({rooms:chatrooms});
    	})
    }
};

