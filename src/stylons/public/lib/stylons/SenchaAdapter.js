var SenchaAdapter = (function() {
	var obj;

	function apply(obj, conf){
		if(Ext.apply){
			Ext.apply(obj, conf);
			return obj;
		}
		return false;
	}
	
	/**
	 * @public destroy object given as a parameter
	 * 
	 * @param obj
	 *            Object to be destroyed
	 * 
	 * @return false if obj.destroy() method does not exist, true otherwise
	 */
	function destroy(obj) {
		if (obj.destroy) {
			obj.destroy();
		} else {
			return false;
		}

		return true;
	}

	/**
	 * @public refresh object given as a parameter
	 * 
	 * @param {Object}
	 *            obj Object to be refreshed
	 * 
	 * @return
	 */

	function refresh(obj) {
		//console.log(["refresh: ", obj.id])
		if (obj.doLayout) {
			obj.doLayout();
		}
		if (obj.doComponentLayout) {
			obj.doComponentLayout();
		}
		//console.log(["refresh end"])
	}

	/**
	 * @public recalculate layout of all items in con
	 * 
	 * @param {Object} con container with items to recalculate
	 * 
	 */
	function refreshAll(con){
		var items, i, ln;
		
		if(con.getRefItems){
			// get ref items and docked items without deeping
			items = con.getRefItems(false);
			
			for(i = 0, ln = items.length; i < ln; i++){
				refreshAll(items[i]);
			}
		}
		
		refresh(con);
	}
	
	/**
	 * shows object
	 * 
	 * @param {Object}
	 *            obj Object to be showed
	 * 
	 * @param {Object|Boolean|String}
	 *            anim Animation description
	 * 
	 * @return
	 */
	function show(obj, anim) {
		// help for some devices to redraw
		Ext.Viewport.fireResizeEvent();

		// another workaround
		Ext.repaint();

		if (obj.show) {
			obj.show(anim);
		}
	}

	/**
	 * @public hide object
	 * 
	 * @param {Object}
	 *            obj Object to be hided
	 * 
	 * @return
	 */
	function hide(obj, anim) {

		if (obj.hide) {
			obj.hide();
		}

	}


	function showAlert(title, text){
		Ext.Msg.alert(title, text, Ext.emptyFn);
		window.setTimeout(function(){Ext.getBody().mask();}, 350);
	}
	
	
	/**
	 * @public check if item is in container
	 * 
	 * @param {Object}
	 *            container Container to check for item
	 * 
	 * @param {String |
	 *            Object} item Item to be found
	 * 
	 * @return item if found, false otherwise
	 */
	function get(container, item) {
		var result = false, index;

		// if defined getComponent container's method
		if (container.getComponent) {
			result = container.getComponent(item);
		}
		// if container is regular array
		else if (Ext.isArray(container)) {
			// get index of item
			index = container.indexOf(item);

			if (index !== -1) {
				result = container[index];
			}
		}

		return result || false;
	}

	/**
	 * @oublic remove item from container
	 * 
	 * @param {Object}
	 *            container Container from which item will be removed
	 * 
	 * @param {Object}
	 *            item Item to be removed
	 * 
	 * @param {Object}
	 *            des Defines if item should be destroyed
	 * 
	 * @return item if not found in container, false otherwise
	 */
	function remove(container, item, des) {
		var index, result;
		result = false;

		// check if the item is in container
		if (get(container, item)) {
			// check for occurrence in docked items
			if (container.getDockedComponent
					&& container.getDockedComponent(item)) {
				// remove from docked items
				if (container.removeDocked) {
					try{
						result = container.removeDocked(item, des);
					} 
					catch(err){
						;
					}
				}
			}
			// item is in items
			else {
				if (container.remove) {
					try{
						result = container.remove(item, des);
					} 
					catch(err){
						;
					}
				}
			}
		}
		// check for being array
		else if (Ext.isArray(container)) {
			// get index of item
			index = container.indexOf(item);

			// if item is in array
			if (index !== -1) {

				// cut off item from array
				result = container.splice(index, 1);

				// destroy item if necessary
				if (des) {
					destroy(result);
				}
			}
		}

		return result;
	}

	/**
	 * @oublic remove all items from container
	 * 
	 * @param {Object}
	 *            container Container from which items will be removed
	 * 
	 * @param {Object}
	 *            des Defines if items should be destroyed
	 * 
	 * @return removed items
	 */
	function removeAll(container, destroy) {
		var i, j, leni, lenj, removeItems, pos = ["items", "dockedItems"], items = [], item;

		// check for items and dockedItems
		for (i = 0, leni = pos.length; i < leni; i++) {
			if (container[pos[i]]) {
				// make copy of items
				removeItems = container[pos[i]].items.slice();

				// for every items in sub-container
				for (j = 0, lenj = removeItems.length; j < lenj; j++) {
					// remove item
					item = remove(container, removeItems[j], destroy);
					// push item to result list
					if (item) {
						items.push(item);
					}
				}
			}
		}
		return items;
	}

	/**
	 * @public add item to container
	 * 
	 * @param {Object}
	 *            container Container from which items will be removed
	 * 
	 * @param {Object}
	 *            item Component to add to container
	 * 
	 * @return true if successful, false otherwise
	 */
	function add(container, item) {
		// add to docked items if item has dock param and container docked items
		// array
		if (item.dock && container.addDocked) {
			container.addDocked(item);
		}
		// add to items if container has add method
		else if (container.add) {
			container.add(item);
		} else {
			return false;
		}

		return true;
	}

	/**
	 * @public create new container
	 * 
	 * @return new container instance
	 */
	function getContainer() {
		return new Ext.Container();
	}

	/**
	 * @public create new mixed collection container
	 * 
	 * @return new mixed collection container instance
	 */
	function getMixedCollection() {
		return new Ext.util.MixedCollection();
	}

	obj = {
		destroy : destroy,
		refresh : refresh,
		refreshAll : refreshAll,
		get : get,
		add : add,
		remove : remove,
		getContainer : getContainer, /* getMixedCollection */
		removeAll : removeAll,
		show : show,
		hide : hide,
		showAlert : showAlert,
		apply : apply
	};

	return obj;
}());
