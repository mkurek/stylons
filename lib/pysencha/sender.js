var Sender = {
	getFromURL: function(url) {
		var response, xhr = new XMLHttpRequest();
		xhr.open("POST",url,false);
		xhr.send(null);
		response = eval('('+xhr.responseText+')');
		console.log("Pobrałem: "+url);
		return response;
	}
}