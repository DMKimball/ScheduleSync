$(document).ready(function() {
  fillFields();
});


document.getElementById("delete_edit").onclick = function() {deleteEvent()};

function deleteEvent(event) {
	//grab the identifiers - just name for now, probably want more, maybe a special id later or something
	var event_name = $('#eventName').val();
	//loop through the events to find the right one
	var eventList = JSON.parse(localStorage.getItem('event'));
	//find the event to delete
	for (i=0; i < eventList.length; i++){
		if(event_name == eventList[i].name) {
			//delete the event
			eventList.splice(i,1);
		}
	}
	//replace the localStorage
	localStorage.setItem('event',JSON.stringify(eventList));
  location.href="TodaysEvents.html"
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

document.getElementById("share_button").onclick = function() {prepareShare()};

function prepareShare(){
  localStorage.setItem('shareEvent', localStorage.getItem('eventEdit'));
  location.href = "ShareEvent.html";
}
