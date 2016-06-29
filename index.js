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
  console.log('server listening');
})