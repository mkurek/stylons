var Sender = {
	getFromURL: function(url) {
		var response, xhr = new XMLHttpRequest();
		xhr.open("POST",url,false);
		xhr.send(null);
		console.log("Pobrałem: "+url);
		response = eval('('+xhr.responseText+')');
		return response;
	}
}