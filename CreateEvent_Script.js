// header

$('#clear_create').click(clearFields);
$('#create_create').click(createEvent);
//$('element_type').click(doSomething2);

//$('.element_class').click(doSomething3);

function clearFields(event) {
	$('#event_name_create').val('');
	$('#start_time_create').val('');
	$('#end_time_create').val('');
	$('#contact_name_create').val('');
	$('#event_name_create').val('');
}

function createEvent(event) {
	//grab current array
	if (localStorage.getItem('event') != null){
		var current = JSON.parse(localStorage.getItem('event'));
		var name = $('#event_name_create').val();
		var start = $('#start_time_create').val();
		var end = $('#end_time_create').val();
		var eventToMake = {name: name, start: start, end: end};
		current.push(eventToMake);
		localStorage.setItem('event',JSON.stringify(current));
	
	}
	else {
		var name = $('#event_name_create').val();
		var start = $('#start_time_create').val();
		var end = $('#end_time_create').val();
		var current = [{name: name, start: start, end: end}];
		localStorage.setItem('event', JSON.stringify(current)); 
	}
	//console.log(localStorage.getItem('event'));
	
}

function doSomething3(event) {
	$(this).hide();
}

