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
  var dateNum = $(this).text();
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
