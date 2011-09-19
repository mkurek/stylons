var Dispatcher = function() {
		// gobal variables, available in whole class
		var screen = {}, popup = {},
			Config = {
				defaultURL : "shortDescription",
				dirPath : "testy/refapp/"
			};
		
		/**
		 * @public Return page object
		 * 
		 * @return {object} page object
		 */
		function getScreen() {
				return screen;
		};
		
		
		/**
		 * @public Set page object
		 * 
		 * @return {object} page object
		 */
		function setScreen(newScreen) {
				screen = newScreen;
		};
		
		
		/**
		 * @public Return popup object
		 * 
		 * @return {object} popup object
		 */
		function getPopup() {
				return popup;
		};
		
		
		/**
		 * @public Set popup object
		 * 
		 * @return {object} popup object
		 */
		function setPopup(newPopup) {
				popup = newPopup;
		};
		
		/**
		 * @public Return Config object
		 * 
		 * @return {object} Config object
		 */
		function getConfig() {
				return Config;
		};
		
		
		function specialSlotShow(url){
			var shortDescription;
			console.log("in special slot", ["url", url]);

			// if url is empty, replace it with default url value
			url = url || Config.defaultURL;
			
			// get short description from passed url (sender request)
			shortDescription = getFromURL(url);
			
			// parse short description
			parse(popup, shortDescription);
			
			// refresh popup
			SenchaAdapter.refresh(popup);
			popup.show('pop');
			
			return true;
		}
		
		
		function specialSlotHide(id){
			if(!!popup.hide){
				console.log("hide");
				popup.hide();
				/*
				if(!!popup.destroy){
					console.log("destroy");
					popup.destroy();
				}
				*/
				return true;
			}
			return false;
		}
		
		
		function sendToURL(url, data){
			console.log("in send to url", ["url", url]);
			//return Sender.sendToURL(url, data);
			return {"result" : "success"};
		}
		
		
		/**
		 * @private Adapter to Sender-Receiver Object Get server response from URL
		 * 
		 * @param {string}
		 *			url - url to be requested
		 * 
		 * @return {object} JSON description - returned value from server
		 */
		function getFromURL(url) { // TO DO - change params when sender
				return Sender.getFromURL(Config.dirPath+url);
		};
		
		
		/**
		 * @private parse short description and remodel container (add new items, remove unnecessary)
		 * 
		 * @param {object} con 
		 * container to remodel
		 * 
		 * @param {object} sd 
		 * short description to parse
		 * 
		 * @return
		 */
		
		function parse(con, sd){
			var i = 0, length = 0, slots = sd["slots"], tmpCon = [], item;
			
			//console.log(["parse", "id", con.id, "type", con.type, "slot", con.slot]);
			
			// if there is no slots - break
			if(!slots){
				//console.log("brak slotów", ["sd", sd]);
				return ;
			}
			
			// create temporary container
			tmpCon = SenchaAdapter.getContainer();
			
			// analyze short description and founded items remove from con (without destroying)
			for(i = 0, length = slots.length; i<length; i++){
				item = SenchaAdapter.get(con, slots[i].id);
				
				// item found
				if(!!item){
					// remove from container
					item = SenchaAdapter.remove(con, item, false);
					// add to temporary container
					tmpCon.add(item);
				}
			}
			
			// remove all remained components and destroy them
			SenchaAdapter.removeAll(con, true);
			
			// analyze short description and founded items remove from con (without destroying)
			for(i = 0, length = slots.length; i<length; i++){
				item = SenchaAdapter.get(tmpCon, slots[i].id);
				
				// item found
				if(!!item){
					//console.log("item "+ slots[i].id +" found");
					// remove from container
					item = SenchaAdapter.remove(tmpCon, item, false);
				}
				else{
					//console.log("item "+ slots[i].id +" not found");
					// get full description from url
					item = getFromURL(slots[i].url);
					
					// parse description to sencha format
					item = Parser.transform(item);
				}
				
				// add item to container
				SenchaAdapter.add(con, item);
				
				// go deeper
				parse(item, slots[i]);
			}
			
			// destroy temporary container
			SenchaAdapter.destroy(tmpCon);
			
			
		}
		
		
		/**
		 * @public handling request for new page components; adds record to history
		 * 
		 * @param {string}
		 *			url - new url of short description
		 * @param {boolean}
		 *			keepHash - true if window.location.hash won't be overwritten
		 * 
		 * @return
		 */
		function loadURL(url, keepHash) {
				var shortDescription;
	 
				// if url is empty, replace it with default url value
				url = url || Config.defaultURL;
				
				// get short description from passed url (sender request)
				shortDescription = getFromURL(url);
				//shortDescription = url;
				
				console.log("in load url:", ["sd", shortDescription]);
				
				// add record to History
				History.pushState(shortDescription, "title", url, keepHash);
				// console.log("dodałem do hist");
		}
		
		
		
		/**
		 * @public called to reload (part of) the page
		 * 
		 * @param {object}
		 *			state - new state of page; properties: shortDescription,
		 *			title, url
		 * @param {boolean}
		 *			newPage - false if page loaded using back/forward button, true
		 *			otherwise
		 * 
		 * @return
		 */
		function pageReload(state, newPage) {
				console.log("in page reload", ["state", state, "newPage", newPage]); 
				
				// set loading mask
				screen.setLoading(true);
				
				// remodel screen
				parse(screen, state.shortDescription);
				
				// hide loading mask
				screen.setLoading(false);
				
				// screen refresh
				SenchaAdapter.refresh(screen);	
		};
		

		function defaultScreen(id, slot){
			return Parser.transform({
				type : "Panel",
                id: id || 'screen', 
                slot: slot || 'screen'
			});
		}
		
		function defaultPopup(){
			return Parser.transform({
            	type : "Special",
            	id: 'popup',
            	slot : 'special'
            });
		}
		
		
		function init(){
			// set default screen
			screen = defaultScreen();
			
			// set default popup
			popup = defaultPopup();
		}
		
		var obj = {
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
		
}();
