/**
 * HomeController
 *
 * @description :: Server-side logic for managing the App
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    index: function(req, res, next){

    	ChatRoom.find({},function (err,chatrooms){
    		if(err) return next(err);

    		if(!chatrooms)return next("no hay");

    		// console.log(chatrooms);

      		res.view({rooms:chatrooms});
    	})
    },

    create: function(req,res){

      var slug =  req.param('slug');
      var username = req.param('username');

    	// if username is empty
    	if(!username){

			var usernameRequiredError = [{
            name: 'usernameRequired',
            message: 'You must enter a username!.'}];

			req.session.flash= {
				err: usernameRequiredError
			}

        return res.redirect('/home/index');

		}

		// create user and sessions
		User.create({username: username},function userCreated (err,user){
			if(err) {
				console.log(err);
				req.session.flash = {
					err:err
				}
        return res.redirect('/home/index');
			}

      req.session.authenticated = true;
			req.session.User = user;
			console.log(req.session);


      // Inform other sockets (e.g. connected sockets that are subscribed) that this user is now logged in
      User.publishUpdate(user.id, {
        loggedIn: true,
        id: user.id,
        name: user.name,
        action: ' has logged in.'
      });

      req.socket.emit('userLogin',{user: user});

      console.log(slug);
			return res.redirect('/ChatRoom/render/'+slug);

			});
    },


    subscribe: function(req, res) {

      if(req.session.autheticated){

        User.watch(req.socket);
        console.log('User with socket id '+req.socket.id+' is now subscribed to the model class \'users\'.');

      }

    }
};

