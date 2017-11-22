$(document).ready(function() {

	setDate();
	//call function to load fake events if no events in system
	function login(event) {
		localStorage.setItem('username', $('#username_field').val());
		localStorage.setItem('email', $('#email_field').val());
		window.location.href = "TodaysEvents.html";
	}
	loadFakeEvents();
	loadFakeContacts();

	$('#loginbutton').click(login);

	$(document).keypress(function(event) {
    	if(event.which == 13) { //apparently 13 is the 'enter' key?
    		login(event);
    	}
	});
});

function contactComp(a, b) {
    if (a.name === b.name) return 0;
    if (a.name < b.name) return -1;
    else return 1;
}

function setDate(){
	var today = new Date().toString();
	console.log(today);
	/*
	var dateElements =
										{
											day: today.getDay(),
											date: today.getDate(),
											month: today.getMonth(),
											year: today.getFullYear(),
										}
	console.log(dateElements);
	*/
	localStorage.setItem('dateShown_t', today);
	console.log(localStorage.getItem('dateShown_t'));
	localStorage.setItem('month_date', today);

}

var fake_events = [{"name":"Moon landing","start":"2017-11-15T16:00","end":"2017-11-15T20:00","contacts":[{"contact_name":"Niel Armstrong","email":"OneSmallStep"},{"contact_name":"Buzz Aldrin","email":"forMankind"},{"contact_name":"Michael Collins","email":"WellShucks"},{"contact_name":"Andrew","email":"WellShucks"}],"notifications":[{"desc":" will be ending soon.","offset_num":"15","offset_type":"beforeEnd"}]},{"name":"Moon Landing pre-party","start":"2017-11-14T17:00","end":"2017-11-14T19:00","contacts":[{"contact_name":"Hundred Acre Woods","email":"Poohbear"},{"contact_name":"Frankie","email":"glue"},{"contact_name":"Bob from Jersey","email":"bluebay"},{"contact_name":"Andrew","email":"bluebay"}],"notifications":[{"desc":" will be ending soon.","offset_num":"15","offset_type":"beforeEnd"}]},{"name":"Holiday Bash","start":"2017-11-27T11:00","end":"2017-11-27T20:00","contacts":[{"contact_name":"Mary","email":"Mary@gmail.com"},{"contact_name":"Fred","email":"Fred@gmail.com"},{"contact_name":"Kind","email":"Kind@gmail.com"},{"contact_name":"Philip","email":"Philip@yahoo.com"},{"contact_name":"glass","email":"music@gmail.com"},{"contact_name":"Andrew","email":"music@gmail.com"}],"notifications":[{"desc":"Be there or be square","offset_num":"30","offset_type":"beforeStart"}]},{"name":"Glass blowing class","start":"2017-11-15T08:00","end":"2017-11-15T10:00","contacts":[{"contact_name":"Me","email":"me@gmail.com"},{"contact_name":"Myself","email":"myself@hotmail.com"},{"contact_name":"Irene","email":"Irene@gmail.com"},{"contact_name":"Andrew","email":"Irene@gmail.com"}],"notifications":[{"desc":" will be ending soon.","offset_num":"15","offset_type":"beforeEnd"}]},{"name":"Epic Concert","start":"2017-11-15T22:00","end":"2017-11-16T01:00","contacts":[{"contact_name":"That one kid who has class in the morning","email":"badIdeas@gmail.com"},{"contact_name":"Andrew","email":"badIdeas@gmail.com"}],"notifications":[{"desc":"Get Home!!!","offset_num":"15","offset_type":"beforeEnd"}]},{"name":"Fireworks display","start":"2017-11-19T22:00","end":"2017-11-19T22:30","contacts":[{"contact_name":"Dennis","email":"Dennis@clam.com"},{"contact_name":"Dino","email":"Dino@dino.com"},{"contact_name":"Barb","email":"barb@Whathappenedtobarb.com"},{"contact_name":"Andrew","email":"barb@Whathappenedtobarb.com"}],"notifications":[{"desc":" will be ending soon.","offset_num":"15","offset_type":"beforeEnd"}]},{"name":"Georgia state fair","start":"2017-12-01T07:00","end":"2017-12-01T21:00","contacts":[{"contact_name":"The whole town","email":"everyone@gmail.com"},{"contact_name":"Andrew","email":"everyone@gmail.com"}],"notifications":[{"desc":" will be ending soon.","offset_num":"15","offset_type":"beforeEnd"}]},{"name":"Python Meetup","start":"2017-11-26T10:57","end":"2017-11-26T14:00","contacts":[{"contact_name":"Snek","email":"Snek@yahoo.com"},{"contact_name":"Greg","email":"Greg@gmail.com"},{"contact_name":"Andrew","email":"Greg@gmail.com"}],"notifications":[{"desc":" will be ending soon.","offset_num":"15","offset_type":"beforeEnd"}]},{"name":"Picnic at Hanging rock","start":"2017-11-18T13:00","end":"2017-11-18T15:00","contacts":[{"contact_name":"TeacherA","email":"A@gmail.com"},{"contact_name":"TeacherB","email":"B@gmail.com"},{"contact_name":"StudentA","email":"sA@gmail.com"},{"contact_name":"StudentB","email":"sB@gmail.com"},{"contact_name":"Andrew","email":"sB@gmail.com"}],"notifications":[{"desc":" will be ending soon.","offset_num":"15","offset_type":"beforeEnd"}]},{"name":"Water Park Adventure","start":"2017-11-24T10:00","end":"2017-11-24T18:00","contacts":[{"contact_name":"Bob","email":"bob@gmail.com"},{"contact_name":"Beth","email":"beth@gmail.com"},{"contact_name":"Andrew","email":"beth@gmail.com"}],"notifications":[{"desc":" will be ending soon.","offset_num":"15","offset_type":"beforeEnd"}]}]

var fake_contacts = [{"name":"John Smith","email":"jsmith@gmail.com"},{"name":"Amanda Bynes","email":"abynes@gmail.com"},{"name":"Jane Doe","email":"jdoe@gmail.com"},{"name":"Zorgoth","email":"worlddestroyer@gmail.com"},{"name":"Philip Glass","email":"pglass@gmail.com"},{"name":"Stacy Madison","email":"smadison@gmail.com"},{"name":"Claude Debussy","email":"cdebussy@gmail.com"},{"name":"Mark Laplant","email":"mlaplant@gmail.com"},{"name":"Gendo Ikari","email":"getintherobotshinji@gmail.com"},{"name":"Mike Hunt","email":"mhunt@gmail.com"},{"name":"Doc Holiday","email":"dholiday@gmail.com"},{"name":"Clark Kent","email":"totallynotsuperman@gmail.com"},{"name":"Bruce Wayne","email":"seriouslywhodoesn'tknowi'mnotbatman@gmail.com"},{"name":"Napoleon Bonaparte","email":"nbonaparte@gmail.com"},{"name":"Green Lantern","email":"glantern@gmail.com"}]

// function to load in fake events database if no events are present.
function loadFakeEvents () {
	if(localStorage.getItem('event') == null) {
		//load in fake events array
		localStorage.setItem('event', JSON.stringify(fake_events));
	}
}

function loadFakeContacts() {
    if (localStorage.getItem('contacts') == null) {

        fake_contacts.sort(contactComp);
		localStorage.setItem('contacts', JSON.stringify(fake_contacts));
	}
}
