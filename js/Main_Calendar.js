function logout() {
  localStorage.setItem('username', '');
  localStorage.setItem('email', '');
  window.location.assign("Login_Page.html");
}

$(document).ready(function() {
  $('#logout_main_calendar').click(logout);
  testDate();
  genRow();
});

function testDate() {
    var dateShown = new Date(localStorage.getItem('dateShown_t'));
    dateShown.setDate(1);
    dateShown.setMonth(1);
    var day1=day2=day3=day4=day5=day6=day7='';
    var count7 = 1;
    do {
      dateShown.setDate(dateShown.getDate()+1);
      console.log(dateShown.getDate());
      if(count7==7) {
        genRow(day1,day2,day3,day4,day5,day6,day7);
      }
    }
    while(dateShown.getDate() != 1);
    console.log(dateShown);
}

function genRow(d1,d2,d3,d4,d5,d6,d7) {
  var td1 = '<td class=element>1</td>'; var td2 = '<td class=element>2</td>';
  var td3 = '<td class=element>3</td>'; var td4 = '<td class=element>4</td>';
  var td5 = '<td class=element>5</td>'; var td6 = '<td class=element>6</td>';
  var td7 = '<td class=element>7</td>';
  $('#main_calendar').append('<tr>'+td1+td2+td3+td4+td5+td6+td7+'</tr>')
}
