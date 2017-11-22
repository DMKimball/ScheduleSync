function logout() {
  localStorage.setItem('username', '');
  localStorage.setItem('email', '');
  window.location.assign("Login_Page.html");
}

$(document).ready(function() {
  var date = new Date(localStorage.getItem('month_date'));
  generateMonthYear(date);
  $('#logout_main_calendar').click(logout);
  $('#prev_month').click(changeMonthPrev);
  $('#next_month').click(changeMonthNext);
  $("#main_calendar").on("click", "td", changeDay);
  generateDays(date);
});

function genRow(d1,d2,d3,d4,d5,d6,d7) {
  var td1 = '<td class=element>'+d1+'</td>'; var td2 = '<td class=element>'+d2+'</td>';
  var td3 = '<td class=element>'+d3+'</ul></td>'; var td4 = '<td class=element>'+d4+'</td>';
  var td5 = '<td class=element>'+d5+'</td>'; var td6 = '<td class=element>'+d6+'</td>';
  var td7 = '<td class=element>'+d7+'</td>';
  $('#main_calendar').append('<tr class=day_rows>'+td1+td2+td3+td4+td5+td6+td7+'</tr>')
}

function generateDays(date) {
  date.setDate(1);
  var isFinal = false;
  var daysArray;
  var eventsArray;
  var start=0;
  var end;
  var events = '';

  while(isFinal == false) {
    daysArray=['','','','','','','',''];
    eventsArray=['','','','','','','',''];
    start = date.getDay();
    end = 6-start;
    for(end; end>=0; end--) {
      daysArray[start]=date.getDate()+'<ul>'+generateEvents(date);
      //Get events here ----------------------
      //eventsArray[start]=generateEvents(date);
      console.log(eventsArray[2]);
      //console.log(eventsArray[daysArray[start]]);
      //
      date.setDate(date.getDate()+1);
      if(date.getDate()==1){
        isFinal = true;
        break;
      }
      start++
    }
    //var tues = eventsArray[2];
    //console.log(eventsArray);
    genRow(daysArray[0],daysArray[1],daysArray[2],daysArray[3],daysArray[4],daysArray[5],daysArray[6]);
  }
}

function generateEvents(date) {
  var stringOfEvents=''
  if (localStorage.getItem('event') != null) {
    var current = JSON.parse(localStorage.getItem('event'));

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

        //Set bool to check if event should be displayed
        var d1 = new Date(date);
        var d2 = new Date(date);
        d1.setHours(23); d1.setMinutes(59); d1.setSeconds(59);
        d2.setHours(0); d2.setMinutes(0); d2.setMinutes(0);

        //Display event if it starts or ends on day shown.
        if(d1 >= startDate && d2 <= endDate) {
          //GENERATE EVENTS HERE
          stringOfEvents += '<li>'+current[i].name+'</li>';
        }
      }
    }
  }
  return stringOfEvents;
}

function changeMonthPrev(){
  var date = new Date(localStorage.getItem('month_date'));
  currentMonth = date.getMonth();
  currentYear = date.getFullYear();
  currentMonth--;
  console.log(currentMonth);
  if(currentMonth < 0) {
    currentMonth= 11;
    currentYear--;
  }
  date.setMonth(currentMonth);
  date.setYear(currentYear);
  date.setDate(1);
  localStorage.setItem('month_date', date.toString());
  $('.element').remove();
  $('.day_rows').remove();
  generateMonthYear(date);
  generateDays(date);
}

function changeMonthNext(){
  var date = new Date(localStorage.getItem('month_date'));
  currentMonth = date.getMonth();
  currentYear = date.getFullYear();
  currentMonth++;
  console.log(currentMonth);
  if(currentMonth > 11) {
    currentMonth= 0;
    currentYear++;
  }
  date.setMonth(currentMonth);
  date.setYear(currentYear);
  date.setDate(1);
  localStorage.setItem('month_date', date.toString());
  $('.element').remove();
  $('.day_rows').remove();
  generateMonthYear(date);
  generateDays(date);
}

function changeDay(event){
  var dateNum = parseInt($(this).text().substring(0,3));
  if(!isNaN(dateNum) && dateNum != 0) {
    var date = new Date(localStorage.getItem('month_date'));
    date.setDate(dateNum);
    localStorage.setItem('dateShown_t',date.toString());
    location.href = "TodaysEvents.html";
  }
}

function generateMonthYear(date){
  var monthValues =
                    [
                    'January', 'February',
                    'March', 'April',
                    'May', 'June',
                    'July', 'August',
                    'September', 'October',
                    'November', 'December',
                  ];
  var monthYear =  "<b>"+monthValues[date.getMonth()]+' '+date.getFullYear()+"</b>";
  document.getElementById('month_year').innerHTML = monthYear;
}
