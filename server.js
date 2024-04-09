var io = require('socket.io')(51530);
var subscribers = {};

io.on('connection', function(socket){
  console.log('A user connected');

  socket.on('disconnect', function(){
    console.log('User disconnected');
  });

  socket.on('subscribe', function(topic) {
    if (!subscribers[topic]) {
      subscribers[topic] = [];
    }
    subscribers[topic].push(socket);
    console.log('User subscribed to topic:', topic);
  });

  socket.on('publish', function(topic, message) {
    if (!subscribers[topic]) {
      return;
    }
    subscribers[topic].forEach(function(socket) {
      socket.emit(topic, message);
    });
    console.log('User published message:', message, 'to topic:', topic);
  });
});

