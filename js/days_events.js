var dayValues = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var monthValues =
                  [
                  'January', 'February',
                  'March', 'April',
                  'May', 'June',
                  'July', 'August',
                  'September', 'October',
                  'November', 'December',
                ];

var monthValues_short =
                  [
                  'JAN', 'FEB',
                  'MAR', 'APR',
                  'MAY', 'JUN',
                  'JUL', 'AUG',
                  'SEP', 'OCT',
                  'NOV', 'DEC',
                ];

$(document).ready(function() {
  var name = localStorage.getItem('username');
  var d = new Date(localStorage.getItem('dateShown_t'))
  localStorage.setItem('month_date', d.toString());
  console.log(name);
  generateDateButtons();
  generateEvents();
  $('#logout_todays_events').click(logout);
  // Generate events based on sharing
  document.getElementById('day_date').innerHTML = generateDate();
});

document.getElementById("today_button").onclick = function() {generateToday()};


function logout() {
  localStorage.setItem('username', '');
  localStorage.setItem('email', '');
  window.location.assign("Login_Page.html");
}

function generateDate() {
  var today = getDateShown_t();
  //var today = new Date();
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

    console.log(current);

    current.sort(function(a,b){
      return new Date(a.start) - new Date(b.start);
    });

    for (var i = 0; i < current.length; i++) {
      var owner = localStorage.getItem('username');
      var gen = false;

      //gen <- true if current user is on event contact
      for(var j = 0; j < current[i].contacts.length; j++) {
        if(owner === current[i].contacts[j].name) {
          gen = true;
        }
      }
      //gen(erate) event if current user has permission to view it.
      if(gen) {

        //Get event start and end times
        var startDate = new Date(current[i].start);
        var endDate = new Date(current[i].end);
        var startHour = startDate.getHours();
        var startMin = startDate.getMinutes();
        var endHour = endDate.getHours();
        var endMin = endDate.getMinutes();

        //Set bool to check if event should be displayed
        var d = getDateShown_t();
        var dayShown =  d.getMonth()+' '+d.getDate()+', '+d.getFullYear();
        var startsToday = startDate.getMonth()+' '+startDate.getDate()+', '+startDate.getFullYear() == dayShown;
        var endsToday = endDate.getMonth()+' '+endDate.getDate()+', '+endDate.getFullYear() == dayShown;

        //Display event if it starts or ends on day shown.
        if(startsToday || endsToday) {
          //Date formating
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
          //Date formating
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
          //Display event on event button
          generateEventCard(current[i].name, startTime, endTime);
        }
      }
    }
  }
}

function generateEventCard(eventName, eventStart, eventEnd) {
  $('#event_table').append('<tr><td><button id="'+eventName+'" class="event_button"  onclick="eventClicked(this.id)"                >Event : '+eventName+'<br/> Start: '+eventStart+'<br/> End: '+eventEnd+'</button></td></tr>');
}

function getDateShown(){
  return localStorage.getItem('dateShown');
}
function getDateShown_t(){
  return new Date(localStorage.getItem('dateShown_t'));
}

function generateToday(){
  var today = new Date();
  localStorage.setItem('dateShown_t', today.toString());
  localStorage.setItem('month_date', today.toString());
  console.log(today);
  location.href = "TodaysEvents.html"
  //localStorage.setItem('dateShown', today.getMonth()+' '+today.getDate()+', '+today.getFullYear());
}

function eventClicked(eventName) {
  localStorage.setItem('eventEdit', eventName);
  location.href = "EditEvent.html";
}

function generateDateButtons(){
  d = getDateShown_t();
  document.getElementById('this_day').value = monthValues_short[d.getMonth()]+" "+d.getDate();
  d.setDate(d.getDate() - 3);
  document.getElementById('day1').value = monthValues_short[d.getMonth()]+" "+d.getDate();
  d.setDate(d.getDate() + 1);
  document.getElementById('day2').value = monthValues_short[d.getMonth()]+" "+d.getDate();
  d.setDate(d.getDate() + 1);
  document.getElementById('day3').value = monthValues_short[d.getMonth()]+" "+d.getDate();
  d.setDate(d.getDate() + 2);
  document.getElementById('day5').value = monthValues_short[d.getMonth()]+" "+d.getDate();
  d.setDate(d.getDate() + 1);
  document.getElementById('day6').value = monthValues_short[d.getMonth()]+" "+d.getDate();
  d.setDate(d.getDate() + 1);
  document.getElementById('day7').value = monthValues_short[d.getMonth()]+" "+d.getDate();
}

function goToDate(id) {
  d = getDateShown_t();
  if(id =="day1") {
    d.setDate(d.getDate() - 3);
  }
  else if(id=="day2") {
    d.setDate(d.getDate() - 2);
  }
  else if(id=="day3") {
    d.setDate(d.getDate() - 1);
  }
  else if(id=="day5") {
    d.setDate(d.getDate() + 1);
  }
  else if(id=="day6") {
    d.setDate(d.getDate() + 2);
  }
  else {
    d.setDate(d.getDate() + 3);
  }
  localStorage.setItem('dateShown_t', d.toString());
  localStorage.setItem('month_date', d.toString());
  location.href = "TodaysEvents.html";
}
