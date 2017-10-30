var altText = "";

$(document).ready(function() {
	//labelImage();
	labelImageTesseract();
});

function labelImage() {
	$('img').each(function() {
		var alttext = $(this).attr("alt");
		var imgsrc  = $(this).attr("src");
		var imageContext = $(this);

		$.ajax({
		    url: "http://www.accessibilitycourse.com/support/rekognition.php?",

		 	data: {
		    	url: $(this).attr("src")
		    },
		 
		 	success: function( response ) {
		    	var response = JSON.parse(response);
		    	console.log("ajax")
		    	altText = response[0].Name + ", " + response[1].Name + ", " + response[2].Name;
		    	console.log(altText)
		    }
		});

		//image does not have alt text
	  	if(alttext && (alttext == "" || alttext == undefined) || alttext == '\n' || alttext == null) { 
	  		console.log("no alt")
	  		$(this).setAttribute('alt', altText)
	  	} 
	  	//image has empty alt text
	  	else if($(this).attr('alt')) {
	  		console.log("empty alt") 
	  		$(this).attr('alt', altText)
	  	} 

		console.log("not ajax")
		console.log(altText);
	})
}

function labelImageTesseract() {
	$('img').each(function() {
		Tesseract.recognize($(this).attr("src"))
    	.progress(message => console.log(message))
    	.catch(err => console.error(err))
    	.then(result => console.log(result))
    	.finally(function(resultOrError) {
      		console.log(resultOrError);
    	})    		
	})	
}