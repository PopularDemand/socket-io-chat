var app = require('express')();
var http = require('http').Server(app);
var io =  require('socket.io')(http);

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  console.log('a user connected');

  // on([emitted key], function([emitted value]){} )
  socket.on('chat-message', function(msg){
    io.emit('chat-message-from-server', msg);
  });
  socket.on('disconnect', function() {
    console.log('a user disconnected');
  });
});

http.listen(3000, function() {
  console.log("listening on 3000")
})