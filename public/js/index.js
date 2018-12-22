var socket = io();

socket.on('connect', function() {
	console.log('Connected to Server');



});

socket.on('disconnect' , function() {
	console.log('Disconnected From Server');
});

socket.on('newMessage', function(message) {
	var formattedTime = moment(message.createdAt).format('h:mm a');
	var li = $('<li></li>');
	li.text(`${message.from} ${formattedTime}: ${message.text}`);
	$('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
	var formattedTime = moment(message.createdAt).format('h:mm a');
	var li = $('<li></li>');
	var a = $('<a href= "" target="_blank">MY Current Location</a>')
	li.text(`${message.from} ${formattedTime}: `);
	a.attr('href', message.url);
	li.append(a);
	$('#messages').append(li);
});

$('#message-form').on('submit', function(e) {
	e.preventDefault();
	socket.emit('createMessage', {
		from : "User",
		text : $('[name=message]').val()
	}, function(data){
		$('[name=message]').val('');
	});

});


var locationButton = $('#send-location');

locationButton.on('click', function(){
	if (!navigator.geolocation) {
		return alert('Geolocation is not supported by our browser');
	}

	locationButton.attr('disabled', 'disabled').text('Sending Location..');

	navigator.geolocation.getCurrentPosition(function (position) {
		locationButton.removeAttr('disabled').text('Send Location');
		console.log(position);
		socket.emit('createLocationMessage', {
			longitude : position.coords.longitude,
			latitude : position.coords.latitude,
		});
	}, function() {
		locationButton.removeAttr('disabled').text('Send Location');
		alert('Unable to fetch Location');
	});
});
