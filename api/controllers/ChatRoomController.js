/**
 * ChatRoomController
 *
 * @description :: Server-side logic for managing Chatrooms
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  index: function(req, res){
    res.view(); 
  },

  render: function( req, res){

    var chatSlug = req.param('chatSlug');

    ChatRoom.findOne({
      slug: chatSlug
    }, function(err, chatRoom){
          if (err)
             return res.serverError({
                err: err
              });

          if(!chatRoom){
             return res.badRequest({
               err: ['The ChatRoom doesn\'t exits']
             });
          }else{
            console.log('Retrieving Messages');

            Message.find({
              chatRoomId: chatRoom.id
            }, function (err, response){

              if (err)
                  return res.serverError({
                    err: err
                  });

              if(response.count > 0){

                return res.ok({
                  status: 'success',
                  data : response
                });
              }else {
                return res.notFound({
                  status: 'bad',
                  message: 'no messages'
                });
              }


            });

          }
    });
  }

};

