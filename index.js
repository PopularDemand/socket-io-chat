//// EXPRESS ////

// var app = require('express')();
// var http = require('http').Server(app);
// var io =  require('socket.io')(http);

// app.get('/', function(request, response) {
//   response.sendFile(__dirname + '/index.html');
// });

// io.on('connection', function(socket) {
//   console.log('a user connected');

//   // on([emitted key], function([emitted value]){} )
//   socket.on('chat-message', function(msg){
//     io.emit('chat-message-from-server', msg);
//   });
//   socket.on('disconnect', function() {
//     console.log('a user disconnected');
//   });
// });

// http.listen(3000, function() {
//   console.log("listening on 3000")
// })


//// HAPI ////

var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({ port: 3000 });

// socketio attaches itself to the listening server
var io = require('socket.io')(server.listener);

server.register(require('vision'), function(err) {
  if (err) throw err;

  server.route({
    method: 'GET',
    path: '/',
    handler: function(request, reply) {
      reply.view('index');
    }
  })

  server.views({
    engines: {
      html: require('handlebars')
    },
    relativeTo: __dirname,
    path: 'templates'
  })
})

io.on('connection', function(socket) {
  console.log('a user connected');

  socket.on('chat-message', function(msg) {
    io.emit('chat-message-from-server', msg);
  });
  socket.on('disconnect', function() {
    console.log('a user disconnected');
  });
});

server.start(function(){
  console.log('shits on fire yo');
})