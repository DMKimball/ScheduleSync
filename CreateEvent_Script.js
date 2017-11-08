// header
var notification_data = {
	'notification_num' : 1,
	'event_name' : 'RandomEvent'
}

//variable to store new contacts to events
var contacts = []

$('#clear_create').click(clearFields);
$('#create_create').click(createEvent);
$('#add_new_contact_create').click(addContact);


function clearFields(event) {
	$('#event_name_create').val('');
	$('#start_time_create').val('');
	$('#end_time_create').val('');
	$('#contact_name_create').val('');
	$('#contact_e-mail_create').val('');
	$('#event_name_create').val('');
}

function createEvent(event) {
	//grab current array
	if (localStorage.getItem('event') != null){
		var current = JSON.parse(localStorage.getItem('event'));
		var name = $('#event_name_create').val();
		var start = $('#start_time_create').val();
		var end = $('#end_time_create').val();
		var owner = localStorage.getItem('username');
		var contacts = [owner];
		var eventToMake = {name: name, start: start, end: end, contacts: contacts};
		current.push(eventToMake);
		localStorage.setItem('event',JSON.stringify(current));
	}
	else {
		var name = $('#event_name_create').val();
		var start = $('#start_time_create').val();
		var end = $('#end_time_create').val();
		var owner = localStorage.getItem('username');
		var contacts = [owner];
		var current = [{name: name, start: start, end: end, contacts: contacts}];
		localStorage.setItem('event', JSON.stringify(current));
	}
	contacts = []
	//console.log(localStorage.getItem('event'));

}

function addContact(event) {
	var name = $('#contact_name_create').val();
	var email = $('#contact_e-mail_create').val();
	contacts.push({contact_name: name, email: email});
	$('#contact_name_create').val('');
	$('#contact_e-mail_create').val('');
}

function addNotification(event) {
	var source = $("#notification_template").html(); //get html
	var template = Handlebars.compile(source); //make it usable
	var parentDiv = $("#notifications_start");
	var htmlOutput = template(notification_data);
	parentDiv.append(htmlOutput);
	notification_data.notification_num++;
}

$(document).ready(
	function() {
		$('#add_notification').click(addNotification);
		addNotification();
	}
);
