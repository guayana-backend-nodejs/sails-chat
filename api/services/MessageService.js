/**
 * Created by ronsuez on 1/28/15.
 */

module.exports = {
  getMessagesForChatRoom : getMessages

}

function getMessages(chatSlug,callback){

  ChatRoom.findOne({
    slug: chatSlug
  }, function(err, chatRoom){
    if (err)
      return callback({
        err: err
      });

    if(!chatRoom){
      return callback({
        err: ['The ChatRoom doesn\'t exits']
      });
    }else{
      console.log('Retrieving Messages from' + chatRoom.id);


      Message.find({
        chatRoomId: chatRoom.id
      }, function (err, response){

        if (err)
          return callback({
            err: err
          });

        if(response.length > 0){

          return callback(null, {
            status: 'success',
            data : response
          });
        }else {
          return callback(null, {
            status: 'bad',
            message: 'no messages'
          });
        }


      });

    }
  });

}
