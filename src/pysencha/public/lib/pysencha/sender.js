var res, res2;
var Sender = {
	
		/**
		 * @public Return JSON object
		 * 
		 * @param {object}
		 *            url string with url
		 * 
		 * @return {object} JSON object
		 */
		
	getFromURL: function(url) {

		var response , xhr = new XMLHttpRequest();
		xhr.open("POST",url,false);
		xhr.send(null);
		try {
			response = JSON.parse(xhr.responseText);
		}
		catch (err){
			respone = '';
		}
		return response;
	},
	
		/**
		 * @public Return JSON object
		 * @param {object}
		 *            url string with url
		 * 
		 * @param {object}
		 *            data Object with data from Form
		 * @return {object} JSON object
		 */
	
	sendToURL: function(url, data) {
		var response;
		response= {
				type : "load",
				url : "menu/shortDescription"
		};
		var response, dataForServer, xhr = new XMLHttpRequest();
		xhr.open("POST",url,false);
		dataForServer = JSON.stringify(data);
		xhr.send(dataForServer);
		try {
			response = JSON.parse(xhr.responseText);
		}
		catch (err){
			response = '';
		}
		return response;
	}
}