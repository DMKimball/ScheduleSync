// javascript file for managing contacts

var num_contacts = 0;
var curr_contacts = []
//function to grab the contacts at page load time
function grabContacts() {
	curr_contacts = JSON.parse(localStorage.getItem('contacts'));
}
grabContacts();
function addContact(event) {
	contacts = [];
	grabContacts();
	//grab current contacts
	for(var count = num_contacts; count <= num_contacts; count++) {
		var name = $('#contact_name_create_manage' + count).val();
		var email = $('#contact_e-mail_create_manage' + count).val();
		contacts.push({name: name, email: email});
	}
	if (localStorage.getItem('contacts') != null) {
		var current = curr_contacts.concat(contacts);
		localStorage.setItem('contacts',JSON.stringify(current));
	}
	else {
		localStorage.setItem('contacts',JSON.stringify(contacts));
	}
	
	
};

function setUpContacts() {
	num_contacts++;
	var source = $("#contact_template_manage").html(); //get html
	var template = Handlebars.compile(source); //make it usable
	var parentdiv = $("#contacts_start_manage");
	var htmloutput = template({contact_index:num_contacts});
	parentdiv.append(htmloutput);
}

$(document).ready(
	function() {
		grabContacts();
		setUpContacts();
		$('#add_contact_manage').click(function() {addContact(); setUpContacts();});
		

	}
);
