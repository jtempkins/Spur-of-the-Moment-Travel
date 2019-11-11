// Get references to page elements
var $name = ("#name");
var $destination = ("#destination");
//add switch case

var $departure = ("#departure");
var $arrival = ("#arrival");
var $submitBtn = ("#submit");
var $bookingList = ("#bookingList");

// var $name = ("Fred");
// var $destination = ("London");
// var $departure = ("2019-12-03");
// var $arrival = ("2019-12-03");
// var $submitBtn = ("submit");
// var $bookingList = ("bookingList");
// The API object contains methods for each kind of request we'll make
var API = {
  saveBooking: function (booking) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/booking",
      data: JSON.stringify(booking)
    });
  },
  getBooking: function () {
    return $.ajax({
      url: "api/booking",
      type: "GET"
    });
  },
  deleteBooking: function (id) {
    return $.ajax({
      url: "api/booking/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshBooking = function () {
  API.getBooking().then(function (data) {
    $("#listBooking").empty();
    var $booking = data.map(function (data) {
      $("#listbooking").append(`<p>${data.hotel}</p><p>${data.price}</p><a href="${data.url}" target="_blank">${data.hotel}</a>`);  
    })})};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault(); 

  var userData = {
    name:  $("#name").val().trim(),
    destination: $("#destination").val().trim(),
    departure: $("#departure").val().trim(),
    arrival: $("#arrival").val().trim()
  };

  if (!(userData.name && userData.destination && userData.departure && userData.arrival)) {
    alert("You must enter your name, a city destination, departure and arrival dates!");
    // return;
  }

  API.saveBooking(userData).then(function() {
    refreshBooking(); 
  });

  $destination.val("");
  $departure.val("");
  $arrival.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
// var handleDeleteBtnClick = function() {
//   var idToDelete = $(this) 
//     .parent()
//     .attr("data-id");

//   API.deleteExample(idToDelete).then(function() {
//     refreshExamples(); 
//   });
// };

// Add event listeners to the submit and delete buttons


// $submitBtn.on("click", handleFormSubmit);



// $exampleList.on("click", ".delete", handleDeleteBtnClick);
