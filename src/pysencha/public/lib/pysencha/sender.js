var Sender = {

	/**
	 * @public Return JSON object
	 * 
	 * @param {object}
	 *            url string with url
	 * 
	 * @return {object} JSON object
	 */

	getFromURL : function(url) {
		var response = null, xhr = new XMLHttpRequest();
		try{
			xhr.open("POST", url, false);
			xhr.send(null);

			if (xhr.status == 200) {
				try {
					response = JSON.parse(xhr.responseText);
				} catch (err) {
					;
				}
			}
		} catch (err){
			;
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

	sendToURL : function(url, data) {
		var response = null, xhr = new XMLHttpRequest();
		try{
			xhr.open("POST", url, false);
			dataForServer = JSON.stringify(data);
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xhr.send('data=' + dataForServer);

			if (xhr.status == 200) {
				try {
					response = JSON.parse(xhr.responseText);
				} catch (err) {
					;
				}
			}
		} catch (err){
			;
		}
		return response;
	}
}