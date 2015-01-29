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
				// console.log("error: "+ err);
				return next(err);
			}

      var socket = req.socket;
      var io = sails.io;

      io.sockets.emit('message', {message: message});
			return res.ok({
			status: 'success',
			data: message,
			});
		});
	}

};

