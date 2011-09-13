/*
 * Parser - class returning method to parse server's response to SenchaTouch object
 * 
 * @method transform(response):
 * 	@param response - response returned by server, containing slot description
 * 	@return result - SenchaTouch object described in response
 */

var Parser = function() {
	/**
	 * Global variables:
	 * 
	 * @content - JSON with object attributes
	 * 
	 * @typeFunct - map with handlers to functions
	 */
	
	var content, defaultType = "Panel", 
	// link between component type and handler function
	typeFunct = {
		"Panel" : makePanel,
		"List" : makeList,
		"TabBar" : makeTabBar,
		"Button" : makeButton,
		"Toolbar" : makeToolbar
	}, 
	
	// default properties of Sencha components
	defaults = {
		"Default" : {
			id : "",
			slot : "",
			cls : '', // CSS style class
			items : [],
			dockedItems : []
		},
		"Panel" : {
			html : "",
			layout : 'fit',
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
		},
		"List" : {
			itemTpl : '{text}', // {String}
			store : [],
			fullscreen : true, // {true | false}
			emptyText : 'empty List', // {String}
			indexBar : false
		// {true | false}
		},
		"TabBar" : {
			dock : 'bottom', // {'top' | 'bottom' | 'left' | 'right'}
			ui : 'dark', // {'dark' | 'light'}
			layout : { // default layout
				pack : 'center'
			}
		},
		"Tab" : {
			iconCls : '', // {String} background image
			text : '', // {String}
			badgeText : '', // {String} text for badge on the button
			active : false
		// {true | false} Tab highlight
		},
		"Button" : {
			iconCls : '', // {String} background image
			text : '', // {String}
			badgeText : '', // {String} text for badge on the button
			ui : 'normal' // {'normal' | 'back' | 'round' | 'action' |
		// 'forward'} button style
		}
	}, 
	
	// short-name substitute map
	substitute = {
		"Tab" : {
			icon : 'iconCls',
			badge : 'badgeText'
		},
		"Button" : {
			icon : 'iconCls',
			badge : 'badgeText'
		},
		"List" : {
			itemtpl : 'itemTpl'
		}
	};
	
	/**
	 * @private 
	 * Apply default and specific properties to object
	 * 
	 * @param {String}
	 *            type - type of component to be applied
	 * @param {object}
	 *            specificDescription - detailed description of specific
	 *            component
	 * 
	 * @return {Object}
	 * 			object after applying properties
	 */
	
	function apply(type, specificDescription) {
		var obj, property;
		
		// apply default properites for given type
		obj = Ext.apply({}, defaults[type] || defaultType, defaults["Default"]);
		
		// overwrite default properties
		// NOTE : properties not included in default description will not be
		// included in content
		for (property in specificDescription) {
			if (property in obj) {
				obj[property] = specificDescription[property];
			}
			// check for short-name
			else if (substitute[type] && substitute[type][property]
					&& substitute[type][property] in obj)
				obj[substitute[type][property]] = specificDescription[property];
		}
		return obj;
	}
	
	/**
	 * @private 
	 * React to event
	 * 
	 * @param {String}
	 *            name - name of item
	 * @param {String}
	 * 			event description
	 */
	
	function eventHandler(name, des) {
		console.log("in eventHandler; args", [arguments]);
	}
	
	
	function addEvents(component, description){
		var event;
		
		if(description.action){
			//console.log("jest action");
			// for every event defined in action
			for(event in description.action){
				//console.log("event", [description.action[event], component]);
				// if component handle addListener method
				if(!!component.addListener){
					//console.log("dodaje listener");
					// add event listener
					component.addListener(event, function(){
						eventHandler(event, description.action[event], arguments);
					
					});
				}
			}
		}	
	}
	
	/**
	 * @public
	 * transform - set common attributes and call needed functions to create
	 * Sencha Touch object defined in "type" attribute.
	 * 
	 * @params: des - JSON describing Sencha Touch object
	 * 
	 * @return: result - Sencha Touch object described by response
	 */

	function transform(des) {
		var result, type, event;
		
		type = (des.type in typeFunct) ? des.type : defaultType;
		
		// apply default and specific properties
		content = apply(type, des);
		
		// make specific component
		result = typeFunct[type](des);
		
		// events handlers
		addEvents(result, des);

		return result;
	}
	
	function makePanel(des) {
		return new Ext.Panel(content);
	}
	
	function makeButton(des) {
		return new Ext.Button(content);
	}
	
	function makeToolbar(des) {
		return new Ext.Toolbar(content);
	}
	
	function makeTab(des){
		var elem;
		elem = apply("Tab", des);
		
		return new Ext.Tab(elem);	
	}
	
	function makeTabBar(des) {
		content.items = [];
		for ( var i = 0; i < des.list.length; i++) {
			elem = makeTab(des.list[i]);
			addEvents(elem, des.list[i]);
			content.items.push(elem);
		}
		return new Ext.TabBar(content);
	}
	
	function makeList(des) {
		var storeContent, storeModel;
		
		content.listeners = new Object();
		
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
