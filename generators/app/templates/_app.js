var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var port = <%= port %>;

app.use('/', express.static('public', {index: ['index.html']}));
app.use('/requirejs', express.static('node_modules/requirejs'));
app.use('/d3', express.static('node_modules/d3/build'));
app.use('/socketio', express.static('node_modules/socket.io-client/dist'))

var positions = Object.create(null);

var everyone = io
    .of('/<%= name %>')
    .on('connection', function(socket){
        console.log('connection established');
        var position = {x: Math.random() * 800, y: Math.random() * 600};
        positions[socket.id] = position;
        socket.emit('joined-channel', {positions: positions});
        socket.broadcast.emit('person-joined', {id: socket.id, position: position});

        socket.on('disconnect', function() {
            delete positions[socket.id];
            socket.broadcast.emit('person-left', {id: socket.id});
        });
    });

server.listen(port);