// Callback for when the user clicks the "Send message" button in a public room
function onClickSendPublicMessage(e) {

  // Get the button that was pressed
  // var button = e.currentTarget;

  // Get the ID of the user we want to send to
  var roomId = e.attr('id');

  // Get the message to send
  var message = $('#room-message').val();
  // Input empty
  $('#room-message').val("");

  // Add this message to the room
  // addMessageToChatRoom(window.me.id, roomId, message);

  // Send the message
  io.socket.post('/Message/public', {chatRoomId: roomId, content: message});

}
// // Add HTML for a new message in a public room
// function addMessageToChatRoom(senderId, roomId, message) {

//   var roomName = 'room-messages-' + roomId;

//   if (senderId === 0) {
//     return postStatusMessage(roomName, message);
//   }

//   var fromMe = senderId == window.me.id;
//   var senderName = fromMe ? "Me" : $('#user-'+senderId).text();
//   var justify = fromMe ? 'right' : 'left'

//   // Aqui va el codigo para estilar el mensaje en la pantalla
//   var div = $('<div style="text-align:'+justify+'"></div>');
//   div.html('<strong>'+senderName+'</strong>: '+message);
//   $('#'+roomName).append(div);

// }

// // Handle an incoming public message from the server.
// function receiveRoomMessage(data) {

//   var sender = data.from;
//   var room = data.room;

//   // Create a room for this message if one doesn't exist
//   createPublicRoom(room);

//   // Add a message to the room
//   addMessageToChatRoom(sender.id, room.id, data.msg);

// }
