// header
var notification_num = 0;

var show_alternate = false;

//variable to store new attendees to events
var attendees = [];
var num_attendees = 0;

function clearFields(event) {
    $('#event_name_create').val('');

    var shownDate = new Date(localStorage.getItem("dateShown_t"));
    var defaultStart = shownDate.getFullYear() + "-" + (shownDate.getMonth() + 1) + "-" + shownDate.getDate() + "T" + shownDate.getHours() + ":00";
    var defaultEnd = shownDate.getFullYear() + "-" + (shownDate.getMonth() + 1) + "-" + shownDate.getDate() + "T" + shownDate.getHours() + ":30";

    $('#start_time_create').val(defaultStart);
    $('#end_time_create').val(defaultEnd);

    $('#notifications_start').empty();

    for (var count = 1; count <= num_attendees; count++) {
        if ($('#attendee_checkbox' + count).attr('value') === localStorage.getItem("username")) {
            $('#attendee_checkbox' + count).prop('checked', true);
        }
        else {
            $('#attendee_checkbox' + count).prop('checked', false);
        }
    }

    attendees = [{ name: localStorage.getItem("username"), email: localStorage.getItem("email") }];
}

function createEvent(event) {
	//grab current array
	var raw_events_str = localStorage.getItem('event');
	var current_events = [];
	if (raw_events_str != null){
		current_events = JSON.parse(raw_events_str);
	}

	var namePrime = $('#event_name_create').val();
	var start = $('#start_time_create').val();
    var end = $('#end_time_create').val();
    if (!(start && end)) {
        $('#warning_text').show();
        $('#time_row').css('background-color', 'red');
        return;
    }
	var owner = localStorage.getItem('username');

	var notification_list = [];
	for(var count = 1; count <= notification_num; count++) {
		var desc = $('#notification_text' + count).val();
		var offset_num = $('#minutes_offset' + count).val();
		var offset_type = $('input[name=offset_type'+count+']:checked').val();
		var notif = {'desc': desc, 'offset_num': offset_num, 'offset_type': offset_type}
		notification_list.push(notif);
	}

	var eventToMake = {name: namePrime, start: start, end: end, contacts: attendees, notifications: notification_list};
	current_events.push(eventToMake);
	console.log(JSON.stringify(current_events));
    localStorage.setItem('event', JSON.stringify(current_events));

    window.location.href = "TodaysEvents.html";
};

function updateRecipientLists() {
	//console.log("Updating Recipient Lists...");
	for(var count = 1; count <= notification_num; count++) {
		//console.log("Updating for Notification " + count);
		var recipient_list_element = $("#recipient_start" + count);
		recipient_list_element.empty();

		var source = $("#notification_recipient").html(); //get html
		var template = Handlebars.compile(source); //make it usable
		for(var count2 = 0; count2 < attendees.length; count2++) {
			//console.log("Adding recipient " + (count2+1));
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
			attendee_email = contacts_list[count].email;
			break;
		}
	}

	if($(this).prop("checked")) {
		for(var count = 0; count < attendees.length; count++) { //make sure you don't add duplicates
			if(attendees[count].name === attendee_name) {
				return;
			}
		}
    attendees.push({ name: attendee_name, email: attendee_email });
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
	var source = show_alternate ? $("#attendee_templateB").html() : $("#attendee_templateA").html(); //get html
	var template = Handlebars.compile(source); //make it usable
	var parentDiv = $("#attendees_start");
	var htmlOutput = template(contact_data);
	parentDiv.append(htmlOutput);
	if(!show_alternate) $("#attendee_checkbox" + num_attendees).change(updateAttendees);
};

function addAttendeeButton(event) {
  addAttendee({attendee_index:num_attendees+1, attendee_name:"Select Contact", attendee_name_text:"Select Contact"});
}

function deleteNotification(event) {
    var notif_index = parseInt($(this).attr('id').substring(19));

    for (var count = notif_index; count < notification_num; count++) {
        $('#notification_text' + count).val($('#notification_text' + (count + 1)).val());
        $('#minutes_offset' + count).val($('#minutes_offset' + (count + 1)).val());
        $('#' + $('input[name=offset_type' + (count + 1) + ']:checked').val() + count).prop('checked', true);
    }

    $('#notification' + notification_num).remove();
    notification_num--;
};

function addNotification(event) {
	notification_num++;
	var source = $("#notification_template").html(); //get html
	var template = Handlebars.compile(source); //make it usable
	var parentDiv = $("#notifications_start");
  var htmlOutput = template({ notification_num: notification_num });
	parentDiv.append(htmlOutput);
  $("#delete_notification" + notification_num).click(deleteNotification);
	updateRecipientLists();
};

function addRecipient(event) {
	var notif_index = parseInt($(this).attr('id').substring(13));

	var source = $("#notification_recipientA").html(); //get html
	var template = Handlebars.compile(source); //make it usable
	var parentDiv = $("#recipient_start" + notif_index);
	var htmlOutput = template({notification_num:notif_index, recipient_num:recipient_index});
	parentDiv.append(htmlOutput);
};

$(document).ready(
	function() {
    show_alternate = true;//localStorage.getItem("show_alternate");

    if(!show_alternate || show_alternate == null) {
      show_alternate = false;
      $('#attendee_button').hide();
    }
    else {
      $('#attendee_button').click(addAttendeeButton);
    }

		$('#add_notification').click(addNotification);
		$('#clear_create').click(clearFields);

    $('#create_create').click(function() {
  		if ("ga" in window){
  			tracker = ga.getAll()[0];
  			if(tracker){
  				tracker.send('event','create_event_confirm','click');
  			}
  		}
  		createEvent();
  	});

  	$('#cancel_create').click(function() {
  		if ("ga" in window){
  			tracker = ga.getAll()[0];
  			if(tracker){
  				tracker.send('event','create_event_cancel','click');
  			}
  		}
  		window.location.href = "TodaysEvents.html";
  	});

    var shownDate = new Date(localStorage.getItem("dateShown_t"));
    var defaultStart = shownDate.getFullYear() + "-" + (shownDate.getMonth()+1) + "-" + shownDate.getDate() + "T" + shownDate.getHours() + ":00";
    var defaultEnd = shownDate.getFullYear() + "-" + (shownDate.getMonth()+1) + "-" + shownDate.getDate() + "T" + shownDate.getHours() + ":30";

    $('#start_time_create').val(defaultStart);
    $('#end_time_create').val(defaultEnd);

    $('#warning_text').hide();

    attendees.push({ name: localStorage.getItem("username"), email: localStorage.getItem("email") });

    if(show_alternate) {
      
    }
    else {
      var contacts_list = JSON.parse(localStorage.getItem("contacts"));
  		var current_user = localStorage.getItem("username");
  		for(var count = 0; count < contacts_list.length; count++) {
  			var curr_contact = contacts_list[count].name;
  			if(curr_contact === current_user) {
  				var text_name = curr_contact + " (You)";
  				addAttendee({attendee_index:count+1, attendee_name:curr_contact, attendee_name_text:text_name});
  				$("#attendee_checkbox" + (count+1)).prop("checked", true);
  			}
  			else addAttendee({attendee_index:count+1, attendee_name:curr_contact, attendee_name_text:curr_contact});
  		}
    }

	}
);
