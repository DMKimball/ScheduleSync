// javascript file for managing contacts

var num_contacts = 0;
var curr_contacts = []

function contactComp(a, b) {
    if (a.name === b.name) return 0;
    if (a.name < b.name) return -1;
    else return 1;
}

//function to grab the contacts at page load time
function grabContacts() {
	var raw_contacts_str = localStorage.getItem('contacts');
    if (raw_contacts_str != null) curr_contacts = JSON.parse(raw_contacts_str);
    curr_contacts.sort(contactComp);
}

//update localStorage contacts list
function pushContacts() {
    curr_contacts.sort(contactComp);
	localStorage.setItem('contacts', JSON.stringify(curr_contacts));
}

//function to run at page load to generate the list of contacts
function genContacts(){
	//loop through the contacts list to add each one
	for (var i = 0; i < curr_contacts.length; i++){
		//num_contacts = i + 1;
		var temp_name = curr_contacts[i]['name'];
		var temp_email = curr_contacts[i]['email'];
		addContactField();
		$('#contact_name_create_manage' + (i + 1)).val(temp_name);
		$('#contact_e-mail_create_manage' + (i + 1)).val(temp_email);
	}
}

function addContact(event) {
	addContactField();
	curr_contacts.push({name:"", email:"", user:"0"});
	pushContacts();
};

function updateContact(event) {
	var button_id = $(this).attr('id');
	var index_str = button_id.substring(15);
	var index = parseInt(index_str);

	var temp_name = $('#contact_name_create_manage' + index).val();
	var temp_email = $('#contact_e-mail_create_manage' + index).val();
	curr_contacts[index-1] = {name:temp_name, email:temp_email, user:"0"};
	pushContacts();
	window.alert('you have Added or Updated to-----name: ' + temp_name + ' email: ' + temp_email);
};

function addContactField() {
	num_contacts++;
	var source = $("#contact_template_manage").html(); //get html
	var template = Handlebars.compile(source); //make it usable
	var parentdiv = $("#contacts_start_manage");
	//console.log(parentdiv);
	var htmloutput = template({contact_index:num_contacts});
	parentdiv.append(htmloutput);
	$("#update_contacts"+num_contacts).click(updateContact);
	$("#del_els_in_contacts"+num_contacts).click(deleteContact);
}

function deleteContact() {
	//grab the id of the calling object
	var button_id = $(this).attr('id');
	var index_str = button_id.substring(19);
	var index = parseInt(index_str);

	if (curr_contacts[index-1]['user'] == '1') {
		window.alert("Warning, can not delete the current user!!!");
		return;
	}

	curr_contacts.splice(index-1, 1);
	pushContacts();
	deleteAllContactFields();
	genContacts();
}

function deleteAllContactFields() {
	num_contacts = 0;
	$("#contacts_start_manage").empty();
}

$(document).ready(
	function() {
		grabContacts();
		genContacts();
		$('#add_contact_manage').click(addContact);
	}
);
