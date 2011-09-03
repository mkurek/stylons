var Dispatcher = function(window) {
	// gobal variables, available in whole class
	var page = {}, 
		History = window.History;
	
	var obj = {
		action : fuserRequest,
		analyze : fanalyzeDepth, // to testing
		getPage : getPage,
		page: page,
		getHistory : fgetHistory
	};
	
	// cut from here
	function getPage() {
		return page;
	};	
	
	function fgetHistory(){
		console.log("h", History, "window.History", window.History);
		return window.History;
	};
	// cut to here
	
	function fgetFromURL(url, id, slot) {	// TO DO - change params when sender
											// ready
		// return Sender.getFromURL(url);
		
		var bg = ["red", "green", "yellow", "orange", "blue", "white", "grey"], type = ["Panel" ,"Toolbar", "Panel", "Panel", "Button"];
		var val = bg[Math.floor(Math.random()*bg.length)], val2 = type[Math.floor(Math.random()*type.length)];
		
		return {
			id : id,
			slot : slot,
			items : [],
			type : val2,
			dockedItems : [],
			html : 'id = '+id+"_slot="+slot+"_"+val2+'_'+val,
			title: 'id = '+id+"_slot="+slot+"_"+val2+'_'+val,
			text : 'id = '+id+"_slot="+slot+"_"+val2+'_'+val,
			style: 'background-color: '+val
		}; // just to test
	};
	
	function farrayFind(items, slot, id) {
		var i, length, item;
		
		for (i = 0, length = items.length; i < length; i++) {
			if (items[i].slot === slot && items[i].id === id) {
				item = items.splice(i, 1);
				return item[0];
			}
		}
		return false;
	};
	
	/*
	 * analyzeDepth - private function. Check if items of actual level in screen
	 * match actual level in short description
	 * 
	 * @params: ar - part of the screen array, which represents actual depth |
	 * sd - part of short description description
	 * 
	 * @return: void
	 * 
	 */
	function fanalyzeDepth(container, sd) {
		var i = 0, j = 0, length = 0, itemsLength = 0, wantedItem = false, description = {}, items = [], itemsCopy = [], slots = sd["slots"], whichItems = 0;
	
		// get copy of items and docked items
		itemsCopy = [SenchaAdapter.cloneItems(container) || [],
				SenchaAdapter.cloneDockedItems(container) || []];
		
		// remove items and docked items from container
		// IMPORTANT: use false parameter to not destroy objects
		SenchaAdapter.clear(container, false);

		
		for (i = 0, length = slots.length; i < length; i++) {
			// check in items and dockedItems for exact match;
			// check in both, because short description doesn't contain
			// information about docking
			for (j = 0, itemsLength = itemsCopy.length; j < itemsLength; j++) {
				wantedItem = SenchaAdapter.findItem(itemsCopy[j], [{
					property : 'slot',
					value : slots[i].slot
				}, {
					property : 'id',
					value : slots[i].id
				}]);
				
				// if wanted item was found before the loop end break to not
				// overwrite it
				if (wantedItem !== false)
					break;
			}
			
			// if exact item was not found
			if (wantedItem === false) {
				// send request for missing component
				description = fgetFromURL(slots[i].url, slots[i].id, slots[i].slot);
				
				// parse description to sencha format
				description = Parser.transform(description);
			}
			else {
				// set wanted item to final description
				description = wantedItem;
				
				// remove item from copy
				SenchaAdapter.removeItem(itemsCopy[j], wantedItem, false);
			}
			
			// set whichItem to dockedItems(1) or items (0)
			whichItems = (description.docked) ? 1 : 0;
			
			// add item to proper collection
			if (whichItems === 1) {
				SenchaAdapter.addDockedItem(container, description);
			}
			else {
				SenchaAdapter.addItem(container, description);
			}
			
			// recursively go deeper
			fanalyzeDepth(
				(whichItems === 1) ? SenchaAdapter.getLastDockedItem(container) : SenchaAdapter.getLastItem(container), 
				slots[i]);
		} // for end
		
		// destroy redundant elements from itemsCopy
		for (j = 0, itemsLength = itemsCopy.length; j < itemsLength; j++) {
			// remove items and destroy them (true parameter)
			SenchaAdapter.clear(itemsCopy[j], true);
		}

	};
	
	/*
	 * public function, handling all user actions
	 * 
	 * params: url - string, passed to sender class, matching the short
	 * description
	 */
	function fuserRequest(url) {
		var shortDescription;
		
		// get short description from passed url (sender request)
		// shortDescription = getFromURL(url);
		
		// add record to History
		console.log("dodaje do hist");
		History.pushState(url, "title", "adres");
		console.log("dodałem do hist");
		// work with short description, analyze each depth
		fanalyzeDepth(page, url);
		// finit();
		SenchaAdapter.refresh(page);
		// page.doLayout();
		console.log("After adding:");
		console.log(page);
	};
	
	return obj;
	
}(window);

 //Dispatcher.init();
// Dispatcher.setScreen(des);
