/**
 * Parser - class returning method to parse server's response to SenchaTouch object
 */

var Parser = function() {
	
	/**
	 * Global variables declaration:
	 * 
	 * defaultType - default type to apply, if wrong is specified
	 * 
	 * types - map with handlers to functions, types description, available events, inheritance, short-names
	 * 
	 * events - object describing events
	 */
	var defaultType, types, events;
	
	
	/** 
	 * global variables definitions
	 */
	// set default component type to Panel
	defaultType = "Panel";

	// link between component type and handler function
	types = {
		"Default" : {
			fn : makePanel,
			description : {
				id : "",
				slot : "",
				cls : '', // CSS style class
				type: defaultType
			}
		},	
		"SpecialPanel" : {
			fn: makePanel,
			description : {
				floating : true,
				modal : true,
				fullscreen : false,
				centered : true,
				margin: undefined,
				padding: undefined,
				width : 'auto',
				height : 'auto',
				styleHtmlContent : false,
				ui : 'dark',
				layout: 'auto'
			}
		},
		"Screen" : {
			fn: makePanel,
			description : {
				fullscreen : true,
				margin : 0, // {Number | String (eg. '10 2 4 5')}
				padding : 0, // {Number | String (eg. '10 2 4 5')}
				layout: 'auto'
			}
		},
		"Panel" : {
			fn: makePanel,
			description : {
				html : "",
				fullscreen : false,
				styleHtmlContent : false,
				margin : 0, // {Number | String (eg. '10 2 4 5')}
				padding : 0, // {Number | String (eg. '10 2 4 5')}
				scroll : false, // {vertical | horizontal | both | false}
				layout : 'auto',
			}
		},
		"Toolbar" : {
			fn: makeToolbar,
			description : {
				ui : 'dark', // {'dark' | 'light'}
				dock : 'top', // {'top' | 'bottom' | 'left' | 'right'}
				margin : 0, // {Number | String (eg. '10 2 4 5')}
				padding : 0, // {Number | String (eg. '10 2 4 5')}
				title : '' // {String}
			}
		},
		"TabBar" : {
			fn: makeTabBar,
			description : {
				dock : 'bottom', // {'top' | 'bottom' | 'left' | 'right'}
				ui : 'dark', // {'dark' | 'light'}
				fullscreen : false,
				scroll : false,
				list: '',
				layout : { // default layout
					pack : 'center'
				}
			},
			inheritance : "Panel"
		},
		"Button" : {
			fn: makeButton,
			description : {
				iconCls : '', // {String} background image
				text : '', // {String}
				flex : null, //how much of the remaining size to take up
				badgeText : '', // {String} text for badge on the button
				ui : 'normal' // {'normal' | 'back' | 'round' | 'action' |
			// 'forward'} button style
			},
			substitute : {
				icon : 'iconCls',
				badge : 'badgeText'
			},
			events : ["tap"]
		},
		"Tab" : {
			fn: makeTab,
			description : {
				active : false // {true | false} Tab highlight
			},
			inheritance : "Button",
			substitute : {
				icon : 'iconCls',
				badge : 'badgeText'
			},
			events : ["tap"]
		},
		"Spacer" : {
			fn : makeSpacer,
			description : {}
		},
		"List" : {
			fn: makeList,
			description : {
				itemTpl : '{text}', // {String}
				list : '',
				fullscreen : true, // {true | false}
				emptyText : 'empty List', // {String}
				indexBar : false // {true | false}
			},
			substitute : {
				itemtpl : 'itemTpl'
			},
			events : ["itemtap"]
		},
		// form components
		"Form" : {
			fn: makeForm,
			description : {
				url : '',	// {String} default url to send form
				list : ''
			},
			inheritance : "Panel"
		},
		"Fieldset" : {
			fn: makeFieldset,
			description : {
				title : '',	// {String} fields group title, shown above fields in group
				instructions : '', // {String} optional instructions, shown under title
				list : ''
			}
		},
		"Field" : {
			fn: makeField,
			description : {
				disabled : false, // {true | false} specifies if field is disabled
				type : 'text',	// {'text' | 'password' | 'file' | 'radio'} Specifies field input type
				label : '', // {String}
				name : '', // {String}
				required : false,	// {true | false} field requirement
				value : '' // {String} default field value
			}
		},
		"HiddenField" : {
			fn: makeHiddenField,
			description : {},
			inheritance : "Field"
		},
		"TextField" : {
			fn: makeTextField,
			description : {
				maxLength : 0 // {Int} max length of input text
			},
			inheritance : "Field"
		},
		"SelectField" : {
			fn: makeSelectField,
			description : {
				options : '' // select options - array of object with text and value properties
			},
			inheritance : "TextField"
		},
		"TextareaField" : {
			fn: makeTextareaField,
			description : {
				maxRows : undefined // {Int} - max textarea rows
			},
			inheritance : "TextField"
		},
		"Checkbox" : {
			fn: makeCheckbox,
			description : {
				checked : false, // {true | false} if checkbox is checked
				value : '' // {String} what value will be send if checkbox is checked
			},
			inheritance : "Field"
		},
		"Radio" : {
			fn: makeRadio,
			description : {},
			inheritance : "Checkbox"
		}
	}; 

	// events description
	events = {
		itemtap : {
			index : [1]
		},
		tap : {
			id : [0, "id"]
		} 
	};

	
	
	// auxiliary function 1 - check for available variables in types properties, get their value from default arguments (defArgs)
	function getVarsValue(name, args){
		var vars = {}, i, tmp, varName, j, varDes, len;
		
		if(!!events[name]){
			for(i in events[name]){	
				
				varName = i;
				varDes = events[name][i];
				tmp = args;
				
				for(j=0, len=varDes.length; j < len; j++){
					if(tmp[varDes[j]] !== undefined){
						tmp = tmp[varDes[j]];
					}
					else{
						tmp = undefined;
						break;
					}
				}
				
				vars[varName] = tmp;
			}
		}
		return vars;
	}
	
	// auxiliary function 2 - replace {var} with variable value
	function replaceValues(vars, des){
		console.log("replaceValues", ["args", arguments, "url", des.url]);
		var pattern, i, j, value, str;
		
		for(i in vars){
			// pattern: {key} with global and case-insensitive modifiers
			pattern = new RegExp("{"+i+"}", 'ig');
			value = vars[i];
			
			// for all params in desrciption of reaction 
			for(j in des){
				str = des[j];
				if(Ext.isString(str)){
					str = str.replace(pattern, value);
				}
				else if(Ext.isObject(str)){
					str = replaceValues(vars, str)
				}
				des[j] = str;
			}
		}
		return des;
	}
	
	/**
	 * @private 
	 * React to event
	 * 
	 * @param {String}
	 *          name - name of item
	 *            
	 * @param {Object}
	 * 			des - event description
	 * 
	 * @param {Array}
	 * 			Array of arguments, passed to default event function
	 * 
	 * @return
	 */
	
	function eventHandler(name, des, defArgs) {
		var vars, i, j, reaction, data, result, reactions;

		console.log("eventHandler;", ["args", arguments, "des.url", des.url]);
		
		// get available variables values
		vars = getVarsValue(name, defArgs);
		console.log("vars", vars);
		
		// make link to des
		reactions = des;
		
		// make reactions an array
		if(!Ext.isArray(reactions)){
			reactions = [reactions];
		}
		
		// for every description in table
		// notice des.length make on purpose - des array could be extended!
		for(i = 0; i < reactions.length; i++){
			result = false;
			
			// make copy of this reaction description
			reaction = Ext.apply({}, reactions[i]);
			
			// change {key} to matching them values
			reaction = replaceValues(vars, reaction);
			console.log("des["+i+"]", reaction);
			
			// in case of reaction type
			// Send data to server, wait for JSON-reaction
			if(reaction.type === 'send'){
				console.log("send reaction");
				if(!!reaction.url && !!reaction.dataId){
					console.log("url i dataId ok");
					
					data = Ext.getCmp(dataId);
					
					if(!!data && !!data.getValues){
						data = data.getValues();
						console.log("data ok", ["data", data]);
						
						result = Dispatcher.send(reaction.url, data);	
					}
				}
			}
			// load new Page - call Dispatcher.load with false to keepHash
			else if(reaction.type === 'load'){
				console.log("load reaction");
				
				if(!!reaction.url){
					console.log("url ok");
					
					result = Dispatcher.load(reaction.url);
				}
			}
			// load special slot content (popup)
			else if(reaction.type === 'specialShow'){
				console.log("special show reaction");
				
				if(!!reaction.url){
					console.log("url ok");
					
					result = Dispatcher.specialShow(reaction.url);
				}
			}
			// load special slot content (popup)
			else if(reaction.type === 'specialHide'){
				console.log("special hide reaction");
				result = Dispatcher.specialHide(reaction.url);
				
			}
			
			// check result for new reaction
			if(Ext.isObject(result) && !!result.type){
				console.log("result ok", ["result", result]);
				
				reactions.push(result);
			}	
		}// end for
		
		return true;
	}
	
	/**
	 * @private 
	 * Add defined event listeners to component
	 * 
	 * @param {Object} component
	 *            component, to which events will be added
	 * @param {Object} description
	 * description of component
	 * 
	 * @return {Object} component
	 * component after adding events listeners
	 */
	function addEvents(component, description){
		var event, avEv = types[component.type].events;
		
		if(!!description.action){
			//console.log("jest action");
			// for every event defined in action
			for(event in description.action){
				//console.log("event", [event, description.action[event], component]);
				// if component handle addListener method and dispatcher allow to use this event
				if(!!component.addListener && !!component.events[event] && !!avEv && avEv.indexOf(event) !== -1){
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
	 * Apply only specyfic properties to already initiated component
	 * 
	 * @param {object} component 
	 * component to apply properties
	 * 
	 * @param {object} description 
	 * detailed description of specific component
	 * 
	 * @return 
	 */
	function applyToInstance(component, description){
		var type;
		
		type = component.type;
		
		if(!!type && type in types){
			for (property in description) {
				if (property in component) {
					component[property] = description[property];
				}
			}
		}
		
		return component;
	}
	
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
		var obj, property, sub;
		
		// private function to inherit properties
		function inherit(o, type){
			var inh = types[type].inheritance;
			
			if(!!inh && inh in types){
				// go deeper
				o = inherit(o, inh);
				
				// apply properties in act level
				o = Ext.apply(o, types[inh].description);	
			}
			return o;
		}
		
		// apply default properites for given type
		obj = Ext.apply({}, types["Default"].description);
		
		// inherit properties
		obj = inherit(obj, type);
		
		// apply for given highest type
		obj = Ext.apply(obj, types[type].description);
		
		// apply specific properties, overwrite default properties
		// NOTE : properties not included in default description will not be
		// included in content
		sub = types[type].substitute;
		
		for (property in specificDescription) {
			if (property in obj) {
				obj[property] = specificDescription[property];
			}
			// check for short-name
			else if (!!sub && property in sub)
				obj[sub[property]] = specificDescription[property];
		}
		
		/*
		// apply private properties
		if(!!types[type].privateDescription){
			obj = Ext.apply(obj, types[type].privateDescription);
		}
		*/
		return obj;
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
		
		type = (des.type in types) ? des.type : (des.type = defaultType);
		
		// apply default and specific properties
		result = apply(type, des);
		
		// make specific component
		result = types[type].fn(result, des);
		
		// apply events handlers
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
	
	function makeSpacer(content, des){
		return new Ext.Spacer(content);
	}
	
	function makeTabBar(content, des) {
		content = addItems(content, des, "Tab");
		return new Ext.TabBar(content);
	}
	
	function makeList(content, des) {
		console.log("in make list", content, des, typeof content.store);
		var storeContent, storeModel;
		
		storeContent = {
			data : des.list
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
	
	return {
		transform : transform,
		applyToInstance : applyToInstance
	}

	
}();
