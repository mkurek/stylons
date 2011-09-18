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
		//console.log("destroy", ['id', obj.id]);
		if (!!obj.destroy) {
			// remove parent link - prevent warning before removing unexisting component
			obj.ownerCt = undefined;
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

	function frefresh(obj, direction) {
		if (!!obj.doLayout) {
			console.log("refresh!", ["id", obj.id]);
			
			obj.doLayout();
			/*
			// run animation
			if(!!direction){
				Ext.Anim.run(obj, 'slide', {
					direction: direction
				});
			}
			*/
			//if(!!obj.doComponentLayout){
			//	obj.doComponentLayout();
			//}
		}
		else {
			return false;
		}
		
		return true;
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
	 * isMixedCollection - private function to check if container is instance of
	 * Ext.util.MixedCollection
	 * 
	 * @params: container - to check
	 * 
	 * @return: true if container is instance of Ext.util.MixedCollecion, false
	 * otherwise
	 */
	function fisMixedCollection(container) {
		return container && (container instanceof Ext.util.MixedCollection);
	};
	
	
	/*
	 * clear - remove items and/or dockedItems from given container
	 * 
	 * @params: container - object from which items will be removed | destroy -
	 * specify if items will be destroyed after removing (default: false)
	 * 
	 * @return: true if items were successfully removed (or destroyed), false
	 * otherwise
	 */
	function fclear(container, destroy) {
		var tmp;
		// in case of mixed collection use different method -
		// MixedCollection.removeAll() requires array of objects as a parameter
		if (fisMixedCollection(container)) {
			// if items have to be destroyed
			if (!!destroy) {
				container.each(fdestroy);
				container.clear();
				return true;
			}
			
			// not destroy items
			// NOTE: dangerous, items still remains in memory but without links
			// to them
			else{
				container.clear();
				return true;
			}
		}
		
		// in case of regular container use removeAll method to destroy items (call recursively to destroy dockedItems container if is)
		else if (!!container.removeAll) {
			container.removeAll(!!destroy);
			
			// workaround - sencha's removeAll method removes only items - call recursively to remove dockedItems
			if(!!container.dockedItems){
				fclear(container.dockedItems, destroy);
			}
			
			return true;
		}
		
		// if others failed check for regular array
		else if(Ext.isArray(container)){
			if(!destroy){
				container.splice(0, container.length);
				return true;
			}
			else{
				container.forEach(fdestroy);
				return true;
			}
		}
		return false;
		
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
		var i = 0, length = 0, filter, filters = [], // array of filters to
		// apply
		wantedItem = container; // copy of container
		
		// simple test for being an array
		if (!Ext.isArray(properties)) {
			properties = [properties];
		}
		
		// add proper filters-object to filters-array
		for (i = 0, length = properties.length; i < length; i++) {
			// NOTE: cannot type !!prop.value - value can be 0
			if (!!properties[i].property && properties[i].value !== undefined) {
				
				// new filter witch exactMatch property
				filter = new Ext.util.Filter({
					property: properties[i].property,
					value : properties[i].value,
					exactMatch : true	
				});
				
				// add filter to filters array
				filters.push(filter);
			}
		}
		
		// if there are valid filters and container contains proper methods
		if (filters.length > 0 && !!container.filter && !!container.first) {
			
			// filter container and get the first occurance of wanted item
			// NOTE: there is version of filter method which takes array as
			// argument, but for unknown reasons - it generates error - probably
			// sencha bug
			for (i = 0, length = filters.length; i < length; i++) {
				wantedItem = wantedItem.filter(filters[i]);
			}
			
			// get first occurance of wanted item
			wantedItem = wantedItem.first();
			
			// if in container is an item fulfilled all filters - return it
			if (!!wantedItem)
				return wantedItem;
		}
		
		// return false if nothing found
		return false;
	};
	
	function getIds(con){
		var x = [];
		for(i in con.items){
			x.push([con.items[i].id, con.items[i].slot]);
		}
		return x;
	}
	
	// --------------------------------------------
	
	/**
	 * 
	 * @param {String | Object} item item to be found
	 */
	function get(container, item){
		var result = false;
		
		// if defined getComponent container's method
		if(!!container.getComponent){
			result = container.getComponent(item);
		}
		
		return result || false;
	}
	
	function remove(container, item, destroy){
		result = false;
		console.log("SA - remove", "con.id", container.id, "item.id", item.id, "destroy", destroy);
		// check if the item is in container
		if(!!get(container, item)){
			// check for occurrence in docked items
			if(!!container.getDockedComponent && !!container.getDockedComponent(item)){
				// remove from docked items
				if(!!container.removeDocked){
					result = container.removeDocked(item, !!destroy);
				}
			}
			// item is in items
			else{
				if(!!container.remove){
					result = container.remove(item, !!destroy);
				}
			}
		}
		
		return result;
	}
	
	function add(container, item){
		console.log("SA.add", "con.id", container.id, "item.id", item.id, "dock", item.dock);
		// add to docked items if item has dock param and container docked items array
		if(!!item.dock && !!container.addDocked){
			console.log("to docked")
			container.addDocked(item);
		}
		// add to items if container has add method
		else if(!!container.add){
			console.log("to normal")
			container.add(item);
		}
		else{
			return false;
		}
		
		return true;
	}
	
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
		getIds : getIds,
		get : get,
		add : add,
		remove : remove
	};
	
}();
