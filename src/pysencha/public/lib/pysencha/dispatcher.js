var Dispatcher = (function() {

	// gobal variables, available in whole class
	var obj, screen, popup, Config;

	// set global variables to defaults
	screen = {};
	popup = {};
	Config = {
		defaultURL : "shortDescription",
		dirPath : "../testy/refapp/"
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
		return Sender.getFromURL(Config.dirPath + url);
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
		console.log("in send to url", ["url", url]);
		return Sender.sendToURL(url, data);
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
	function loadURL(url, keepHash) {
		var shortDescription;

		// if url is empty, replace it with default url value
		url = url || Config.defaultURL;

		// get short description from passed url (sender request)
		shortDescription = getFromURL(url);
		// shortDescription = url;

		console.log("in load url:", ["sd", shortDescription]);

		// add record to History
		History.pushState(shortDescription, "title", url, keepHash);
		// console.log("dodałem do hist");
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

		// if there is no slots - break
		if (!slots) {
			return;
		}

		// create temporary container
		tmpCon = SenchaAdapter.getContainer();

		// analyze short description and founded items remove from container
		// (without
		// destroying)
		for (i = 0, length = slots.length; i < length; i++) {
			// get item with specified id from container
			item = SenchaAdapter.get(con, slots[i].id);

			// item found
			if (item) {
				// remove from container
				item = SenchaAdapter.remove(con, item, false);
				// add to temporary container
				tmpCon.add(item);
			}
		}

		// remove all remained components and destroy them
		SenchaAdapter.removeAll(con, true);

		// analyze short description and founded items remove from con (without
		// destroying)
		for (i = 0, length = slots.length; i < length; i++) {
			// get item with specified id from temporary container
			item = SenchaAdapter.get(tmpCon, slots[i].id);

			// item found
			if (item) {
				// remove item from container
				item = SenchaAdapter.remove(tmpCon, item, false);
			} else {
				// get full description from url
				item = getFromURL(slots[i].url);

				// parse description to sencha format
				item = Parser.transform(item);
			}

			// go deeper
			parse(item, slots[i]);

			// add item to container
			SenchaAdapter.add(con, item);
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
		screen.setLoading(true, true);

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
		screen.setLoading(false);

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
	function pageReload(state, newPage) {
		console.log("in page reload", ["state", state, "newPage", newPage]);

		containerRemodel(screen, state.shortDescription);

		// screen refresh
		SenchaAdapter.refresh(screen);

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
		// get short description from passed url (sender request)
		shortDescription = getFromURL(url);

		// apply new properties and components
		containerRemodel(popup, shortDescription);

		// show popup
		SenchaAdapter.show(popup, "pop");

		// refresh popup
		SenchaAdapter.refresh(popup);

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
		init : init
	};

	return obj;

}());
