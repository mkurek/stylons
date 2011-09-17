var Sender = {
	getFromURL: function(url) {
		//console.log("Pobieram: "+url);
		var response, xhr = new XMLHttpRequest();
		xhr.open("POST",url,false);
		xhr.send(null);
		//console.log(["response", xhr.responseText])
		response = eval('('+xhr.responseText+')');
		console.log("Pobrałem: "+url);
		return response;
	}
}