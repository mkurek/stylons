var Dispatcher = (function() {

	// gobal variables, available in whole class
	var obj, screen, popup, Config, loadMask;

	// set global variables to defaults
	screen = {};
	popup = {};
	Config = {
		defaultURL : "menu/shortDescription/1",
		errorTitle : "UWAGA!",
		errorMsg : "Wystąpił błąd. Prosimy spróbować ponownie"
	};

	/**
	 * @public Return page object
	 * 
	 * @return {object} page object
	 */
	function getScreen() {
		return screen;
	}

	/**
	 * @public Set page object
	 * 
	 * @return {object} page object
	 */
	function setScreen(newScreen) {
		screen = newScreen;
	}

	/**
	 * @public Return popup object
	 * 
	 * @return {object} popup object
	 */
	function getPopup() {
		return popup;
	}

	/**
	 * @public Set popup object
	 * 
	 * @return {object} popup object
	 */
	function setPopup(newPopup) {
		popup = newPopup;
		return true;
	}

	/**
	 * @public Return Config object
	 * 
	 * @return {object} Config object
	 */
	function getConfig() {
		return Config;
	}

	/**
	 * @private Adapter to Sender-Receiver Object Get server response from URL
	 * 
	 * @param {string}
	 *            url URL to be requested
	 * 
	 * @return {object} JSON description - returned value from server
	 */
	function getFromURL(url) {
		var result = Sender.getFromURL(url);
		if(result == null){
			throw "getError";
		}
		return result;
	}

	/**
	 * @private Adapter to Sender-Receiver Object Send data to specified URL
	 * 
	 * @param {string}
	 *            url URL to be requested
	 * @param {Object}
	 *            data Object to be sent
	 * 
	 * @return {object} JSON description - returned value from server
	 */
	function sendToURL(url, data) {
		var result = Sender.sendToURL(url, data);
		if(result == null){
			throw "sendError";
		}
		return result;
	}

	/**
	 * @public handling request for new page components; adds record to history
	 * 
	 * @param {string}
	 *            url New url of short description
	 * @param {boolean}
	 *            keepHash True if window.location.hash won't be overwritten
	 * 
	 * @return
	 */
	function loadURL(url) {
		var shortDescription;

		// if url is empty, replace it with default url value
		url = url || Config.defaultURL;

		try{
			// get short description from passed url (sender request)
			shortDescription = getFromURL(url);
			pageReload(shortDescription);
		} catch (err){
			errorAlert();
		}
	}
		

	/**
	 * @private parse short description and apply changes to container (add new
	 *          items, remove unnecessary)
	 * 
	 * @param {object}
	 *            con Container to remodel
	 * 
	 * @param {object}
	 *            sd Short description to parse
	 * 
	 * @return
	 */
	function parse(con, sd) {
		var i = 0, length = 0, slots = sd.slots, tmpCon = [], item = {};

		/*
		// if there is no slots - break
		if (!slots) {
			return;
		}
		*/
		
		//console.log("in ", con.id)
		// create temporary container
		tmpCon = SenchaAdapter.getContainer();

		if(slots)
		{
			// analyze short description and remove founded items from container
			// (without destroying)
			for (i = 0, length = slots.length; i < length; i++) {
				// get item with specified id from container
				item = SenchaAdapter.get(con, slots[i].id);
	
				// item found
				if (item) {
					//console.log("item ", slots[i].id, " founded in ", con.id);
					// remove from container
					item = SenchaAdapter.remove(con, item, false);
					// add to temporary container
					tmpCon.add(item);
				}
			}
		
			//console.log("remove all from ", con.id);
			// remove all remained components and destroy them
			SenchaAdapter.removeAll(con, true);
		
			// analyze short description and remove founded items from con (without
			// destroying)
			for (i = 0, length = slots.length; i < length; i++) {
				// get item with specified id from temporary container
				item = SenchaAdapter.get(tmpCon, slots[i].id);
	
				//console.log("before add: ", slots[i].id, " to ", con.id);
				
				// item found
				if (item) {
					// remove item from container
					item = SenchaAdapter.remove(tmpCon, item, false);
				} else {
					//console.log("new item");
					// get full description from url
					item = getFromURL(slots[i].url);
	
					//console.log("Dispatcher - transform - id = ", item.id, "item", item, "url", slots[i].url)
					// parse description to sencha format
					item = Parser.transform(item);
				}
	
				// go deeper
				parse(item, slots[i]);
				
				// add item to container
				SenchaAdapter.add(con, item);
	
				//console.log("after add item ", item.id, " to ", con.id);
			}
			
		}

		// destroy temporary container
		SenchaAdapter.destroy(tmpCon);

		// refresh container
		//SenchaAdapter.refresh(con);
	}

	/**
	 * @private remodel container and all it childs
	 * 
	 * @param {object}
	 *            con Container to remodel
	 * 
	 * @param {object}
	 *            sd Short description to be applied
	 * 
	 * @return {object} container Container after remodeling
	 */
	function containerRemodel(container, shortDescription) {
		var description;

		// set loading mask
		//loadMask.show();

		// remodel screen
		parse(container, shortDescription);

		// apply description to highest level of description
		if (shortDescription.url && container.id === shortDescription.id) {
			// get full description on main container
			description = getFromURL(shortDescription.url);

			// if ids are the same and description has specified type
			if (description.id === container.id && description.type) {
				// apply properties
				Parser.applyToInstance(container, description);
			}
		}

		// hide loading mask
		//loadMask.hide();
		
		return container;
	}

	/**
	 * @public called to reload the page
	 * 
	 * @param {object}
	 *            state New state of page; properties: shortDescription, title,
	 *            url
	 * @param {boolean}
	 *            newPage False if page loaded using back/forward button, true
	 *            otherwise
	 * 
	 * @return
	 */
	function pageReload(shortDescription, newPage) {
		containerRemodel(screen, shortDescription);

		// screen refresh
		SenchaAdapter.refreshAll(screen);

		// show screen
		SenchaAdapter.show(screen);

	}

	/**
	 * @public shows popup
	 * 
	 * @param {string}
	 *            url URL address with short description of popup
	 * 
	 * @return false if url was wrong, true otherwise
	 */
	function specialSlotShow(url) {
		var shortDescription;

		// if url is not a string
		if (!Ext.isString(url)) {
			return false;
		}
		try{
			// get short description from passed url (sender request)
			shortDescription = getFromURL(url);
	
			// apply new properties and components
			containerRemodel(popup, shortDescription);
	
			// show popup
			SenchaAdapter.show(popup, "pop");
		}
		catch(error){
			errorAlert();
		}
		// refresh popup
		SenchaAdapter.refreshAll(popup);

		return true;
	}

	/**
	 * @public hide popup
	 * 
	 * @return
	 */

	function specialSlotHide() {
		SenchaAdapter.hide(popup);
	}
	
	
	function errorAlert(){
		/*
		if(!popup.hidden){
			console.log("error case 1");
			popup.on("hide", function(){SenchaAdapter.showErrorAlert(Config.errorTitle, Config.errorMsg);});
			specialSlotHide();
		}
		else{
			console.log("error case 1");*/
			specialSlotHide();
			window.setTimeout(SenchaAdapter.showErrorAlert(Config.errorTitle, Config.errorMsg), 100000);
		//}
	}

	/**
	 * @private create new instance of default screen
	 * 
	 * @return {Object} default screen object
	 */
	function defaultScreen() {
		return Parser.transform({
			type : "Screen",
			id : 'screen',
			slot : 'screen',
			fullscreen : true,
			layout : 'fit'
		});
	}

	/**
	 * @private create new instance of default popup
	 * 
	 * @return {Object} default popup object
	 */
	function defaultPopup() {
		return Parser.transform({
			type : "SpecialPanel",
			id : 'popup',
			slot : 'special',
			// width : 200,
			// height : 400,
			layout : 'auto'
		});
	}

	/**
	 * @public init function; initialize screen and popup
	 * 
	 * @return
	 */
	function init() {
		loadMask = new Ext.LoadMask(Ext.getBody());

		// set default screen
		screen = defaultScreen();

		// set default popup
		popup = defaultPopup();
	}

	obj = {
		load : loadURL,
		pageReload : pageReload,
		getScreen : getScreen,
		Config : getConfig,
		specialShow : specialSlotShow,
		specialHide : specialSlotHide,
		send : sendToURL,
		setScreen : setScreen,
		setPopup : setPopup,
		getPopup : getPopup,
		init : init,
		errorAlert : errorAlert
	};

	return obj;

}());
