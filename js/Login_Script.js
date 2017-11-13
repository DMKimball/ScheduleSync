$(document).ready(function() {

	setDate();
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

function setDate(){
	var today = new Date().toString();
	console.log(today);
	/*
	var dateElements =
										{
											day: today.getDay(),
											date: today.getDate(),
											month: today.getMonth(),
											year: today.getFullYear(),
										}
	console.log(dateElements);
	*/
	localStorage.setItem('dateShown_t', today);
	console.log(localStorage.getItem('dateShown_t'));

}
