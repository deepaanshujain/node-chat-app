var socket = io();

socket.on('connect', function() {
	console.log('Connected to Server');

	// socket.emit('createMessage', {
	// 	from : "Deepanshu",
	// 	text : "this is chat message from client"
	// });

});

socket.on('disconnect' , function() {
	console.log('Disconnected From Server');
});

socket.on('newMessage', function(message) {
	console.log(message);
});