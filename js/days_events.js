$(document).ready(function() {
  var name = localStorage.getItem('username');
  //console.log(generateEvents());
  generateEvents();
  // Generate events based on sharing
  document.getElementById('day_date').innerHTML = generateDate();
});

document.getElementById("today_button").onclick = function() {generateToday()};

function generateDate() {
  var dayValues = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  var monthValues =
                    [
                    'January', 'February',
                    'March', 'April',
                    'May', 'June',
                    'July', 'August',
                    'September', 'October',
                    'November', 'December',
                    ]
  var today = new Date();
  var date = monthValues[today.getMonth()]+' '+today.getDate()+', '+today.getFullYear();
  localStorage.setItem('dateShown', today.getMonth()+' '+today.getDate()+', '+today.getFullYear());
  return dayValues[today.getDay()]+"<br/>"+date;
}

function setDate(d,m,y){
  localStorage.setItem('dateView', d+'/'+m+'/'+y);
}

function generateEvents() {
  if (localStorage.getItem('event') != null) {
    var current = JSON.parse(localStorage.getItem('event'));

    current.sort(function(a,b){
      return new Date(a.start) - new Date(b.start);
    });

    for (var i = 0; i < current.length; i++) {
      var startDate = new Date(current[i].start);
      var endDate = new Date(current[i].end);
      var startHour = startDate.getHours();
      var startMin = startDate.getMinutes();
      var endHour = endDate.getHours();
      var endMin = endDate.getMinutes();

      if((startDate.getMonth()+' '+startDate.getDate()+', '+startDate.getFullYear())==getDateShown()) {

      if(startHour >= 13) {
        startTime = (startHour-12).toString()+':';
        if(startMin<=9) {
          startTime = startTime+'0'+startMin.toString()+' PM';
        }
        else {
          startTime = startTime+startMin.toString()+' PM';
        }
      }
      else {
        startTime = startHour.toString()+':';
        if(startMin<=9) {
          startTime = startTime+'0'+startMin.toString()+' AM';
        }
        else {
          startTime = startTime+startMin.toString()+' AM';
        }
      }

      if(endHour >= 13) {
        endTime = (endHour-12).toString()+':';
        if(endMin<=9) {
          endTime = endTime+'0'+endMin.toString()+' PM';
        }
        else {
          endTime = endTime+endMin.toString()+' PM';
        }
      }
      else {
        endTime = endHour.toString()+':';
        if(endMin<=9) {
          endTime = endTime+'0'+endMin.toString()+' AM';
        }
        else {
          endTime = endTime+endMin.toString()+' AM';
        }
      }

      generateEventCard(current[i].name, startTime, endTime);
    }
    }
  }
  //return current;
}

function generateEventCard(eventName, eventStart, eventEnd) {
  $('#event_table').append('<tr><td><button id="'+eventName+'" class="event_button"  onclick="eventClicked(this.id)"                >Event : '+eventName+'<br/> Start: '+eventStart+'<br/> End: '+eventEnd+'</button></td></tr>');
}

function getDateShown(){
  return localStorage.getItem('dateShown');
}

function generateToday(){
  var today = new Date();
  console.log(today);
  localStorage.setItem('dateShown', today.getMonth()+' '+today.getDate()+', '+today.getFullYear());
}

function eventClicked(eventName) {
  localStorage.setItem('eventEdit', eventName);
  location.href = "EditEvent.html";
}
