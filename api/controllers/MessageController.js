/**
 * MessageController
 *
 * @description :: Server-side logic for managing Messages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	create: function (req, res, next){

		console.log(req.params.all());

		Message.create(req.params.all(), function messageCreated(err, message){
			if(err){
				return next(err);
			}

      var io = sails.io;
      io.sockets.emit('message', {message: message});

			return res.ok({
			status: 'success',
			message: "Message Created!!: " + message.content
			});
		});
	},

	// Post a message in a public chat room
	public: function(req, res, next) {
		// Get the ID of the currently connected socket
		// var socketId = sails.sockets.id(req.socket);
		// console.log(socketId);
		// Use that ID to look up the user in the session
		// We need to do this because we can have more than one user
		// per session
		console.log(req.session);
		User.findOne(req.session.User.id).exec(function(err, user) {
			if(err){
				return next(err);
			}
			if(!user)
			{
				return next({
					    err: ["The User doesn't exits "]
				});
			}
			console.log(user);

			var message = [{
				userId: req.session.User.id,
				chatRoomId: req.param('chatRoomId'),
				content: req.param('content')
			}]

			MessageService.sendMessageToChatRoom(message,function(err, messages){
		        if (err)
		          return res.view({
		                err: "The message couldn't be send"
		              });

		      	console.log(message);
		       return res.ok(message);
			});
		});
	}
};

