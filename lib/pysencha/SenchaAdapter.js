var SenchaAdapter = function() {
	
	// general adapters
	
	/*
	 * destroy - destroy object given as a parameter
	 * 
	 * @params: obj - object to be destroyed
	 * 
	 * @return: false if obj.destroy() method does not exist, true otherwise
	 */

	function fdestroy(obj) {
		if (!!obj.destroy) {
			obj.destroy();
		}
		else {
			return false;
		}
		
		return true;
	};
	
	/*
	 * refresh - refresh object given as a parameter
	 * 
	 * @params: obj - object to be refreshed
	 * 
	 * @return: false if obj.doLayout() method does not exist, true otherwise
	 */

	function frefresh(obj) {
		if (!!obj.doLayout) {
			obj.doLayout();
		}
		else {
			return false;
		}
		
		return true;
	};
	
	/*
	 * allowDockedItems - check if container may have dockedItems
	 * 
	 * @params: container - container to check
	 * 
	 * @return: true if container could have dockedItems, false otherwise
	 */

	function fallowDockedItems(container) {
		var type = container.type, permitions = {
			"Panel" : true,
			"Toolbar" : false,
			"Button" : false,
			"List" : false,
			"NestedList" : true,
			"SegmentedButton" : false,
			"TabBar" : true,
			"TabPanel" : true,
			"Default" : false
		};
		return permitions[(type in permitions) ? type : "Default"];
	};
	
	// items adapters
	
	/*
	 * addItem - add item (or array of items) to given container
	 * 
	 * @params: container - object to which the item will be added | item - item
	 * to add
	 * 
	 * @return: false if container.add method does not exist, true otherwise
	 */
	function faddItem(container, item) {
		if (!!container.add) {
			container.add(item);
		}
		else {
			return false;
		}
		
		return true;
	};
	
	/*
	 * addDockedItem - add dockedItem (or array of dockedItems) to given
	 * container
	 * 
	 * @params: container - object to which the dockedItem will be added | item -
	 * dockedItem to add
	 * 
	 * @return: false if container.addDocked method does not exist, true
	 * otherwise
	 */

	function faddDockedItem(container, item) {
		if (!!container.addDocked) {
			container.addDocked(item);
		}
		else {
			return false;
		}
		
		return true;
	};
	
	/*
	 * removeItem - remove item from given container
	 * 
	 * @params: container - object from which the item will be removed | item -
	 * item to remove | destroy - specify if the item will be destroyed after
	 * removing (default: false)
	 * 
	 * @return: false if container.remove method does not exist, true otherwise
	 */
	function fremoveItem(container, item, destroy) {
		if (!!container.remove) {
			container.remove(item, !!destroy);
		}
		else {
			return false;
		}
		
		return true;
	};
	
	/*
	 * removeDockedItem - remove item from given container
	 * 
	 * @params: container - object from which the dockedItem will be removed |
	 * item - dockedItem to remove | destroy - specify if the dockedItem will be
	 * destroyed after removing (default: false)
	 * 
	 * @return: false if container.removeDocked method does not exist, true
	 * otherwise
	 */
	function fremoveDockedItem(container, item, destroy) {
		if (!!container.removeDocked) {
			container.removeDocked(item, !!destroy);
		}
		else {
			return false;
		}
		
		return true;
	};
	
	/*
	 * getLastItem - get last item from container
	 * 
	 * @params: container - object from which the item is wanted
	 * 
	 * @return: false if container.items is empty or container.items.last method
	 * does not exist, true otherwise
	 */
	function fgetLastItem(container) {
		if (!!container.items && container.items.length > 0
				&& !!container.items.last) {
			return container.items.last();
		}
		
		return false;
	};
	
	/*
	 * getLastDockedItem - get last docked item from container
	 * 
	 * @params: container - object from which the docked item is wanted
	 * 
	 * @return: false if container.dockedItems is empty or
	 * container.dockedItems.last method does not exist, true otherwise
	 */
	function fgetLastDockedItem(container) {
		if (!!container.dockedItems && container.dockedItems.length > 0
				&& !!container.dockedItems.last) {
			return container.dockedItems.last();
		}
		
		return false;
	};
	
	/*
	 * clear - remove items and dockedItems from given container
	 * 
	 * @params: container - object from which items will be removed | destroy -
	 * specify if items will be destroyed after removing (default: false)
	 * 
	 * @return: false if container.removeAll method does not exist, true
	 * otherwise
	 */
	function fclear(container, destroy) {
		if (!!container.removeAll) {
			container.removeAll(!!destroy)
		}
		else {
			return false;
		}
		
		return true;
	};
	
	/*
	 * cloneItems - copy items of the given container
	 * 
	 * @params: container - object from which items will be copied
	 * 
	 * @return: false if container.items or container.items.clone method does
	 * not exist, true otherwise
	 */
	function fcloneItems(container) {
		if (!!container.items && !!container.items.clone) {
			return container.items.clone();
		}
		else {
			return false;
		}
	};
	
	/*
	 * cloneDockedItems - copy dockedItems of the given container
	 * 
	 * @params: container - object from which docked items will be copied
	 * 
	 * @return: false if container.dockedItems or container.dockedItems.clone
	 * method does not exist, true otherwise
	 */
	function fcloneDockedItems(container) {
		if (!!container.dockedItems && !!container.dockedItems.clone) {
			return container.dockedItems.clone();
		}
		else {
			return false;
		}
	};
	
	/*
	 * findItem - find item in given container (mixed collection). Find only
	 * first occurance of item in container
	 * 
	 * @params: container - type: Ext.utli.MixedCollection (i.e. Panel items is
	 * MixedCollection type) - container to search for item | properties -
	 * object or array of objects with two properties: property - the property
	 * name and value - the value of the property
	 * 
	 * @return: false if container does not have filter method or does not
	 * contain wanted item, otherwise wanted item
	 */
	function ffindItem(container, properties) {
		var i = 0, length = 0, filters = [], // array of filters to
														// apply
		wantedItem = container;				// copy of container
		
		// simple test for being an array
		if (!Ext.isArray(properties)) {
			properties = [properties];
		}
		
		// add proper filters-object to filters-array
		for (i = 0, length = properties.length; i < length; i++) {
			// NOTE: cannot type !!prop.value - value can be 0
			if (!!properties[i].property && properties[i].value !== "undefined") {
				filters.push(properties[i]);
			}
		}
		
		// if there are valid filters and container contains proper methods
		if (filters.length > 0 && !!container.filter && !!container.first) {
			
			// filter container and get the first occurance of wanted item
			// NOTE: there is version of filter method which takes array as
			// argument, but for unknown reasons - it generates error - probably
			// sencha bug
			for (i = 0, length = filters.length; i < length; i++){
				wantedItem = wantedItem.filter(filters[i].property,
						filters[i].value);
			}
			
			// get first occurance of wanted item
			wantedItem = wantedItem.first();
			
			// if in container is an item fulfilled all filters - return it
			if (!!wantedItem)
				return wantedItem;
		}
		
		return false;
	};
	
	/*
	 * clearMixedCollection - clear Mixed Collection type container
	 * 
	 * @params: container - type: Ext.utli.MixedCollection - container to be
	 * cleared
	 * 
	 * @return: false if container has no method each or container was empty,
	 * true otherwise
	 */
	function fclearMixedCollection(container) {
		if (!!container.each || container.length === 0)
			return false;
		
		container.each(function(item, index, length) {
			item.destroy();
		});
		return true;
	};
	
	return {
		destroy : fdestroy,
		refresh : frefresh,
		addItem : faddItem,
		addDockedItem : faddDockedItem,
		removeItem : fremoveItem,
		removeDockedItem : fremoveDockedItem,
		getLastItem : fgetLastItem,
		getLastDockedItem : fgetLastDockedItem,
		clear : fclear,
		cloneItems : fcloneItems,
		cloneDockedItems : fcloneDockedItems,
		findItem : ffindItem,
		clearMixedCollection : fclearMixedCollection
	};
	
}();