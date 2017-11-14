// header
var notification_data = {
	'notification_num' : 0,
	'notification_attendee_nums' : [],
	'event_name' : ''
};

//variable to store new attendees to events
var attendees = [];
var num_attendees = 0;

function clearFields(event) {
	$('#event_name_create').val('');
	$('#start_time_create').val('');
	$('#end_time_create').val('');
	$('#attendee_name_create').val('');
	$('#attendee_e-mail_create').val('');
	$('#event_name_create').val('');
}

function createEvent(event) {
	//grab current array
	if (localStorage.getItem('event') != null){
		var current = JSON.parse(localStorage.getItem('event'));
		var namePrime = $('#event_name_create').val();
		var start = $('#start_time_create').val();
		var end = $('#end_time_create').val();
		var owner = localStorage.getItem('username');
		var email2 = localStorage.getItem('email');

		var notification_list = [];
		for(var count = 1; count <= notification_data.notification_num; count++) {
			var desc = $('#notification_text' + count).val();
			var offset_num = $('#minutes_offset' + count).val();
			var offset_type = $('input[name=offset_type'+count+']:checked').val();
			var notif = {'desc': desc, 'offset_num': offset_num, 'offset_type': offset_type}
			notification_list.push(notif);
		}

		for(var count = 1; count < num_attendees; count++) {
			var name = $('#attendee_name_create' + count).val();
			var email = $('#attendee_e-mail_create' + count).val();
			attendees.push({contact_name: name, email: email});
		}
		attendees.push({contact_name: owner, email: email});

		var eventToMake = {name: namePrime, email: email2, start: start, end: end, contacts: attendees, notifications: notification_list};
		current.push(eventToMake);
		localStorage.setItem('event',JSON.stringify(current));
	}
	else {
		var namePrime = $('#event_name_create').val();
		var start = $('#start_time_create').val();
		var end = $('#end_time_create').val();
		var owner = localStorage.getItem('username');
		var email2 = localStorage.getItem('email');

		var notification_list = [];
		for(var count = 1; count <= notification_data.notification_num; count++) {
			var desc = $('#notification_text' + count).val();
			var offset_num = $('#minutes_offset' + count).val();
			var offset_type = $('input[name=offset_type'+count+']:checked').val();
			var notif = {'desc': desc, 'offset_num': offset_num, 'offset_type': offset_type}
			notification_list.push(notif);
		}

		for(var count = 1; count < num_attendees; count++) {
			var name = $('#attendee_name_create' + count).val();
			var email = $('#attendee_e-mail_create' + count).val();
			attendees.push({contact_name: name, email: email});
		}
		attendees.push({contact_name: owner, email: email});

		var current = [{name: namePrime, email: email2, start: start, end: end, contacts: attendees, notifications: notification_list}];
		localStorage.setItem('event', JSON.stringify(current));
	}
	attendees = []
	//console.log(localStorage.getItem('event'));

};

function addAttendee(event) {
	num_attendees++;
	var source = $("#attendee_template").html(); //get html
	var template = Handlebars.compile(source); //make it usable
	var parentDiv = $("#attendees_start");
	var htmlOutput = template({attendee_index:num_attendees});
	parentDiv.append(htmlOutput);
};

function addNotification(event) {
	notification_data.notification_num++;
	notification_data.event_name = $('#event_name_create').val();
	notification_data.notification_attendee_nums.push(0);
	var source = $("#notification_template").html(); //get html
	var template = Handlebars.compile(source); //make it usable
	var parentDiv = $("#notifications_start");
	var htmlOutput = template(notification_data);
	parentDiv.append(htmlOutput);
	$("#add_recipient" + notification_data.notification_num).click(addRecipient);
};

function addRecipient(event) {
	var notif_index = parseInt($(this).attr('id').substring(13));
	var recipient_index = ++notification_data.notification_attendee_nums[notif_index-1];

	var source = $("#notification_recipient").html(); //get html
	var template = Handlebars.compile(source); //make it usable
	var parentDiv = $("#recipient_start" + notif_index);
	var htmlOutput = template({notification_num:notif_index, recipient_num:recipient_index});
	parentDiv.append(htmlOutput);
};

$(document).ready(
	function() {
		$('#add_notification').click(addNotification);
		$('#clear_create').click(clearFields);
		$('#create_create').click(createEvent);
		$('#add_new_attendee_create').click(addAttendee);

		addNotification();
		addAttendee();
	}
);
