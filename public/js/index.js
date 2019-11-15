/* eslint-disable prettier/prettier */
$(document).ready(function() {
  // Get references to page elements
  var $name = "#name";
  var $destination = "#destination";

  var $departure = "#departure";
  var $arrival = "#arrival";
  var $searchList = "#search-list";

  function startSearch(newSearch) {
    console.log(newSearch);
    $.post("api/search", newSearch)
      .then(getSearches(newSearch.name));
  }

  function getSearches($name) {
    let searchName = $name || "";
    
    console.log(searchName);
    $.get("/api/search/" + searchName, function(data) {
      console.log("Search History", data);
      window.location.href = "/api/search/" + searchName; 
      searches = data;
      if (!searches || !searches.length) {
        displayEmpty(searches);
      } else {
        initializeRows(searches);
      }
    });
  }

  // Function for creating a new list row for searches
  function createSearchRow(searchData) {
    var newTr = $("<tr>");
    newTr.data("name", searchData);
    newTr.append("<td>" + searchData.destination + "</td>");
    // Insert additional column information
    return newTr;
  }

  // Function for retrieving authors and getting them ready to be rendered to the page
  function initializeRows(data) {
    var rowsToAdd = [];
    for (var i = 0; i < data.length; i++) {
      rowsToAdd.push(createSearchRow(data[i]));
      $("search-list").prepend(rowsToAdd);
    }
  }

  function deleteSearch(id) {
    $.ajax({
      method: "DELETE",
      url: "api/search/" + id
    }).then(function() {
      getSearches($name.val());
    });
  }

  // handleFormSubmit is called whenever we submit a new example
  // Save the new example to the db and refresh the list
  var handleFormSubmit = function(event) {
    event.preventDefault();
    var newSearch = {
      name: $("#name").val().trim(),
      destination: $("#destination").val().trim(),
      destID: $(this).find(":selected").data("dest-id"),
      airport: $(this).find(":selected").data("airport"),
      departure: $("#departure").val().trim(),
      return: $("#return").val().trim()
    };
    
    console.log(newSearch);

    if (!(newSearch.name && newSearch.destination && newSearch.departure && newSearch.return)) {
      alert("You must enter your name, a city destination, departure and return dates!");
      return;
    }

    startSearch(newSearch);
    // $destination.val("");
    // $departure.val("");
    // $arrival.val("");
  };

  // Add event listeners to the submit and delete buttons

  $("#searchform").on("submit", handleFormSubmit);
  $(".delquote").on("click", function (event) {
    var id = $(this).data("id");
    var name = $(this).data("name");
    deleteSearch(id);
    location.reload();
    getSearches(name);
  });
});