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

    // Validate User exits, if not create a new user.
    async.waterfall([
      // Find a User by username
      function findUser(callback){
        User.find({username: username}, function (err, user){
          if(err){
            return callback({
              err: err
            });
          }
          callback(null,user);
        });
      },
      // Create a new user if response of the last function is null
      function createUser(response,callback){

        // If null, create a new user
        console.log(response);
        if(Object.keys(response).length === 0){
            User.create({username: username},function userCreated (err,user){
            if(err) {
               return callback({
                err: err
              });
            }
            // authenticate user.
            callback(null, user);
          });  
        }else {
          // If response, authenticate user.
          callback (null, response);
        }
           
      }], 

      function (err, user){
        if(err){
          console.log(err);
          return;
        }else{
          req.session.authenticated = true;
          req.session.User = user;
          console.log(req.session);
        }
      });

   //    User.watch(req.socket);
   //    console.log('User with socket id '+req.socket.id+' is now subscribed to the model class \'users\'.');


   //    // Inform other sockets (e.g. connected sockets that are subscribed) that this user is now logged in
   //    User.publishUpdate(user.id, {
   //      loggedIn: true,
   //      id: user.id,
   //      name: user.name,
   //      action: ' has logged in.'
   //    });


   //    console.log(slug);
			// return res.redirect('/ChatRoom/render/'+slug);

			// });
    },


    subscribe: function(req, res) {

      if(req.session.autheticated){

        User.watch(req.socket);
        console.log('User with socket id '+req.socket.id+' is now subscribed to the model class \'users\'.');

      }

    }
};

