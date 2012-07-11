var Dispatcher = (function() {

	// gobal variables, available in whole class
	var obj, screen, popup, Config, components, configURL;

	// set global variables to defaults
	screen = {};
	popup = {};
	components = {};

	// default config, despite config from server
	Config = {
		// IMPORTANT! Dispatcher get from this URLs configuration and
		// components. Make sure
		// You know what are You doing before touching this.
		configURL : "stylons_/config",
		componentsListURL : "getComponents/index",
		defaultURL : "index",

		errorTitle : "ERROR!",
		errorMsg : "An error occured. Please try again later.",

		defaultScreenID : "screen",
		defaultPopupID : "popup/index",
		popupAnimation : "pop"
	};

	/**
	 * @private Return page object
	 * 
	 * @return {object} page object
	 */
	function getScreen() {
		return screen;
	}

	/**
	 * @private Return popup object
	 * 
	 * @return {object} popup object
	 */
	function getPopup() {
		return popup;
	}

	/**
	 * @private Adapter to Sender-Receiver Object Get server response from URL
	 * 
	 * @param {string}
	 *            url URL to be requested
	 * 
	 * @throw getError
	 * 
	 * @return {object} JSON description - returned value from server
	 */
	function getFromURL(url) {
		var result = Sender.getFromURL(url);
		if (result === null) {
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
	 * @throw sendError
	 * 
	 * @return {object} JSON description - returned value from server
	 */
	function sendToURL(url, data) {
		var result = Sender.sendToURL(url, data);
		if (result == null) {
			throw "sendError";
		}
		return result;
	}

	/**
	 * @private Adapter to Sender-Receiver Object. Download list of components
	 *          description, based on list of URLs.
	 * 
	 * @param {Array}
	 *            missingComponents array of missing components
	 * 
	 * @return {Object} map (associative array) of downloaded components (key is
	 *         URL)
	 */
	function downloadComponents(missingComponents) {
		var i = 0, length = 0, components = {};

		components = Sender.getComponentsList(Config.componentsListURL,
				missingComponents);

		// apply url parameter to all components
		for (i in components) {
			components[i]["url"] = i;
		}

		return components;
	}

	/**
	 * @private Get component from specific URL
	 * 
	 * @param {string}
	 *            url URL with desirable component
	 * 
	 * @throws getComponentError
	 * 
	 * @return {object} JSON description - desirable component
	 */
	function getComponent(url) {
		if (components[url]) {
			return components[url];
		}
		throw "getComponentError";
	}

	/**
	 * @public handling request for new page components; adds record to history
	 * 
	 * @param {string}
	 *            url New url of short description
	 * @param {boolean}
	 *            keepHash True if window.location.hash will not be overwritten
	 * 
	 * @return
	 */
	function loadURL(url, keepHash) {
		var shortDescription;

		// if URL is empty, replace it with default URL value
		url = url || Config.defaultURL;

		try {
			// get short description from passed url (sender request)
			shortDescription = getFromURL(url);

			// add info to History
			History.pushState(shortDescription, "", url, keepHash);

		} catch (err) {
			errorAlert();
		}
	}

	/**
	 * @private Determines missing components at current depth
	 * 
	 * @param {Object}
	 *            con container to check
	 * @param {Object}
	 *            sd new short description
	 * 
	 * @return {Array} list of missing components
	 */
	function miss(con, sd) {
		var item = {}, slots = sd.slots, missing = [], tmp, length, i;

		// if component in short description has determined slots
		if (slots) {
			for (i = 0, length = slots.length; i < length; i++) {
				item = SenchaAdapter.get(con, slots[i].url);
				// push url to array if component is missing
				if (!item || item.alwaysReload) {
					missing.push(slots[i].url);
					item = {};
				}
				// call recursively
				tmp = miss(item, slots[i]);
				// merge arrays
				missing = missing.concat(tmp);
			}
		}

		return missing;
	}

	/**
	 * @private Make array unique
	 * 
	 * @param {Array}
	 *            arr array to be made unique
	 * 
	 * @return {Array} unique array
	 */
	function unique(arr) {
		var a = [], l = arr.length, i, j;
		for (i = 0; i < l; i++) {
			for (j = i + 1; j < l; j++) {
				if (arr[i] === arr[j]) {
					j = ++i;
				}
			}
			a.push(arr[i]);
		}
		return a;
	}

	/**
	 * @private Determines what components are missing
	 * 
	 * @param {Object}
	 *            con container to check
	 * @param {Object}
	 *            sd new short description
	 * 
	 * @return {Array} list of missing components
	 */
	function getMissingComponents(con, sd) {
		var missing;
		missing = miss(con, sd);

		// main container
		if (sd.url !== con.id || con.alwaysReload) {
			missing.push(sd.url);
		}

		return unique(missing);
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
		 * // if there is no slots - break if (!slots) { return; }
		 */

		//console.log("in ", con.id)
		// create temporary container
		tmpCon = SenchaAdapter.getContainer();

		if (slots && !con.list) {
			// analyze short description and remove founded items from container
			// (without destroying)
			for (i = 0, length = slots.length; i < length; i++) {
				// get item with specified id from container
				item = SenchaAdapter.get(con, slots[i].url);
				//console.log("looking for ", slots[i].url, " in ", con.id)
				// item found
				if (item && !item.alwaysReload) {
					//console.log("item ", slots[i].url, " founded in ", con.id);
					// remove from container
					item = SenchaAdapter.remove(con, item, false);
					// add to temporary container
					tmpCon.add(item);
				}
			}
			
			//console.log("remove all from ", con.id);
			// remove all remained components and destroy them
			SenchaAdapter.removeAll(con, true);
			//console.log("after remove from ", con.id)
			// analyze short description and remove founded items from con
			// (without destroying)
			for (i = 0, length = slots.length; i < length; i++) {
				// get item with specified id from temporary container
				item = SenchaAdapter.get(tmpCon, slots[i].url);

				//console.log("before add: ", slots[i].url, " to ", con.id);
				
				// item found
				if (item) {
					//console.log("item ", slots[i].url, " found - get from tmpCon")
					// remove item from container
					item = SenchaAdapter.remove(tmpCon, item, false);
				} else {
					//console.log("new item");
					// get full description from url
					item = getComponent(slots[i].url);

					//console.log("Dispatcher - transform - id = ", item.url,
                    //"item: ", item, "url: ", slots[i].url)
					// parse description to sencha format
					item = Parser.transform(item);
					//console.log("after parsing: item.id == ", item.id, "; item.url == ", item.url)
				}

				// go deeper
				parse(item, slots[i]);

				// add item to container
				SenchaAdapter.add(con, item);
				
				//console.log("after add item ", item.url, " to ", con.url);
			}

		}

		// destroy temporary container
		SenchaAdapter.destroy(tmpCon);

		// refresh container
		// SenchaAdapter.refresh(con);
	}

	/**
	 * @private remodel container and all it childs
	 * 
	 * @param {object}
	 *            container Container to remodel
	 * 
	 * @param {object}
	 *            shortDescription Short description to be applied
	 * 
	 * @return {object} container Container after remodeling
	 */
	function containerRemodel(container, shortDescription) {
		var description;

		// remodel screen
		parse(container, shortDescription);
		
		// apply description to highest level of description
		if (shortDescription.url
				&& (container.id !== shortDescription.url || container.alwaysReload)) {
			// get full description on main container
			description = getComponent(shortDescription.url);

			// if ids are the same and description has specified type
			if (description.type) {
				// apply properties
				Parser.applyToInstance(container, description);
			}
		}

		return container;
	}

	/**
	 * @public called from History to reload the page
	 * 
	 * @param {Object}
	 *            shortDescription short description of new page
	 * @param {string}
	 *            title title in history
	 * @param {string}
	 *            url url returning short description
	 * 
	 * @return
	 */
	function pageReload(shortDescription, title, url) {
		var missing;

		//console.log("sd: ", shortDescription)

		try {
			// get missing components to reload page
			missing = getMissingComponents(screen, shortDescription);
			//console.log("missing: ", missing)
			// download missing components
			components = downloadComponents(missing);
			//console.log("components", components)
			// update screen container and all components
			containerRemodel(screen, shortDescription);
		} catch (err) {
			errorAlert();
		}

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
	function popupShow(url) {
		var shortDescription, missing;

		// if url is not a string
		if (!Ext.isString(url)) {
			return false;
		}

		try {
			// get short description from passed url (sender request)
			shortDescription = getFromURL(url);

			// get missing components to show popup
			missing = getMissingComponents(popup, shortDescription);
			//console.log("popup missing: ", missing);

			// download missing components
			components = downloadComponents(missing);

			// apply new properties and components
			containerRemodel(popup, shortDescription);

			// show popup
			SenchaAdapter.show(popup, Config.popupAnimation);
		} catch (error) {
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

	function popupHide() {
		Ext.getBody().unmask();
		SenchaAdapter.hide(popup);
	}

	/**
	 * @private show popup with error message
	 * 
	 * @return
	 */

	function errorAlert() {
		popupHide();
		SenchaAdapter.showAlert(Config.errorTitle, Config.errorMsg);
	}

	/**
	 * @private create new instance of default screen
	 * 
	 * @return {Object} default screen object
	 */
	function defaultScreen() {
		return Parser.transform({
			type : "Screen",
			id : Config.defaultScreenID,
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
			id : Config.defaultPopupID,
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
		var conf;
		// load config
		try {
			conf = getFromURL(Config.configURL);
			SenchaAdapter.apply(Config, conf);
		} catch (error) {
			// error alert (with default config!)
			errorAlert();
		}

		// set default screen
		screen = defaultScreen();

		// set default popup
		popup = defaultPopup();
	}

	obj = {
		load : loadURL,
		pageReload : pageReload,
		getScreen : getScreen,
		Config : Config,
		specialShow : popupShow,
		specialHide : popupHide,
		send : sendToURL,
		getPopup : getPopup,
		init : init,
		errorAlert : errorAlert
	};

	return obj;

}());
