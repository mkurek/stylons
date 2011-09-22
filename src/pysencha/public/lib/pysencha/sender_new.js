var Sender_new = {
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
}