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
	
	var defaultType = "Panel", 
	// link between component type and handler function
	typeFunct = {
		"Panel" : makePanel,
		"List" : makeList,
		"TabBar" : makeTabBar,
		"Button" : makeButton,
		"Toolbar" : makeToolbar,
		"Tab" : makeTab,
		"Form" : makeForm,
		"Fieldset" : makeFieldset,
		"Field" : makeField,
		"HiddenField" : makeHiddenField,
		"TextField" : makeTextField,
		"SelectField" : makeSelectField,
		"TextareaField" : makeTextareaField,
		"Checkbox" : makeCheckbox,
		"Radio" : makeRadio
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
			},
			fullscreen : false,
			list: []
		},
		"Tab" : {
			active : false
		// {true | false} Tab highlight
		},
		"Button" : {
			iconCls : '', // {String} background image
			text : '', // {String}
			badgeText : '', // {String} text for badge on the button
			ui : 'normal' // {'normal' | 'back' | 'round' | 'action' |
		// 'forward'} button style
		},
		
		// form components
		"Form" : {
			url : '',	// {String} default url to send form
			list : []
		},
		
		"Fieldset" : {
			title : '',	// {String} fields group title, shown above fields in group
			instructions : '', // {String} optional instructions, shown under title
			list : []
		},
		
		"Field" : {
			disabled : false, // {true | false} specifies if field is disabled
			type : 'text',	// {'text' | 'password' | 'file' | 'radio'} Specifies field input type
			label : '', // {String}
			name : '', // {String}
			required : false,	// {true | false} field requirement
			value : '' // {String} default field value
		},
		
		"HiddenField" : {
			
		},
		
		"TextField" : {
			maxLength : 0 // {Int} max length of input text
		},
		
		"SelectField" : {
			options : [] // select options - array of object with text and value properties
		},
		
		"TextreaField" : {
			maxRows : undefined // {Int} - max textarea rows
		},
		
		"Checkbox" : {
			checked : false, // {true | false} if checkbox is checked
			value : '' // {String} what value will be send if checkbox is checked
		},
		
		"Radio" : {
			
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
	},
	
	// inheritance map
	inheritance = {
			"Form" : "Panel",
			"TabBar" : "Panel",
			"TextField" : "Field",
			"HiddenField" : "Field",
			"SelectField" : "TextField",
			"TextareaField" : "TextField",
			"Checkbox" : "Field",
			"Radio" : "Checkbox",
			"Tab" : "Button"
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
		
		// check for type in defaults map
		type = (type in defaults) ? type : defaultType;
		
		// private function to inherit properties
		function inherit(o, type){
			if(type in inheritance && inheritance[type] in defaults){
				// go deeper
				o = inherit(o, inheritance[type]);
				
				// apply properties in act level
				o = Ext.apply(o, defaults[inheritance[type]]);	
			}
			return o;
		}
		
		// apply default properites for given type
		obj = Ext.apply({}, defaults["Default"]);
		// inherit properties
		obj = inherit(obj, type);	
		// apply for given highest type
		obj = Ext.apply(obj, defaults[type]);
		
		
		// apply specific properties, overwrite default properties
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
		return component;
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
		result = apply(type, des);
		
		// make specific component
		result = typeFunct[type](result, des);
		
		// events handlers
		result = addEvents(result, des);

		return result;
	}
	
	
	function addItems(content, des, defaultItemType){
		var elem, i, len;
			
		if(!!des.list && Ext.isArray(des.list)){
			if(!content.items || !Ext.isArray(content.items)){
				content.items = [];
			}
			
			for(i = 0, len = des.list.length; i<len; i++){
				if(!des.list[i].type){
					des.list[i].type = defaultItemType;
				}
				elem = transform(des.list[i]);
				content.items.push(elem);
			}
		}	
		
		return content;
	}
	
	
	function makePanel(content, des) {
		return new Ext.Panel(content);
	}
	
	function makeButton(content, des) {
		return new Ext.Button(content);
	}
	
	function makeToolbar(content, des) {
		return new Ext.Toolbar(content);
	}
	
	function makeTab(content, des){
		return new Ext.Tab(content);	
	}
	
	function makeTabBar(content, des) {
		content = addItems(content, des, "Tab");
		
		return new Ext.TabBar(content);
	}
	
	function makeList(content, des) {
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

	// forms
	
	
	function makeForm(content, des){
		content = addItems(content, des, "Field");
		
		return new Ext.form.FormPanel(content);
	}
	
	function makeFieldset(content, des){
		content = addItems(content, des, "Field");
		
		return new Ext.form.FieldSet(content);
	}
	
	function makeField(content, des){
		return new Ext.form.Field(conent);
	}
	
	function makeHiddenField(content, des){
		return new Ext.form.Hidden(conent);
	}
	
	function makeTextField(content, des){
		return new Ext.form.Text(content);
	}
	
	function makeSelectField(content, des){
		return new Ext.form.Select(conent);
	}
	
	function makeTextareaField(content, des){
		return new Ext.form.Textarea(conent);
	}
	
	function makeCheckbox(content, des){
		return new Ext.form.Checkbox(conent);
	}
	
	function makeRadio(content, des){
		return new Ext.form.Radio(conent);
	}
}();
