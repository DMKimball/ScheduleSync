// header

$('#clear_create').click(clearFields);
//$('element_type').click(doSomething2);

//$('.element_class').click(doSomething3);

function clearFields(event) {
	$('#event_name_create').val('');
	$('#start_time_create').val('');
	$('#end_time_create').val('');
	$('#contact_name_create').val('');
	$('#event_name_create').val('');
}

function doSomething2(event) {
	$(this).hide();
}

function doSomething3(event) {
	$(this).hide();
}

