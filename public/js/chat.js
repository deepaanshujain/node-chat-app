var socket = io();


function scrollToBottom() {
	var messages = $('#messages');

	var newMessage = messages.children('li:last-child');

	var clientHeight = messages.prop('clientHeight');
	var scrollTop = messages.prop('scrollTop');
	var scrollHeight = messages.prop('scrollHeight');
	var newMessageHeight = newMessage.innerHeight();
	var lastMessageHeight = newMessage.prev().innerHeight();

	if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
		messages.scrollTop(scrollHeight);
	}
}

socket.on('connect', function() {
	console.log('Connected to Server');
});

socket.on('disconnect' , function() {
	console.log('Disconnected From Server');
});

socket.on('newMessage', function(message) {
	var formattedTime = moment(message.createdAt).format('h:mm a');

	var template = $('#message-template').html();

	var html = Mustache.render(template, {
	 createdAt : formattedTime,
	 from : message.from,
	 text : message.text

	})
	//var li = $('<li></li>');
	//li.text(`${message.from} ${formattedTime}: ${message.text}`);
	$('#messages').append(html);
	scrollToBottom();
});

socket.on('newLocationMessage', function(message) {
	var formattedTime = moment(message.createdAt).format('h:mm a');

	var template = $('#location-message-template').html();

	var html = Mustache.render(template, {
	 createdAt : formattedTime,
	 from : message.from,
	 href : message.url

	})

	// var li = $('<li></li>');
	// var a = $('<a href= "" target="_blank">MY Current Location</a>')
	// li.text(`${message.from} ${formattedTime}: `);
	// a.attr('href', message.url);
	// li.append(a);
	$('#messages').append(html);
	scrollToBottom();
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
