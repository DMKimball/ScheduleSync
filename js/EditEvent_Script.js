// header
var notification_data = {
	'notification_num' : 0,
	'notification_attendee_nums' : []
};

//variable to store new attendees to events
var attendees = [];
var num_attendees = 0;

var eventIndex = -1;

function clearFields(event) {
	$('#event_name_edit').val('');
	$('#start_time_edit').val('');
	$('#end_time_edit').val('');
	$('#attendee_name_edit').val('');
	$('#attendee_e-mail_edit').val('');
	$('#event_name_edit').val('');
}

function editEvent(event) {
	//grab current array
	var raw_events_str = localStorage.getItem('event');
	var current_events = [];
	if (raw_events_str != null){
		current_events = JSON.parse(raw_events_str);
	}

	var namePrime = $('#event_name_edit').val();
	var start = $('#start_time_edit').val();
	var end = $('#end_time_edit').val();
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

	var eventToMake = {name: namePrime, email: email2, start: start, end: end, contacts: attendees, notifications: notification_list};
	current_events.splice(eventIndex, 1);
	current_events.push(eventToMake);
	console.log(JSON.stringify(current_events));
	localStorage.setItem('event',JSON.stringify(current_events));
};

function deleteEvent(event) {
	var current_events = JSON.parse(localStorage.getItem("event"));
	current_events.splice(eventIndex, 1);
	localStorage.setItem('event',JSON.stringify(current_events));
}

function updateRecipientLists() {
	console.log("Updating Recipient Lists...");
	for(var count = 1; count <= notification_data.notification_num; count++) {
		console.log("Updating for Notification " + count);
		var recipient_list_element = $("#recipient_start" + count);
		recipient_list_element.empty();

		var source = $("#notification_recipient").html(); //get html
		var template = Handlebars.compile(source); //make it usable
		for(var count2 = 0; count2 < attendees.length; count2++) {
			console.log("Adding recipient " + (count2+1));
			var recipient_name = attendees[count2].name;
			var text_name = recipient_name;
			if(recipient_name === localStorage.getItem("username")) text_name = text_name + " (You)";
			var htmlOutput = template({notification_num:count,recipient_num:count2+1,recipient_name:recipient_name, recipient_name_text:text_name});
			recipient_list_element.append(htmlOutput);
		}
	}
}

//updates list of attendees whenever a checkbox is checked or unchecked
function updateAttendees(event) {
	var attendee_name = $(this).attr("value");
	var attendee_email = "";

	var contacts_list = JSON.parse(localStorage.getItem("contacts"));
	for(var count = 0; count < contacts_list.length; count++) {
		if(contacts_list[count].name === attendee_name) {
			attendee_email = contacts_list.email;
			break;
		}
	}

	if($(this).prop("checked")) {
		for(var count = 0; count < attendees.length; count++) { //make sure you don't add duplicates
			if(attendees[count].name === attendee_name) {
				return;
			}
		}
		attendees.push({name:attendee_name, email:attendee_email})
	}
	else {
		for(var count = 0; count < attendees.length; count++) { //find contact to be removed
			if(attendees[count].name === attendee_name) {
				attendees.splice(count, 1);
				break;
			}
		}
	}

	updateRecipientLists();
}

function addAttendee(contact_data) {
	num_attendees++;
	var source = $("#attendee_template").html(); //get html
	var template = Handlebars.compile(source); //make it usable
	var parentDiv = $("#attendees_start");
	var htmlOutput = template(contact_data);
	parentDiv.append(htmlOutput);
	$("#attendee_checkbox" + num_attendees).change(updateAttendees);
};

function addNotification(event) {
	notification_data.notification_num++;
	notification_data.notification_attendee_nums.push(0);
	var source = $("#notification_template").html(); //get html
	var template = Handlebars.compile(source); //make it usable
	var parentDiv = $("#notifications_start");
	var htmlOutput = template(notification_data);
	parentDiv.append(htmlOutput);
	$("#add_recipient" + notification_data.notification_num).click(addRecipient);
	updateRecipientLists();
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
		$('#clear_edit').click(clearFields);
		$('#edit_confirm').click(editEvent);
		$('#edit_delete').click(deleteEvent);

		var all_events = JSON.parse(localStorage.getItem('event'));
		var edittedEvent = localStorage.getItem('eventEdit');
		var notif_list = [];

		for(var count = 0; count < all_events.length; count++) {
			if(all_events[count].name === edittedEvent) {
				edittedEvent = all_events[count];
				eventIndex = count;
				$('#event_name_edit').val(edittedEvent.name);
				$('#start_time_edit').val(edittedEvent.start);
				$('#end_time_edit').val(edittedEvent.end);
				notif_list = edittedEvent.notifications;
				attendees = edittedEvent.contacts;
				break;
			}
		}

		var contacts_list = JSON.parse(localStorage.getItem("contacts"));
		var current_user = localStorage.getItem("username");
		for(var count = 0; count < contacts_list.length; count++) {
			console.log("Adding attendee " + (count+1));
			var curr_contact = contacts_list[count].name;
			if(curr_contact === current_user) {
				var text_name = curr_contact + " (You)";
				addAttendee({attendee_index:count+1, attendee_name:curr_contact, attendee_name_text:text_name});
			}
			else addAttendee({attendee_index:count+1, attendee_name:curr_contact, attendee_name_text:curr_contact});
			for(var count2 = 0; count2 < attendees.length; count2++) {
				if(curr_contact === attendees[count2].name) {
					$("#attendee_checkbox" + (count+1)).prop("checked", true);
				}
			}
		}

		for(var count = 0; count < notif_list.length; count++) {
			addNotification();
			var notif = notif_list[count];
			$("#notification_text" + (count+1)).val(notif.desc);
			$("#minutes_offset" + (count+1)).val(notif.offset_num);
			$('input[name=offset_type'+count+']:checked').val(notif.offset_type);
		}
	}
);
