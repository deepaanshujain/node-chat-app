const express = require('express');
const http = require('http');
//const hbs = require('hbs');
const path = require('path');
const socketIO = require('socket.io');

var app = express();

var port = process.env.PORT || 3000;
//app.set('view engine', 'hbs');

var publicPath = path.join(__dirname, "../public");
console.log(publicPath);
app.use(express.static(publicPath));

var server = http.createServer(app);

var io = socketIO(server);

io.on('connection', (socket) => {
	console.log('New User Connected');

	socket.emit('newMessage', {
		from : "Admin",
		text : "Welcome to Chat App"
	});

	socket.broadcast.emit('newMessage', {
		from : "Admin",
		text : "New User Joined"
	});

	socket.on('createMessage', (message) => {
		io.emit('newMessage', {
			from : message.from,
			text : message.text,
			createdAt : new Date().getTime()
		});
	});

	

	socket.on('disconnect', () => {
		console.log('User Disconnected');
	});
});

server.listen(port, () => {
	console.log(`App started on Port ${port}`);
});