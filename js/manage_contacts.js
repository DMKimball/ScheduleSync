// javascript file for managing contacts

var num_contacts = 0;
var curr_contacts = []
//function to grab the contacts at page load time
function grabContacts() {
	curr_contacts = JSON.parse(localStorage.getItem('contacts'));
}
grabContacts();

//function to run at page load to generate the list of contacts
function genContacts(){
	grabContacts();
	//loop through the contacts list to add each one
	for (var i = 0; i < curr_contacts.length; i++){
		var temp_name = curr_contacts[i]['name'];
		var temp_email = curr_contacts[i]['email'];
		setUpContacts();
		$('#contact_name_create_manage' + (i + 1)).val(temp_name);
		$('#contact_e-mail_create_manage' + (i + 1)).val(temp_email);
	}
}
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
	grabContacts();
	
};

function setUpContacts() {
	num_contacts++;
	var source = $("#contact_template_manage").html(); //get html
	var template = Handlebars.compile(source); //make it usable
	var parentdiv = $("#contacts_start_manage");
	var htmloutput = template({contact_index:num_contacts});
	parentdiv.append(htmloutput);
}

function findContact() {
	//find out which contact to delete
	console.log('FINDFINDFINDFINDFIND');
	for(var count = 1; count < num_contacts; count++) {
		del_name = $('#contact_name_create_manage'+count).val();
		//console.log(del_name);
		$('#del_els_in_contacts' + count).click(deleteContact(del_name, count));
	}
}

function deleteContact(del_name, index) {
	console.log('DELDELDELDELDELDELDEL');
	console.log(del_name);
	grabContacts();
	/*for (var count = 0; count < curr_contacts.length; count++){
		console.log(count);
		console.log(num_contacts);
		if (curr_contacts[count]['name'] == del_name) {
			//delete the element
			curr_contacts.splice(count, 1);
			//update local storage
			localStorage.setItem('contacts',JSON.stringify(curr_contacts));
			$('#contact_name_create_manage' + count).val('');
			$('#contact_e-mail_create_manage' + count).val('');
			break;
		}
	}*/

	grabContacts();
}

function deleteIt() {
	//grab the id of the calling object
	var ID = $(this).attr('id');
	console.log(ID);
	var ind = ID.slice(ID.length - 1, ID.length);
	console.log(ind);
	var index = parseInt(ind);
	//grab the email to delete
	var email = $('#contact_e-mail_create_manage'+ind).val();
	var name = $('#contact_name_create_manage'+ind).val();
	$('#contact_e-mail_create_manage'+ind).val('');
	$('#contact_name_create_manage'+ind).val('');

	//update storage
	grabContacts();
	//remove the offending contact
	curr_contacts.splice(index - 1, 1);
	//place other contacts back in
	localStorage.setItem('contacts',JSON.stringify(curr_contacts));
	
}

$(document).ready(
	function() {
		grabContacts();
		genContacts();
		setUpContacts();
		$('#add_contact_manage').click(function() {addContact(); setUpContacts();});
		$('.del_in_contacts').click(deleteIt);
	}
);
