$(document).ready(function() {

  $('#submitButton').click(function() {
    // Grab the user input
    var article = $('#inputArticle').val();
    console.log("User is requesting a search for: " + article);

    // var json = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&prop=extracts&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=";
    // var jsonp = "&callback=?";
    var json = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&prop=extracts&exintro&explaintext&exsentences=1&exlimit=max&callback=?&gsrsearch="

    // Append user input to base json query string and include callback at end to ensure compatibility
    var query = json + article; // + jsonp;
    console.log("Submitted for JSON: " + query);

    $.getJSON(query, function(data) {
      console.log("success");

      console.log(JSON.stringify(data));

      // Create list of results, if we got any
      if (data.query) {
        console.log('Results returned successfully');

        // Clear out any pre-existing content from prior searches, etc
        console.log("Clearing any previous states...");
        $('#fillMe').html('<h1><em>Top Results</em></h1>');

        // Iterate over each page that was returned, build up the html for that entry and append to the list of current results
        for (var key in data["query"]["pages"]) {
          console.log(data["query"]["pages"][key]);

          // Hold result in short-named var here to reduce typing in the concatenations...
          var wiki = data["query"]["pages"][key];
          var newDiv = "<a href='http://en.wikipedia.org/?curid=" + wiki.pageid +
            "' target='_blank'><div class='resultItem'><h2>" + wiki.title +
            "</h2>\n<p>" + wiki.extract +
            "</p></div></a>";

          console.log(newDiv);
          $('#fillMe').append(newDiv);
        }
      }
      // Otherwise, print out an error to let the user know what happened
      else {
        console.log('User search returned nothing...');
        $('#fillMe').html('<h1><em>No results for that search...</em></h1>');
      }
    });
  });

  // If user presses enter while in the text box, treat the same as having clicked the submit button
  $("#inputArticle").keyup(function(event) {
    if (event.keyCode == 13) {
      $("#submitButton").click();
    }
  });

});
