var Dispatcher = function()
{
	// gobal variables, available in whole class
	var screen = {items: [], dockedItems: []};
	
	var obj = {
		action : fuserRequest,
		init: finit,
		setScreen: fsetScreen,	// to testing
		getScreen: fgetScreen,  // to testing
		analyze: fanalyzeDepth  // to testing
	};
	
	// cut from here
	function fsetScreen(s){
		screen = s;
	};
	
	function fgetScreen(){
		console.log(screen);
	};
	
	// cut to here
	
	function fgetFromURL(url){
		//return Sender.getFromURL(url);
		return {id : url, items: [], type: url, dockedItems: []};		// just to test
	};
	
	function farrayFind(items, slot, id){
		var i,
			length,
			item;
		
		for(i = 0, length = items.length; i < length; i++){
			if(items[i].slot === slot && items[i].id === id)
			{
				item = items.splice(i, 1);
				return item[0];
			}
		}
		return false;
	};
	
	
	
	/*
	 * private function. Check if items of actual level in screen match actual level in short description
	 * 
	 * params: ar - part of the screen array, which represents actual depth | sd - part of short description
	 * description
	 */
	function fanalyzeDepth(ar, sd){
		var i = 0, j = 0,
			length = 0, itemsLength = 0,
			wantedItem = false, 
			description = {}, 
			items = [],
			itemsCopy = [],	
			slots = sd["slots"],
			whichItems = 0;
		
		/*
		if(!ar["items"]){
			//console.log("arr[items] nie istnieje");
			ar["items"] = [];
		}
		*/
		console.log("In fanalyzeDepth");
		console.log(ar);
		console.log(sd);
		
		items[0] = ar["items"];				// reference to items
		itemsCopy[0] = items[0].slice();	// copy of items
		
		items[1] = ar["dockedItems"];		// reference to dockedItems
		itemsCopy[1] = items[1].slice();	// copy of dockedItems
		
		
		
		
		console.log(itemsCopy);
		//console.log(ar["items"]);
		//console.log("slots length: "+slots.length);
		
		items[0].length = 0;					// clear items
		items[1].length = 0;					// clear dockedItems
		
		for(i = 0, length = slots.length; i < length; i++){
			console.log("Looking for slot: "+slots[i].slot+", with id:"+slots[i].id);
			
			// check in items and dockedItems for exact match;
			// check in both, because short description doesn't contain information about docking
			for(j = 0, itemsLength = items.length; j<itemsLength; j++){
				wantedItem = farrayFind(itemsCopy[j], slots[i].slot, slots[i].id);
				
				if(wantedItem !== false)
					break;
			}
			
			// if exact item was not found
			if(wantedItem === false){
				console.log("Nie znaleziono komponentu: slot: "+slots[i].slot+", id: "+slots[i].id);
				description = fgetFromURL(slots[i].url);		// send request for missing component
				//description = Parser.translate(description);	// parse description to sencha format
			}
			else{
				console.log("Znaleziono komponent: slot: "+slots[i].slot+", id: "+slots[i].id);
				description = wantedItem;						// get description from ar items
			}
			
			whichItems = (description.docked) ? 1 : 0;
			console.log("whichItem: "+whichItems);
			items[whichItems].push(description);						// put description to proper items
			console.log("new items:");
			console.log(items);
			fanalyzeDepth(items[whichItems][items[whichItems].length-1], slots[i])	// recursion	
		}
		
		console.log("ar:");
		console.log(ar);
		console.log("----------------");
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
		//shortDescription = getFromURL(url);
		
		// work with short description, analyze each depth
		fanalyzeDepth(screen, url)

	};
	
	function finit(){
		var page;
		
		page = new Ext.Panel({
			fullscreen: true,
			items: screen["items"],
			dockedItems: screen["dockedItems"]
		});
		
	};
	
	return obj;
	
}();

// test - cut from here
var sd = { slots: [{   "slot" : "screen",   "id" : "screen",   "url" : "index",   "slots" : [     {     "slot" : "top",     "id" : "menu",     "url" : "menu/show",     "slots" : [       {       "slot" : "top",       "id" : "menuToolbar",       "url" : "menu/toolbar",       "slots" : []       },       {       "slot" : "bottom",       "id" : "menuList",       "url" : "menu/list",       "slots" : []       }     ]     },     {      "slot" : "bottom",     "id" : "menuTabBar",     "url" : "tabBar/menu",     "slots" : []     }   ] }] };
var des = {"items": [{  "slot" : "screen",  "id" : "screen",  "items" : [    {    "slot" : "top",    "id" : "menu",    "items" : [      {      "slot" : "top",      "id" : "menuToolbarFromScreen",      "items" : [],      "dockedItems": []      },      {      "slot" : "bottom",      "id" : "menuListFromScreen",      "items" : [],      "dockedItems": []      }    ],    "dockedItems": []    },    {     "slot" : "bottom",    "id" : "menuTabBarFromScreen",    "items" : [],    "dockedItems": []    }  ],  "dockedItems": []}],"dockedItems": []};
Dispatcher.setScreen(des);
