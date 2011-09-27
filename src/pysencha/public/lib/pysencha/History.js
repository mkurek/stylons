var History = (function(window) {
	var currentToken, // current token with id and token params
	statesHistory, // array to keep previous states
	hashChangeSupport, // hashchange event support
	checkInterval, // interval to check hash change
	recentlyAdded, // recently added page status
	obj; // object to return

	checkInterval = 100;
	recentlyAdded = false;
	statesHistory = [];
	hashChangeSupport = false;
	currentToken = {
		id : -1,
		token : ""
	};

	/**
	 * @private get hash from URL address
	 * 
	 * @param {string}
	 *            url - url to find the hash
	 * 
	 * @return {string} hash (anchor)
	 */
	function getHash(url) {
		console.log("url: " + url);
		var pos = url.indexOf('#');
		return (pos === -1) ? '' : url.substr(pos);
	}

	/**
	 * @private get current token
	 * 
	 * @return {string} current token
	 */
	function getCurrentToken() {
		return decodeURI(currentToken.token);
	}

	/**
	 * @private clean token (remove #) encode special characters in token
	 * 
	 * @param {string}
	 *            token - token to clean
	 * 
	 * @return {string} cleaned token
	 */
	function cleanToken(token) {
		return encodeURI(token[0] === '#' ? token.substr(1) : token);
	}

	/**
	 * @private return statesHistory
	 * 
	 * @return {object} states history
	 */
	function getHistory() {
		return statesHistory;
	}

	/**
	 * @public put new record to states history
	 * 
	 * @param {object}
	 *            shortDescription - short description connected with the url
	 * @param {string}
	 *            title - new page title
	 * @param {string}
	 *            url - new page url
	 * @param {boolean}
	 *            keepHash - true if window.location.hash won't be overwritten,
	 *            false otherwise
	 * 
	 * @return
	 */
	function pushState(shortDescription, title, url, keepHash) {
		// set currentToken to url
		currentToken.token = cleanToken(url) || Dispatcher.Config().defaultURL;

		// delete all history records after previous
		if (currentToken.id++ !== statesHistory.length) {
			statesHistory.splice(currentToken.id);
		}

		// add state to history
		statesHistory.push({
			shortDescription : shortDescription,
			title : title,
			url : getCurrentToken()
		});

		// set recentlyAdded to true
		recentlyAdded = true;

		// udpate window.location.hash
		if (!keepHash) {
			window.location.hash = currentToken.token;
		}
	}

	/**
	 * @public handler to hashchange event reload page (call Dispatcher method)
	 * 
	 * @param {object}
	 *            obj - object connected with hashchange event; params: newURl
	 *            {string}, oldURL {string} - both full paths
	 * 
	 * @return
	 */
	function onHashChange(obj) {
		var i = 0, token, moveForward = true; // true if new page added or forward
										// move, false
		// otherwise

		// console.log("hash change event! obj: ", [obj]);

		// hide popup
		Dispatcher.specialHide();

		// callback after back or forward button
		if (recentlyAdded !== true) {
			// get encoded token from newURL property
			token = cleanToken(window.location.hash
					|| Dispatcher.Config().defaultURL);

			// search token in states history
			for (i = statesHistory.length - 1; i >= 0; i--) {
				if (statesHistory[i].url === token) {
					break;
				}
			}

			// newURL was not in states history - call Dispatcher load with new
			// url
			// two ways leading that state: 1) user modified url manually, 2)
			// back button used after page refresh
			// second option much more possible, so moveForward set to false
			if (i === -1) {
				Dispatcher.load(decodeURI(token), true);

				// act like after back button clicked
				moveForward = false;
			} else {
				// newURL was in states history - update currentToken

				// new state was before current in history - move back
				if (currentToken.id > i) {
					moveForward = false;
				}

				// set currentToken
				currentToken.id = i;
				currentToken.token = statesHistory[i].url;
			}
		}

		// call dispatcher's pageReload
		Dispatcher.pageReload(statesHistory[currentToken.id], moveForward);

		// reset recentlyAdded status
		recentlyAdded = false;
	}

	/**
	 * @public History initialization Check for hashchange event support Define
	 *         event handler
	 * 
	 * @return
	 */
	function init() {
		// check for onhashchange support
		hashChangeSupport = (window.onhashchange !== "undefined");

		// add hash change listener
		if (hashChangeSupport) {
			// console.log("hashchange supported");
			window.addEventListener('hashchange', onHashChange, false);
		} else {
			// console.log("hashchange doesn't supported");
			setInterval(
					function() {
						var newToken = cleanToken(window.location.hash), oldToken = getCurrentToken();

						if (newToken !== oldToken) {
							onHashChange({
								oldURL : oldToken,
								newURL : newToken
							});
						}
					}, checkInterval);
		}
		return true;
	}

	obj = {
		pushState : pushState,
		getToken : getCurrentToken,
		onHashChange : onHashChange,
		cleanToken : cleanToken,
		getHistory : getHistory,
		init : init
	};

	return obj;

}(window));