var totalImagesOnScreen = 0;
var altTextArray = [];

$(document).ready(function() {
	//labelImage();
	labelImageTesseract();
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

		    		//image does not have alt text
	  				if(altText == undefined) { 
	  					console.log(" image : " + $(this))
	  					console.log(newAlt)
	  					$().attr("alt", newAlt)
	  				} 
	  				//image has empty alt text
	  				else if(altText == "") {
	  					console.log("empty alt") 
	  					$(this).attr("alt", newAlt)
	  				} 
		    	}
			}
		});
	})
}

function labelImageTesseract() {
	//$('img').each(function() {
	for(var i=0; i<getNumberImages(); i++) {
		//var altText = $(this).attr("alt");
		var altText = $($("img")[i]).attr("alt")
		var image = $($("img")[i])
		console.log("aaaa" + image);
		

		Tesseract.recognize($($("img")[i]).attr("src"))
		//Tesseract.recognize($(this).attr("src"))
    	.progress(message => console.log(message))
    	.catch(err => console.error(err))
    	.then(result => console.log(result))
    	.finally(function(resultOrError) {
    		newAlt = resultOrError.text;
    		console.log(newAlt);

    		altTextArray.push(newAlt);
    		console.log("aroon : " + altTextArray);

    		for(var j=0; j<i; j++) {
    			($($("img")[j])).attr("alt", altTextArray[j]);
    		}

    		//console.log($($("img")[i]))
		    //image does not have alt text
	  		if(altText == undefined) { 
	  			//console.log("no alt");
	  			//image.attr("alt", altTextArray[i])
	  		} 
	  		//image has empty alt text
	  		else if(altText == "") {
	  			//console.log("empty alt");
	  			//console.log("aroon  ...... "+image)
	  			//image.attr("alt", altTextArray[i])
	  		}  
	  		console.log(image.src);
	  		image.attr("alt", altTextArray[i]);
    	})    	
	}	
}


function tessaTessaTesseract() {

	for(var i=0; i<totalImagesOnScreen; i++) {
		Tesseract.recognize($($("img")[i]).attr("src"))
    	.progress(message => console.log(message))
    	.catch(err => console.error(err))
    	.then(result => console.log(result))
    	.finally(function(resultOrError) {
	    	altText = resultOrError.text;   
	    	altText = altTextReadFromImage.toString();
			altText = altTextReadFromImage.trim();  
			altTextReadFromImageList.push(altText);     	
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
