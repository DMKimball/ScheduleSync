// header
var notification_data = {
	'notification_num' : 1,
	'event_name' : 'RandomEvent'
}


$('#clear_create').click(clearFields);

function clearFields(event) {
	$('#event_name_create').val('');
	$('#start_time_create').val('');
	$('#end_time_create').val('');
	$('#contact_name_create').val('');
	$('#event_name_create').val('');
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
