

//Registration method
function fnRegisterMom(){

    var config = {
    apiKey: "AIzaSyDrLO-RSZ-B6BD4gxJXqCOnMLA19DFHcsI",
    authDomain: "momsconnection-63998.firebaseapp.com",
    databaseURL: "https://momsconnection-63998.firebaseio.com",
    projectId: "momsconnection-63998",
    storageBucket: "momsconnection-63998.appspot.com",
    messagingSenderId: "102438011730"
  };

    firebase.initializeApp(config);

    // Create a variable to reference the database
    var database = firebase.database();
    // Capture Button Click
    event.preventDefault();

    var name = $("#name-input").val().trim();
    //console.log(name);
    var address1 = $("#address1-input").val().trim();
    //console.log(address1);
    var address2 = $("#address2-input").val().trim();
    //console.log(address2);
    var city = $("#city-input").val().trim();
    //console.log(city);
    var state = $("#state-input").val().trim();
    //console.log(state);
    var zipcode = $("#zipcode-input").val().trim();
    //console.log(zipcode);
    var email = $("#email-input").val().trim();
    //console.log(email);
    var userId = email.substring(0, email.indexOf("@"));
    //console.log(userId);
    var phone = $("#phone-input").val().trim();
    //console.log(phone);
    var password = $("#password-input").val().trim();
    //console.log(password);
    var regdate = new Date();

    var childage = $("#childage-input").val().trim();

    var boygirl = "Not Specified";
    boygirl = $('input[name=optradio]:checked').val();

    if($("#chkRemember").is(":checked")){
        var remUser = "yes";
    }
    else{
        var remUser = "no";
    }
    console.log(remUser);
      database.ref('moms/' + userId).set({
        name: name,
        address1: address1,
        address2: address2,
        city: city,
        state: state,
        zipcode: zipcode,
        email: email,
        phone: phone,
        password: password,
        regdate: regdate,
        childage: childage,
        boygirl: boygirl,
        rememberUser: remUser
      });


//alert("hold on");
}

//Pull Registration data
function fnFetchMembers(){

    var config = {
    apiKey: "AIzaSyDrLO-RSZ-B6BD4gxJXqCOnMLA19DFHcsI",
    authDomain: "momsconnection-63998.firebaseapp.com",
    databaseURL: "https://momsconnection-63998.firebaseio.com",
    projectId: "momsconnection-63998",
    storageBucket: "momsconnection-63998.appspot.com",
    messagingSenderId: "102438011730"
  };

    firebase.initializeApp(config);

    // Create a variable to reference the database
    var database = firebase.database();

    //event.preventDefault();

    //var userId = firebase.auth().currentUser.uid;
    database.ref('moms/').once('value').then(function(snapshot) {
    var name = snapshot.val().name;
    console.log(name);
  // ...
});



};


var userArray = [];
var attemptedLogin = false;

function checkSignIn(){
	event.preventDefault();


	var password = $("#inputPassword3").val();
	var email = $("#inputEmail3").val();

	var user = "";

if(attemptedLogin === false)

{



	var config = {
	apiKey: "AIzaSyDrLO-RSZ-B6BD4gxJXqCOnMLA19DFHcsI",
	authDomain: "momsconnection-63998.firebaseapp.com",
	databaseURL: "https://momsconnection-63998.firebaseio.com",
	projectId: "momsconnection-63998",
	storageBucket: "momsconnection-63998.appspot.com",
	messagingSenderId: "102438011730"
	};


	firebase.initializeApp(config);
	var database = firebase.database();



console.log(password)
console.log(email)

var query = firebase.database().ref("moms/").orderByKey();
query.once("value")
     .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var key = childSnapshot.key;
			// console.log(key);
      // childData will be the actual contents of the child
      var childData = childSnapshot.val();

			userArray.push(childData);
			// console.log(childData);


		});


checkUser(email,password,user);
attemptedLogin = true;

	});
}

	else {

			checkUser(email,password,user);

			}

// end of function
};


function SignedIn(user){

$("#SignInLi").empty();


var newSignIn = $("<li>");
var newLogOut = $("<li>");
newSignIn.html("<span class='glyphicon glyphicon-user'></span>" + user)
newLogOut.html("<button type='button' onclick='LogOut()' class='btn btn-default btn-sm'> <span class='glyphicon glyphicon-log-out'></span> Log out </button>")
$("#SignInUl").append(newSignIn);
$("#SignInUl").append(newLogOut);



};



function LogOut(){


	$("#SignInUl").empty();

var newLogin = $("<li>");
newLogin.attr("id","SignInLi")
newLogin.html("<a data-toggle='modal' data-target='#modalSignIn'><span class='glyphicon glyphicon-log-in'></span> Login</a>")
$("#SignInUl").append(newLogin);
};




function checkUser(email,password,user){


		for (var i = 0; i < userArray.length; i++) {

			var foundUser;
			// console.log(userArray[i]);
			if(i === userArray.length-1 &&  userArray[i].email != email && foundUser === false)

			{
				console.log("user not found");
			}

			if(userArray[i].email === email)
			{

				console.log("user Exist")
				foundUser = true;

				 if(userArray[i].password === password)
				{
					console.log("pass confirmed")

					$("#modalSignIn").modal("hide");
					user = userArray[i].name;
					SignedIn(user);
				}


				if(userArray[i].password != password) {
				console.log("incorrect pass")
				}



		};

};

};
