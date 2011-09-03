/*
 * Parser - class returning method to parse server's response to SenchaTouch object
 * 
 * @method transform(response):
 * 	@param response - response returned by server, containing slot description
 * 	@return result - SenchaTouch object described in response
 */

var Parser = function() {
	/*
	 * Global variables:
	 * 
	 * @content - JSON with object attributes
	 * 
	 * @funct - map with handlers to functions
	 */
	var content, funct;
	funct = {
		"Panel" : fmakePanel,
		"List" : fmakeList,
		"TabBar" : fmakeTabBar,
		"Button" : fmakeButton,
		"Toolbar" : fmakeToolbar
	};

	/*
	 * ftransform - set common attributes and call needed functions to create
	 * Sencha Touch object defined in "type" attribute.
	 * 
	 * @params: response - JSON describing Sencha Touch object
	 * 
	 * @return: result - Sencha Touch object described by response
	 */

	function ftransform(response) {
		var result, type;

		content = new Object();
		content.items = [];
		content.dockedItems = [];
		if (response.action) {
			content.handler = function() {
				Dispatcher.action(response.action);
			};
		}
		type = response.type || "Panel";
		result = funct[(type in funct) ? type : "Panel"](response);
		return result;
	}

	function fmakePanel(response) {
		content.html = response.html || "";
		content.styleHtmlContent = response.margin || false;
		return new Ext.Panel(content);
	}

	function fmakeTabBar(response) {
		content.ui = response.ui || "dark";
		content.dock = response.dock || "top";
		content.items = [];
		for ( var i = 0; i < response.list.length; i++) {
			var elem = new Object;
			elem.iconCls = response.list[i].icon || "";
			elem.text = response.list[i].text || "";
			elem.active = response.list[i].active || "";
			elem.badgeText = response.list[i].badge || "";
			if (response.list[i].action)
				elem.handler = function() {
					Dispatcher.action(response.list[i].action);
				};
			content.items.push(elem);
		}
		return new Ext.TabBar(content);
	}

	function fmakeButton(response) {
		content.ui = response.ui || "";
		content.text = response.text || "";
		return new Ext.Button(content);
	}

	function fmakeToolbar(response) {
		content.title = response.title || "";
		content.ui = response.ui || "dark";
		content.dock = response.dock || "top";
		return new Ext.Toolbar(content);
	}

	function fmakeList(response) {
		var storeContent, storeModel;
		
		content.itemTpl = response.itemTpl || "{text}";
		content.listeners = new Object();
		if(response.action)
		{
			content.listeners.itemtap = function(view,index){
				console.log((response.action+'/'+index).replace('//','/'));
			}
		}
		
		storeContent = { data : response.store };
		storeModel = { fields : [] };
		
		if(storeContent.data[0])
			for(var i in storeContent.data[0])
				storeModel.fields.push(i);
		storeContent.model = new Ext.regModel('',storeModel);
		
		content.store = new Ext.data.JsonStore(storeContent);
		return new Ext.List(content);
	}

	return {
		transform : ftransform
	}

}();
