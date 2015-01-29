/**
 * Created by ronsuez on 1/28/15.
 */

module.exports = {
  findOrCreate: findOrCreate
}
/**
 * Get user
 * @method get
 * @param {String} paramName - criteria to search
 * @param {String} value - value of criteria
 */

function getUser(paramName, value, cb){

  var conditions = {};
  conditions[paramName] = value;
  User.findOne(conditions, function(err, user){

    if(err) cb(err);

    if(user){
        cb(null, user, true);
    }

    if(!user){
      console.log('new user');
      User.create(conditions, function response(err, newUser){
        if (err) {
          cb(err);
        }

        console.log(newUser);
        cb(err, newUser, false);
      });
    }

  });
}

function findOrCreate(username,cb){

   async.waterfall([
     function findUser(callback){
       getUser('username', username, function response(err, user, created){
         if(err) callback(err);

         callback(null, user, created);
       });
     }
   ],function(err, result, created){
     if(err) cb(err);

     cb(null, result, created);
   });
}
