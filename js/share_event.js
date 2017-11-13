document.getElementById("share_button").onclick = function() {shareEvent()};

function shareEvent() {
  var name = $('#contact_name').val();
  var email = $('#contact_email').val();
  var eventName = localStorage.getItem('eventEdit')

  if(name && email) {
    var current = JSON.parse(localStorage.getItem('event'));

    for (var i = 0; i < current.length; i++) {
      if(current[i].name == eventName) {
        current[i].contacts.push({contact_name: name, email: email});
      }
    }
    localStorage.setItem('event',JSON.stringify(current));

    $('#contact_name').val('');
    $('#contact_email').val('');
    console.log("NOT EMPTY");
  }
  location.href = "TodaysEvents.html";
}
