// javascript file for managing contacts

var num_contacts = 0;

function addContact(event) {
	var name = $('#contact_name_cc').val();
	var email = $('#contact_email_cc').val();
	if (localStorage.getItem('contacts') != null) {
		console.log('hello')
		var current = JSON.parse(localStorage.getItem('contacts'));
		current.push({name: name, email: email});
		localStorage.setItem('contacts',JSON.stringify(current));
	}
	else {
		localStorage.setItem('contacts',JSON.stringify([{name: name, email: email}]));
	}
};

$(document).ready(
	function() {
		$('#add_contact_cc').click(addContact);

	}
);
