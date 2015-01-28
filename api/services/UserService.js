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
    cb(err, user);
  });
}

function findOrCreate(params,cb){

  var username = params.username;

   async.waterfall([
     function findUser(callback){
       getUser('username', username, function response(err, user){
            if( err) callback(err);

            if(!user){
              console.log('Creating a new User');
              User.create(params, function response(err, newUser){
                    if (err) callback(err);

                    callback(null, newUser, true);
              });
            }

            callback(null, user, false);
       });
     }
   ],function(err, result, created){
     if(err) cb(err);

     cb(null, result, created);
   });
}
