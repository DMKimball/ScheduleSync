function logout() {
  localStorage.setItem('username', '');
  localStorage.setItem('email', '');
  window.location.assign("Login_Page.html");
}

$(document).ready(function() {
  $('#logout_main_calendar').click(logout);
  $('#prev_month').click(changeMonth);
  $("#main_calendar").on("click", "td", changeDay);
  var date = new Date(localStorage.getItem('month_date'));
  generateDays(date);
});

function genRow(d1,d2,d3,d4,d5,d6,d7) {
  var td1 = '<td class=element>'+d1+'</td>'; var td2 = '<td class=element>'+d2+'</td>';
  var td3 = '<td class=element>'+d3+'</td>'; var td4 = '<td class=element>'+d4+'</td>';
  var td5 = '<td class=element>'+d5+'</td>'; var td6 = '<td class=element>'+d6+'</td>';
  var td7 = '<td class=element>'+d7+'</td>';
  $('#main_calendar').append('<tr class=day_rows>'+td1+td2+td3+td4+td5+td6+td7+'</tr>')
}

function generateDays(date) {
  date.setDate(1);
  var isFinal = false;
  var daysArray;
  var start;
  var end;

  while(isFinal == false) {
    daysArray=['','','','','','','',''];
    start = date.getDay();
    end = 6-start;
    for(end; end>=0; end--) {
      daysArray[start]=date.getDate();
      date.setDate(date.getDate()+1);
      if(date.getDate()==1){
        isFinal = true;
        break;
      }
      start++
    }
    genRow(daysArray[0],daysArray[1],daysArray[2],daysArray[3],daysArray[4],daysArray[5],daysArray[6]);
  }
}



function changeMonth(date){

  var date = new Date(localStorage.getItem('month_date'));
  currentMonth = date.getMonth();
  currentYear = date.getFullYear();
  currentMonth--;
  if(currentMonth < 0) {
    currentMonth= 11;
  }
  date.setMonth(currentMonth);
  localStorage.setItem('month_date', date.toString());
  $('.element').remove();
  $('.day_rows').remove();
  generateDays(date);
}

function changeDay(event){
  var dateNum = $(this).text();
  if(!isNaN(dateNum)) {
    var date = new Date(localStorage.getItem('month_date'));
    date.setDate(dateNum);
    localStorage.setItem('dateShown_t',date.toString());
    location.href = "TodaysEvents.html";
  }
}
