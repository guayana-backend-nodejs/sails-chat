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

    create: function(req,res,next){

    	// if username is empty
    	if(!req.param('username')){

			var usernameRequiredError = [{ 	name: 'usernameRequired', 
													message: 'You must enter a username!.'}]; 

			req.session.flash= {
				err: usernameRequiredError
			}

			res.redirect('/home/index');
			return;
		}

		// create user and sessions
		User.create({username: req.param('username')},function userCreated (err,user){
			if(err) {
				console.log(err); 
				req.session.flash = {
					err:err
				}
				res.redirect('/home/index');
				return;
			}
			req.session.authenticated = true;
			req.session.User = user;
			// console.log(req.session);
			res.redirect('/ChatRoom/render/'+req.param('slug'));
			});
    }
};

