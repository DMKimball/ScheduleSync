// javascript file for managing contacts

var num_contacts = 0;

function addContact(event) {
	num_contacts++;
	var source = $("#contact_template_manage").html(); //get html
	var template = Handlebars.compile(source); //make it usable
	var parentDiv = $("#contacts_start_manage");
	var htmlOutput = template({contact_index:num_contacts});
	parentDiv.append(htmlOutput);
};

$(document).ready(
	function() {
		//$('#add_contact_manage').click(addContact);

		//addContact();
	}
);
