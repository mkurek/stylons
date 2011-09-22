var SenchaAdapter = function() {
	
	// general adapters
	
	/**
	 * destroy - destroy object given as a parameter
	 * 
	 * @params: obj - object to be destroyed
	 * 
	 * @return: false if obj.destroy() method does not exist, true otherwise
	 */

	function destroy(obj) {
		//console.log("destroy", ['id', obj.id]);
		if (!!obj.destroy) {
			// remove parent link - prevent warning before removing unexisting component
			//obj.ownerCt = undefined;
			obj.destroy();
		}
		else {
			return false;
		}
		
		return true;
	};
	
	/**
	 * refresh - refresh object given as a parameter
	 * 
	 * @params: obj - object to be refreshed
	 * 
	 * @return: false if obj.doLayout() method does not exist, true otherwise
	 */

	function refresh(obj) {
		if (!!obj.doLayout) {
			console.log("refresh!", ["id", obj.id]);
			obj.doLayout();
		}
		if(!!obj.doComponentLayout){
			obj.doComponentLayout();
		}

		return true;
	};
	
	/**
	 * show - shows object
	 * 
	 * @params: obj - object to be showed
	 * 
	 * @return 
	 */

	function show(obj, anim) {
		// helps for some devices to redraw
		Ext.Viewport.fireResizeEvent();

		// another workaround
		Ext.repaint();
		
		if(!!obj.show){
			obj.show(anim);
		}
	}
	
	/**
	 * @public hide object
	 * 
	 * @param: obj - object to be hided
	 * 
	 * @return 
	 */

	function hide(obj, anim) {
		
		if(!!obj.hide){
			obj.hide(anim);
		}
		
	}
	
	
	/**
	 * 
	 * @param {String | Object} item item to be found
	 */
	function get(container, item){
		var result = false, index;
		
		// if defined getComponent container's method
		if(!!container.getComponent){
			result = container.getComponent(item);
		}
		else if(Ext.isArray(container)){
			index = container.indexOf(item);
			if(index != -1){
				result = container[index];
			}
		}
		
		return result || false;
	}
	
	function remove(container, item, des){
		var index;
		console.log("SA - remove", " | con.id", container.id, " | item.id", item.id, " | destroy", des);
		result = false;
		
		// check if the item is in container
		if(!!get(container, item)){
			// check for occurrence in docked items
			if(!!container.getDockedComponent && !!container.getDockedComponent(item)){
				// remove from docked items
				if(!!container.removeDocked){
					result = container.removeDocked(item, !!des);
				}
			}
			// item is in items
			else{
				if(!!container.remove){
					result = container.remove(item, !!des);
				}
			}
		}
		else if(Ext.isArray(container)){
			index = container.indexOf(item)
			if(index != -1){
				result = container.splice(index, 1);
				if(!!des){
					destroy(result);
				}
			}
		}
		
		return result;
	}
	
	function removeAll(container, destroy){
		var i, j, leni, lenj, removeItems, pos = ["items", "dockedItems"], items = [], item;
		
		for(i=0,leni=pos.length;i<leni;i++){
			if(container[pos[i]]){
				removeItems = container[pos[i]].items.slice();
				for(j=0,lenj=removeItems.length;j<lenj;j++){
					item = remove(container, removeItems[j], !!destroy);
					
					if(item){
						items.push(item);
					}
				}
			}
		}
		return items;
	}
	
	function add(container, item){
		console.log("SA.add", " | con.id", container.id, " | item.id", item.id, " | dock", item.dock);
		// add to docked items if item has dock param and container docked items array
		if(!!item.dock && !!container.addDocked){
			//console.log("to docked")
			container.addDocked(item);
		}
		// add to items if container has add method
		else if(!!container.add){
			//console.log("to normal")
			container.add(item);
		}
		else{
			return false;
		}
		
		return true;
	}
	
	function getContainer(){
		return new Ext.Container;
	}
	
	function getMixedCollection(){
		return new Ext.util.MixedCollection;
	}
	
	function setDimensions(con, width, height){
		if(!!con.setWidth){
			con.setWidth(width || "auto");
		}
		if(!!con.setHeight){
			con.setHeight(height || "auto");
		}
		
		return true;
	}
	
	return {
		destroy : destroy,
		refresh : refresh,
		get : get,
		add : add,
		remove : remove,
		getContainer: getContainer /* getMixedCollection */,
		removeAll : removeAll,
		setDimensions : setDimensions,
		show : show,
		hide : hide
	};
	
}();
