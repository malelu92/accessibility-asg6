function jsonpcallback(data) {
  console.log(data);
}

$(document).ready(function() {
	var screen_text;
	var img = $("img")[0];

	$.ajax({
    	url: "http://www.accessibilitycourse.com/support/rekognition.php?",
 
    	// Tell YQL what we want and that we want JSON
    	data: {
        	url: $('img').attr("src")
    	},

    	// Work with the response
    	success: function(response) {
    		console.log("lala")
        	console.log( response ); // server response
        	//$("img").attr("alt", response) more to write
        	//alt = response[0]["Name"].toString();
    	},
	});

	$("*:not(body)").hover(
		function(event) {

			$(".highlight").addClass("highlight");
			$(this).addClass("highlight");

			if (this.tagName == "IMG") {
				if ($(this).attr('title')) {
					screen_text = $(this).attr('title')
				}
				else if ($(this).attr('alt')){
					screen_text = $(this).attr('alt');
				}
				else if ($(this).attr('src')){
					screen_text = $(this).attr('src');
				}
			}
			else {
				screen_text = $(this).text();
			}


			if($(img).is(":not(img[alt])")) { //image does not have alt text
				console.log("no alt attribute")
			}
			else if ($(img).attr("alt")==""){ //image has empty alt text
				console.log("alt is empty string")
			}
			else { //image has some text
				console.log("alt has some text")
			}



			event.stopPropagation();
		},
		function(event) {

			$(this).removeClass("highlight");
		}
	);
	$(document).keydown(function(event) {

  		if (event.keyCode == 32) {
			speechSynthesis.cancel();
			speechSynthesis.speak(new SpeechSynthesisUtterance(screen_text));

 			event.preventDefault();
  		}
	})
})