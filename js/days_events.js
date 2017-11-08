$(document).ready(function() {
  var name = localStorage.getItem('username');
  // Generate events based on sharing
  $('#event_table').append('<tr><td><a href="EditEvent.html"><input class="event_button" type="button" value="Sample Event #1"></input></a></td></tr>');
  document.getElementById('day_date').innerHTML = getTodaysDate();
});


function deleteEvent(){

}

function getTodaysDate() {
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
  //var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+'\n'+dayValues[today.getDay()];
  return dayValues[today.getDay()]+"<br/>"+date;
}

function setDate(d,m,y){
  localStorage.setItem('dateView', d+'/'+m+'/'+y);
}
