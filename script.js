$(document).ready(function() {
    let food = ["tacos", "lasagna", "pizza", "sushi", "steak", "noodles", "spaghetti"];

    //Create a button for each element in the array, give each one a class and add the buttons to the container
    function populateButtons(arr, classToAdd, container) {
        //Empties buttons container
        $("#food-buttons").empty();
        //Creates button tag for each element in the array
        for(let i = 0; i < arr.length; i++) {
            let btn = $("<button>");
            btn.addClass(classToAdd);
            btn.attr("data-type", arr[i]);
            btn.text(arr[i]);
            //appends button to container
            $(container).append(btn);
        }
    }

    //Gets called when a button is clicked. Shows gifs about that topic
    $("#food-buttons").on("click", ".food-button", function() {
        //Empties container
        $("#foods").empty();

        //Search is the key word(s) that will be searched with GIPHY
        let search = $(this).attr("data-type");
        //Forms the URL from which the GIFs will be fetched
        let queryURL = `https://api.giphy.com/v1/gifs/search?q=${search}&api_key=uilsB0xIQseHptf85ICRRVEGPyKq5z4E&limit=10`;

        //AJAX call to API
        $.ajax({url:queryURL}).then(function(response) {
            //results holds an array of 10 GIFs
            let results = response.data;
            console.log(results);

            //For each element of results (GIF), create a div with the rating as text and the GIF itself
            for(let i=0; i < results.length; i++) {
                //create div
                let foodDiv = $("<div class=\"food-item\">");
                //gets rating
                let rating = results[i].rating;
                //create p tag with rating
                let p = $("<p>").text("Rating: " + rating);

                //Animated URL
                let animated = results[i].images.fixed_height.url;
                //Still image URL
                let still = results[i].images.fixed_height_still.url;

                //creates img tag
                let foodImage = $("<img>");
                foodImage.attr("src", still);
                foodImage.attr("data-still", still);
                foodImage.attr("data-animate", animated);
                foodImage.attr("data-isAnimated", "false");
                foodImage.addClass("food-image");

                //Apends rating and GIF img to div
                foodDiv.append(p);
                foodDiv.append(foodImage);

                //Appends div to GIFs container
                $("#foods").append(foodDiv);
            }
        })
    });

    //Adds a new button to the list
    $("#add-food").on("click", (e) => {
        //Prevents page from reloading
        e.preventDefault();
        
        //gets text from input
        let btnText = $("#food-input").val();
        
        if(btnText !== ""){
            //adds entry to food array
            food.push(btnText);
            //populates buttons to see change
            populateButtons(food, "food-button", "#food-buttons");
            
            //Clears input field
            $("#food-input").val("");
        }
    })

    //Click on GIF - Toggle animated/still
    $("#foods").on("click", ".food-image", function() {
        //Gets value of data-isAnimated attribute in the image
        let isAnimated = $(this).attr("data-isAnimated") == "true";
        let animated = $(this).attr("data-animate");
        let still = $(this).attr("data-still");

        //If image is still, turn to animated
        if(isAnimated == false) {
            $(this).attr("src", animated);
            $(this).attr("data-isAnimated", "true");
        } else {
            //Image is animated, turn to still
            $(this).attr("src", still);
            $(this).attr("data-isAnimated", "false");
        }
    })

    //Calls function to populate buttons
    populateButtons(food, "food-button", "#food-buttons");
});
