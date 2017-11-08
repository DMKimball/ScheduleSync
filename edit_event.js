$(document).ready(function() {
  fillFields();
});


$('#delte_edit').click(deleteEvent);

function deleteEvent(event) {
	//grab the identifiers - just name for now, probably want more, maybe a special id later or something
	var event_name = $('#eventName').val()
	
}

function fillFields(){
  var eventName = localStorage.getItem('eventEdit')
  document.getElementById('eventName').value = eventName;
  var current = JSON.parse(localStorage.getItem('event'));
  for (var i = 0; i < current.length; i++) {
    if(current[i].name == eventName) {
      var startDate = current[i].start
    }
  }
  document.getElementById('eventStart').value = startDate;
}

document.getElementById("confirm_button").onclick = function() {updateEvent()};

function updateEvent(){
  var eventName = localStorage.getItem('eventEdit')
  var current = JSON.parse(localStorage.getItem('event'));
  for (var i = 0; i < current.length; i++) {
    if(current[i].name == eventName) {
      var startDate = current[i].start
      current[i].name = $('#eventName').val();
      current[i].start = $('#eventStart').val();
    }
  }
  localStorage.setItem('event',JSON.stringify(current));
  location.href = "TodaysEvents.html";
}
