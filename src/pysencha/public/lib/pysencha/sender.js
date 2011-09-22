var Sender = {
	getFromURL: function(url) {
		var response , xhr = new XMLHttpRequest();
		xhr.open("POST",url,false);
		xhr.send(null);
		try {
			response = eval('('+xhr.responseText+')');
		}
		catch (err){
			respone = '';
		}
		return response;
	},
	sendToURL: function(url, data) {
		var response, dataForServer, xhr = new XMLHttpRequest();
		xhr.open("POST",url,false);
		dataForServer = JSON.stringify(data);
		xhr.send(dataForServer);
		try {
			response = eval('('+xhr.responseText+')');
		}
		catch (err){
			respone = '';
		}
		return response;
	}
}