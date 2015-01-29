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

    		if(!chatrooms){
         return res.view({
            room: []
          })
        }

      	return	res.view({rooms:chatrooms});
    	})
    },

    create: function(req,res, next){

      var username =  req.param('username')
      var slug = req.param('slug');


      UserService.findOrCreate(username, function response(err, user, created){

        if(err) return next(err);

        req.session.authenticated = true;
        req.session.User = user;

         console.log('User has logged in');
         console.log(user);
         User.publishCreate({
           id: user.id,
           loggedIn: true,
           username: user.username,
           action: (!created?' has logged in.':' has created and logged in.')
         });

        return res.redirect('/ChatRoom/render/'+slug);
      });
    },


    subscribe: function(req, res) {

        User.watch(req);
        res.ok({
          'status': 'success',
          'message': 'User with socket id '+req.socket.id+' is now subscribed to the model class \'users\'.'
        });

    }
};

