$(document).ready(function() {
  fillFields();
});

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
