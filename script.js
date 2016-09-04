$(document).ready(function() {
  $('#submitButton').click(function() {
    // Grab the user input and create our API query URL
    var article = $('#inputArticle').val()
    var json = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&prop=extracts&exintro&explaintext&exsentences=1&exlimit=max&callback=?&gsrsearch="
    var query = json + article

    $.getJSON(query, function(data) {
      // Create list of results, if we got any
      if (data.query) {
        $('#fillMe').html('<h1><em>Top Results</em></h1>')

        // Iterate over each page that was returned, build up the html for that
        // entry and append to the list of current results
        for (var key in data.query.pages) {
          // Have to use bracket notation to access fields using variables...
          // Hold result in short-named var here to reduce typing in the concatenations...
          var wiki = data.query.pages[key]
          var newDiv = "<a href='http://en.wikipedia.org/?curid=" + wiki.pageid +
              "' target='_blank'><div class='resultItem'><h2>" + wiki.title +
              "</h2>\n<p>" + wiki.extract + "</p></div></a>"
          $('#fillMe').append(newDiv)
        }
      } else {
        // Otherwise, print out an error to let the user know what happened
        $('#fillMe').html('<h1><em>No results for that search...</em></h1>')
      }
    })
  })

  // If user presses enter in the text box, treat as clicking the submit button
  $("#inputArticle").keyup(function(event) {
    if (event.keyCode == 13) {
      $("#submitButton").click()
    }
  })
})
