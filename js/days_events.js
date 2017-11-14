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
      for(var j = 0; j < current[i].contacts.length; j++) {
        if(owner == current[i].contacts[j].contact_name) {
          console.log("HERE");
          gen = true;
        }
      }
      if(gen) {

        var startDate = new Date(current[i].start);
        var endDate = new Date(current[i].end);
        var startHour = startDate.getHours();
        var startMin = startDate.getMinutes();
        var endHour = endDate.getHours();
        var endMin = endDate.getMinutes();

        var newD = getDateShown_t();
        var dStr =  newD.getMonth()+' '+newD.getDate()+', '+newD.getFullYear()

        if((startDate.getMonth()+' '+startDate.getDate()+', '+startDate.getFullYear())==dStr) {

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
  }
  //return current;
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
  console.log(d);
  document.getElementById('this_day').value = monthValues_short[d.getMonth()]+" "+d.getDate();
  d.setDate(d.getDate() - 3);
  console.log(d);
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
  location.href = "TodaysEvents.html";
}
