var search;
var images = [];
var tapspeed = 0;
var state;
var pullN = 10;

$('#addSearch').on('click', function(e){
    e.preventDefault();   
    search = $('#searchInput').val().trim();
    console.log("Search = " + search);
    $('#searchResults').prepend(search);
    // Array
    images.push(search);


    renderButtons();
    document.getElementById('searchInput').value='';
});

$(document).on("click", "img", function () {

    state = $(this).attr("data-state");
    if (state === "still") {
        console.log("the state is still")
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }

    if (tapspeed == 0) {
        tapspeed = new Date().getTime();
    } else {
        if (((new Date().getTime()) - tapspeed) < 800) {
            // double click occurred
            if ($(this).hasClass('fav')) {
                $(this).remove();
                $("#gif").prepend($(this));
                $(this).removeClass("fav");
            }
                else{
                    $("#fav").append($(this));
                    $(this).addClass("fav");
                }
           
            tapspeed = 0;
        } else {
            tapspeed = new Date().getTime();
           
        }
    }
});

$(document).on("click", ".btnSearch", function () {

    
});

// Function for displaying image data
function renderButtons() {
$("#searchResults").empty();
for (var i = 0; i < images.length; i++) {

    var a = $("<button>");
    // Adding a class of image-btn to our button
    a.addClass("btnSearch");
    // Adding a data-attribute
    a.attr("data-name", images[i]);
    // Providing the initial button text
    a.text(images[i]);
    // Adding the button to the buttons-view div
    $("#searchResults").prepend(a);
}
}
function collapse () {
    if ($("#collapseOne".hasClass(show))) {
        $('#favBtn').html(Favorites )
    }
    
}

function renderGif() {
    pullN = $('#pull').val();
    // console.log (pullN);
    var srcOpt = $('input[name=optradio]:checked').val(); 
        // console.log("The Current size is  " + srcOpt);
   
    // for (let pull = 0; pull < pullN; pull++) {

    search = $(this).attr("data-name");
    // "http://api.giphy.com/v1/gifs/search?q="+ search +"&api_key=NNm6OtMHIWdnjhvwLvUdSRxBAB4Ph95M&limit=10"
    
    var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=NNm6OtMHIWdnjhvwLvUdSRxBAB4Ph95M&tag=" + search;
  
 for (let p = 0; p < pullN; p++) {
   
 
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

        if (srcOpt === "lg") {
            var imgUrl = response.data.images.downsized_still.url;
            var imgAni = response.data.images.downsized.url; 
        } else {
            var imgUrl = response.data.images.fixed_height_small_still.url; 
            var imgAni = response.data.images.fixed_height_small.url;  
        }
          
        // console.log (response.data.images);
        var image = $("<img>")
        .attr({
        'src': imgUrl,
        'data-animate': imgAni,
        'data-still': imgUrl,
        'data-state': "still",
        })
        .addClass('gify');
        // Appending the image
        image.append(images);
            // Putting the entire movie above the previous movies
            $("#gif").prepend(image);
            // console.log (this);
          });
        }
    };

    

  
$(document).on("click", ".btnSearch", renderGif);