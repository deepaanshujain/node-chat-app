const express = require('express');
const http = require('http');
//const hbs = require('hbs');
const path = require('path');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

var app = express();

var port = process.env.PORT || 3000;
//app.set('view engine', 'hbs');

var publicPath = path.join(__dirname, "../public");
console.log(publicPath);
app.use(express.static(publicPath));

var server = http.createServer(app);

var io = socketIO(server);

var users = new Users();

io.on('connection', (socket) => {
	console.log('New User Connected');

	

	socket.on('createMessage', (message, callback) => {
		console.log(message);
		io.emit('newMessage', generateMessage(message.from, message.text));
		callback('This is from server');
	});

	socket.on('createLocationMessage', (message, callback) => {
		console.log(message);
		io.emit('newLocationMessage', generateLocationMessage("Admin", message.latitude,message.longitude));
	});

	socket.on('join', (params, callback) => {
		if(!isRealString(params.name) || !isRealString(params.room)) {
			callback('Name and Room are required');
		}

		socket.join(params.room);
		users.removeUser(socket.id);
		users.addUser(socket.id, params.name, params.room);

		io.to(params.room).emit('updateUserList', users.getUserList(params.room));

		socket.emit('newMessage', generateMessage("Admin", "Welcome to Chat App"));

		socket.broadcast.to(params.room).emit('newMessage', generateMessage("Admin", `${params.name } has joined`));

		callback();
	});

	

	socket.on('disconnect', () => {
		var user = users.removeUser(socket.id);

		if(user) {
			io.to(user.room).emit('updateUserList',  users.getUserList(user.room));
			io.to(user.room).emit('newMessage', generateMessage("Admin", `${user.name} has left`));
		}
		console.log('User Disconnected');
	});
});



server.listen(port, () => {
	console.log(`App started on Port ${port}`);
});