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

    MessageService.getMessagesForChatRoom(chatSlug, function(err, messages){
        if (err)
          return res.view({
                chatRoomName: chatSlug,
                messages : []
              });


        return res.view({
          chatRoomName: chatSlug,
          messages: messages
        });

    });
  }

};

