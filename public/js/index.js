// Get references to page elements
var $name = ("#name");
var $destination = ("#destination");
//add switch case

var $departure = ("#departure");
var $arrival = ("#arrival");
var $submitBtn = ("#submit");
var $bookingList = ("#bookingList");

function startSearch(newSearch) {
    console.log(newSearch)
    $.post("api/search", newSearch)
  }

function getSearches(newSearch) {
    let searchName = newSearch.name || "";
    if(searchName) {
      searchName = "?name=" + searchName
    }
    $.get("/api/search/" + searchName, function(data){
      console.log("Search History", data);
      searches = data;
      if (!searches || !searches.length) {
        displayEmpty(author);
      }
      else {
        initializeRows();
      }
    });
}


function deleteSearch(id) {
    $.ajax({
      method: "DELETE",
      url: "api/search/" + id,
    })
    .then(function() {
      getPosts($name.val());
    });
  };


// refreshExamples gets new examples from the db and repopulates the list
var refreshBooking = function () {
  getSearches().then(function (data) {
    $("#listBooking").empty();
    var $booking = data.map(function (data) {
      $("#listbooking").append(`<p>${data.hotel}</p><p>${data.price}</p><a href="${data.url}" target="_blank">${data.hotel}</a>`);  
    })})};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault(); 

  var newSearch = {
    name:  $("#name").val().trim(),
    destination : $("#destination").val().trim(),
    destID : $(this).find(':selected').data('dest-id'),
    airport : $(this).find(':selected').data('airport'),
    departure : $("#departure").val().trim(),
    return : $("#return").val().trim()
  };

  if (!(newSearch.name && newSearch.destination && newSearch.departure && newSearch.return)) {
    alert("You must enter your name, a city destination, departure and return dates!");
    return;
  }



  startSearch(newSearch)
    // .then(function() {
    //   refreshBooking(); 
    // });

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


$("submit").on("click", handleFormSubmit);

