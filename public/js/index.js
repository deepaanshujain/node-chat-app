var socket = io();

var showDisplayName = true;
$('#email').on('keyup', function(e) {
	e.preventDefault();

	var email = $(this).val();

	var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (reg.test(email) === false) 
    {
        $(this).css('border', '2px solid red'); 
        $('#displayNameField').remove();
        showDisplayName = true;
        return false;
    } 

    $(this).css('border', '0px'); 


	socket.emit('checkUserType', {
		email : email
	}, function(data){
		console.log(data);
		if(data.userFound == 0) {
			if(showDisplayName == true) {
				str='<div id= "displayNameField" >';
				str+= '<div class= "form-field" id= "confirmPasswordField" ><label>Confirm Password</label><input type="password" id= "confirm_password" name="confirm_password" autofocus="" required></div>';
				str+= '<div class= "form-field" ><label>Display Name</label><input type="text" id= "display_name" name="name" autofocus="" required></div>';
				str+="</div>";
				$('#password_field').append(str);
				showDisplayName = false;
			}
		} else {
			$('#displayNameField').remove();
			showDisplayName = true;
		}
	});

});

$('#loginForm').on('submit', function(e) {
	e.preventDefault();

	var params =  new Object();
	params.email = $('#email').val();
	params.password = $('#password').val();

	var confirm_password = $('#confirm_password').val();
	if (typeof(confirm_password) != 'undefined' && confirm_password != null)
	{
		if(password != confirm_password) {
			alert('Please enter Same Password in Confirm Password Field');
			return;
		}
	}

	

	var display_name = $('#display_name').val();
	if (typeof(display_name) != 'undefined' && display_name != null)
	{
		params.confirm_password = $('#confirm_password').val();
	  	params.display_name = display_name;
	}
	console.log(params);

	socket.emit('vaidateUser', {
		params :params
	}, function(data){
		console.log('done');
	});


	// var email = $('#email').val();

	// if(email.trim().length == 0) {
	// 	alert('Email is required');
	// }
	// var password = $('#password').val();
	// var display_name = $('#display_name').val();



});