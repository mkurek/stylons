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
	var content, defaultType = "Panel", typeFunct = {
		"Panel" : makePanel,
		"List" : makeList,
		"TabBar" : makeTabBar,
		"Button" : makeButton,
		"Toolbar" : makeToolbar,
		"Tab" : makeTab,
		"default" : makeDefault
	}, defaults = {
		"Default" : {
			id : "",
			slot : "",
			cls : '', // CSS style class
			items : [],
			dockedItems : []
		},
		"Panel" : {
			html : "",
			layout : { // default layout
				type : 'fit'
			},
			fullscreen : true,
			margin : 0, // {Number | String (eg. '10 2 4 5')}
			padding : 0, // {Number | String (eg. '10 2 4 5')}
			scroll : 'vertical' // {vertical | horizontal | both | false}
		},
		"Toolbar" : {
			ui : 'dark', // {'dark' | 'light'}
			dock : 'top', // {'top' | 'bottom' | 'left' | 'right'}
			margin : 0, // {Number | String (eg. '10 2 4 5')}
			padding : 0, // {Number | String (eg. '10 2 4 5')}
			title : '' // {String}
			// fullscreen: false
		},
		"List" : {
			itemTpl : '{text}', // {String}
			store : [],
			fullscreen : true,	// {true | false}
			emptyText : 'empty List',	// {String}
			indexBar : false // {true | false}
		},
		"TabBar" : {
			dock : 'bottom',	// {'top' | 'bottom' | 'left' | 'right'}
			ui : 'dark',		// {'dark' | 'light'}
			layout : {			// default layout
				pack : 'center'
			}
		},
		"Tab" : {
			iconCls : '',		// {String} background image
			text : '',			// {String}
			badgeText : '',		// {String} text for badge on the button
			active : false		// {true | false} Tab highlight
		},
		"Button" : {
			
			
		}
	}, substitute ={
		"Tab": {
			icon : 'iconCls',
			badge : 'badgeText'
		},
		"List" : {
			itemtpl : 'itemTpl'
		}
	};
	
	
	function apply(type, specificDescription){
		var obj, property;
		
		// apply default properites for given type
		obj = Ext.apply({}, defaults[type] || defaultType,
				defaults["Default"]);
	
		
		// overwrite default properties
		// NOTE : properties not included in default description will not be
		// included in content
		for (property in specificDescription) {
			if (property in obj) {
				obj[property] = specificDescription[property];
			}
			// check for short-name
			else if(substitute[type] && substitute[type][property] && substitute[type][property] in obj)
				obj[substitute[type][property]] = specificDescription[property];
		}
		return obj;
	}
	
	/*
	 * ftransform - set common attributes and call needed functions to create
	 * Sencha Touch object defined in "type" attribute.
	 * 
	 * @params: des - JSON describing Sencha Touch object
	 * 
	 * @return: result - Sencha Touch object described by response
	 */

	function transform(des) {
		var result, type, prop;
		
		type = des.type || defaultType;
		
		// apply default and specific properties
		content = apply(type, des);
		
		result = typeFunct[(type in typeFunct) ? type : "default"](des);
		return result;
	}
	
	function makeDefault(des){
		return des;
	}	
	
	function makePanel(des) {
		return new Ext.Panel(content);
	}
	
	function makeTab(des){
		var elem;
		elem = apply("Tab", des);
		return elem;
	}
	
	function makeTabBar(des) {
		content.items = [];
		for ( var i = 0; i < des.list.length; i++) {
			var elem = makeTab(des.list[i]);
			content.items.push(elem);
		}
		console.log(["TabBar", content]);
		return new Ext.TabBar(content);
	}
	
	function makeButton(des) {
		return new Ext.Button(content);
	}
	
	function makeToolbar(des) {
		return new Ext.Toolbar(content);
	}
	
	function makeList(des) {
		var storeContent, storeModel;
		
		content.listeners = new Object();
		/*
		if (des.action) {
			content.listeners.itemtap = function(view, index) {
				console.log((des.action + '/' + index).replace('//', '/'));
			}
		}
		*/
		storeContent = {
			data : des.store
		};
		storeModel = {
			fields : []
		};
		
		if (storeContent.data[0])
			for ( var i in storeContent.data[0])
				storeModel.fields.push(i);
		storeContent.model = new Ext.regModel('', storeModel);
		
		content.store = new Ext.data.JsonStore(storeContent);
		return new Ext.List(content);
	}
	
	return {
		transform : transform
	}

}();
