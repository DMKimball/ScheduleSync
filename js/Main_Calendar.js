

function logout() {
  localStorage.setItem('username', '');
  localStorage.setItem('email', '');
  window.location.assign("Login_Page.html");
}

$(document).ready(function() {
  $('#logout_main_calendar').click(logout);
});
