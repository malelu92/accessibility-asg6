var totalImagesOnScreen = 0;
var altTextArray = [];

$(document).ready(function() {
	//CHOOSE IMAGE DESCRIPTION MODE
	labelImage();
	//labelImageTesseract();
});

function labelImage() {
	$('img').each(function() {
		$.ajax({
		    url: "http://www.accessibilitycourse.com/support/rekognition.php?",

		 	data: {
		    	url: $(this).attr("src")
		    },
		 	context:this,
		 	success: function( response ) {
		 		if(response != undefined) {
		 			var altText = $(this).attr("alt");

		    		var response = JSON.parse(response);
		    		if(response[2] != undefined) {
		    			var newAlt = response[0].Name + ", " + response[1].Name + ", " + response[2].Name;
		    		}
		    		else if (response[1] != undefined) {
		    			var newAlt = response[0].Name + ", " + response[1].Name
		    		}
		    		else {
		    			var newAlt = response[0].Name
		    		}
		    		console.log(newAlt)

		    		//image does not have alt text or image has empty alt text
	  				if(altText == undefined || altText == "") { 
	  					$(this).attr("alt", newAlt)
	  				} 
		    	}
			}
		});
	})
}

function labelImageTesseract() {
	for(var i=0; i<getNumberImages(); i++) {
		Tesseract.recognize($($("img")[i]).attr("src"))
    	.progress(message => console.log(message))
    	.catch(err => console.error(err))
    	.then(result => console.log(result))
    	.finally(function(resultOrError) {
    		altTextArray.push(resultOrError.text);
    		for(var j=0; j<i; j++) {
    			var altText = $($("img")[j]).attr("alt");
    			if(altText == undefined || altText == "") {
    				($($("img")[j])).attr("alt", altTextArray[j]);
    			}
    		}	  		
    	})    	
	}	
}


function getNumberImages() {
	if(document.body.getElementsByTagName("img")) {
		var elems = document.body.getElementsByTagName("img");
		totalImagesOnScreen = elems.length;
	}
	return totalImagesOnScreen;
}
