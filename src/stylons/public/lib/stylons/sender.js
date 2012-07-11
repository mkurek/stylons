var Sender = (function(){
	
	function getComponentsList(url, missingComponents, successCallback, failureCallback){
		/*
		Ext.Ajax.request({
			url : url,
			success: successCallback,
			failure: failureCallback,
			params: missingComponents,
			method: 'POST'
		});
		*/
		var response = null, xhr = new XMLHttpRequest();
		try{
			xhr.open("POST", url, false);
			dataForServer = JSON.stringify(missingComponents);
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xhr.send('data=' + dataForServer);

			if (xhr.status == 200) {
				response = JSON.parse(xhr.responseText);
			}
		} catch (err){
			;
		}
		return response;
	}
		
		
	/**
	 * @public Return JSON object
	 * 
	 * @param {object}
	 *            url string with url
	 * 
	 * @return {object} JSON object
	 */

	function getFromURL(url) {
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
	}

	/**
	 * @public Return JSON object
	 * @param {object}
	 *            url string with url
	 * 
	 * @param {object}
	 *            data Object with data from Form
	 * @return {object} JSON object
	 */

	function sendToURL(url, data) {
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
	
	/*
	 getFromURL: function(url) {
			var response;
			Ext.Ajax.request({
				url  : url,
				method : 'POST',
				success : function(result, request) {
					console.log("Udało się, sciagnalem" + result.responseText);
					response = Sender.doJSONfromString(result.responseText);
				},
				failure : function(result, request) {
					console.log("Nie udało się");
					response = Sender.doJSONfromString('');
				}
				requestcomplete : () {
					return response;
				}
			})
		},
		doJSONfromString : function(stringData) {
			var jsonData;
			try {
				jsonData = Ext.util.JSON.decode(stringData);
			}
			catch (err){
				jsonData = '';
			}
			return jsonData;
		} 
	 */
	
	return {
		sendToURL : sendToURL,
		getFromURL : getFromURL,
		getComponentsList : getComponentsList
	}
}());