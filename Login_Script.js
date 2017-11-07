$(document).ready(function() {
	
	function login(event) {
		localStorage.setItem('username', $('#username_field').val());
		window.location.href = "TodaysEvents.html";
	}

	$('#loginbutton').click(login);

	$(document).keypress(function(event) {
    	if(event.which == 13) { //apparently 13 is the 'enter' key?
    		login(event);    
    	}
	});
});
