var Dispatcher = function() {
	// gobal variables, available in whole class
	var screen = {
		items : [],
		dockedItems : [],
	}, page = {};
	
	var obj = {
		action : fuserRequest,
		init : finit,
		setScreen : fsetScreen, // to testing
		getScreen : fgetScreen, // to testing
		analyze : fanalyzeDepth, // to testing
		getPage : getPage,
		page: page
	};
	
	// cut from here
	function fsetScreen(s) {
		screen = s;
	};
	
	function getPage() {
		return page;
	};
	
	function fgetScreen() {
		console.log(screen);
	};
	
	// cut to here
	
	function fgetFromURL(url, id, slot) {	// TO DO - change params when sender ready
		// return Sender.getFromURL(url);
		
		var bg = ["red", "green", "yellow", "orange", "blue", "white", "grey"], type = ["Panel", "Toolbar", "Panel", "Panel", "Button"];
		var val = bg[Math.floor(Math.random()*bg.length)], val2 = type[Math.floor(Math.random()*type.length)];
		
		return {
			id : id,
			slot : slot,
			items : [],
			type : val2,
			dockedItems : [],
			html : 'abcd_'+val2+'_'+val,
			title: 'abcd_'+val2+'_'+val,
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
	 * private function. Check if items of actual level in screen match actual
	 * level in short description
	 * 
	 * params: ar - part of the screen array, which represents actual depth | sd -
	 * part of short description description
	 */
	function fanalyzeDepth(container, sd) {
		var i = 0, j = 0, length = 0, itemsLength = 0, wantedItem = false, description = {}, items = [], itemsCopy = [], slots = sd["slots"], whichItems = 0;
	
		//console.log("Dodaje id: "+sd["id"]+", slot: "+sd["slot"]);
		
		// get copy of items and docked items
		itemsCopy = [SenchaAdapter.cloneItems(container) || [],
				SenchaAdapter.cloneDockedItems(container) || []];
		
		// remove items and docked items from container
		// IMPORTANT: use false parameter to not destroy objects
		SenchaAdapter.clear(container, false);

		
		for (i = 0, length = slots.length; i < length; i++) {
			console.log("Looking for slot: " + slots[i].slot + ", with id:"+ slots[i].id);
			
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
			
			//console.log((!!wantedItem) ? "już był.." : "jeszcze nie było");
			
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
		
		//console.log("Usuwam pozostałości po id: "+sd["id"]+", slot: "+sd["slot"]);
		// destroy unused elements from itemsCopy
		for (j = 0, itemsLength = itemsCopy.length; j < itemsLength; j++) {
			SenchaAdapter.clearMixedCollection(itemsCopy[j]);
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
		
		// work with short description, analyze each depth
		fanalyzeDepth(page, url);
		// finit();
		SenchaAdapter.refresh(page);
		page.doLayout();
		console.log("After adding:");
		console.log(page);
	};
	
	function finit() {
		Ext.setup({
			onReady: function(){
				page = new Ext.Panel({
					fullscreen : true,
					style: 'background-color: #fee;', 
					id: 'panel', 
					slot: 'panel',
					html: 'sadasdasdasd'
				});
			}
		});
		// Ext.apply(page, screen["items"]["items"][0]);
		// page.doLayout();
	};
	
	return obj;
	
}();

// test - cut from here
var sd = {
	slots : [{
		"slot" : "screen",
		"id" : "screen",
		"url" : "index",
		"slots" : [{
			"slot" : "top",
			"id" : "menu",
			"url" : "menu/show",
			"slots" : [{
				"slot" : "top",
				"id" : "menuToolbar",
				"url" : "menu/toolbar",
				"slots" : []
			}, {
				"slot" : "bottom",
				"id" : "menuList",
				"url" : "menu/list",
				"slots" : []
			}]
		}, {
			"slot" : "bottom",
			"id" : "menuTabBar",
			"url" : "tabBar/menu",
			"slots" : []
		}]
	}]
};
var des = {
	"items" : [{
		"slot" : "screen",
		"id" : "screen",
		"items" : [{
			"slot" : "top",
			"id" : "menu",
			"items" : [{
				"slot" : "top",
				"id" : "menuToolbarFromScreen",
				"items" : [],
				"dockedItems" : []
			}, {
				"slot" : "bottom",
				"id" : "menuListFromScreen",
				"items" : [],
				"dockedItems" : []
			}],
			"dockedItems" : []
		}, {
			"slot" : "bottom",
			"id" : "menuTabBarFromScreen",
			"items" : [],
			"dockedItems" : []
		}],
		"dockedItems" : []
	}],
	"dockedItems" : []
};
 Dispatcher.init();
// Dispatcher.setScreen(des);
