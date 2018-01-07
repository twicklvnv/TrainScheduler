
   // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBJhp06T4fAPyyNN0j0qpU7pJWMyyOev9Q",
    authDomain: "train-schedule-de661.firebaseapp.com",
    databaseURL: "https://train-schedule-de661.firebaseio.com",
    projectId: "train-schedule-de661",
    storageBucket: "train-schedule-de661.appspot.com",
    messagingSenderId: "1098143322615"
  };
  
  firebase.initializeApp(config);

var database = firebase.database();

$("#addTrain").on("click", function(event) {
  event.preventDefault();

  var trnName = $("#trainName").val().trim();
  var dest = $("#destination").val().trim();
  var firstTime = $("#firstTrainTime").val().trim();
  var freq = $("#frequency").val().trim();

  var newTrain = {
    name: trnName,
    destination: dest,
    time: firstTime,
    frequency: freq
  }

  database.ref().push(newTrain);
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.time);
  console.log(newTrain.frequency);

  //clears text input boxes in new train form
$("#trainName").val("");
$("#destination").val("");
$("#firstTrainTime").val("");
$("#frequency").val("");

})


database.ref().on("child_added", function(childSnapshot, prevChildKey) {

console.log(childSnapshot.val());

var trnName = childSnapshot.val().name;
var dest = childSnapshot.val().destination;
var firstTime = childSnapshot.val().time;
var freq = childSnapshot.val().frequency;



//$("#schedule > tbody").append("<tr><td>" + trnName + "</td><td>" + dest +
 // "</td><td>" + freq + "</td></tr>");


var currentTime = moment().format("hh:mm A");
console.log(currentTime);

var timeDifference = moment().diff(moment.unix(firstTime), "minutes");
var timeRemain = moment().diff(moment.unix(firstTime), "minutes") % freq;
var minutes = freq - timeRemain;

var nextArrival = moment().add(minutes,"m").format("hh:mm A");

$("#schedule > tbody").append("<tr><td>" + trnName + "</td><td>" + dest +
  "</td><td>" + freq + "</td><td>" + nextArrival + "</td><td>" + minutes +
  "</td></tr>");

})


