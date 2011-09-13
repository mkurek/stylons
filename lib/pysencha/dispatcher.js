var Dispatcher = function() {
        // gobal variables, available in whole class
        var screen = {}, 
            Config = {
        		defaultURL : "shortDescription",
        		dirPath : "tests/test1/"
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
         * @public Return Config object
         * 
         * @return {object} Config object
         */
        function getConfig() {
                return Config;
        };
        
        /**
         * @private Adapter to Sender-Receiver Object Get server response from URL
         * 
         * @param {string}
         *            url - url to be requested
         * 
         * @return {object} JSON description - returned value from server
         */
        function getFromURL(url, id, slot) { // TO DO - change params when sender
                // ready
                return Sender.getFromURL(Config.dirPath+url);
                /*
                var bg = ["red", "green", "yellow", "orange", "blue", "white", "grey"], type = [
                                "Panel", "Toolbar", "Panel", "Panel", "Button"];
                var val = bg[Math.floor(Math.random() * bg.length)], val2 = type[Math
                                .floor(Math.random() * type.length)];
                
                return {
                        id : id,
                        slot : slot,
                        items : [],
                        type : val2,
                        dockedItems : [],
                        html : 'id = ' + id + "_slot=" + slot + "_" + val2 + '_' + val,
                        title : 'id = ' + id + "_slot=" + slot + "_" + val2 + '_' + val,
                        text : 'id = ' + id + "_slot=" + slot + "_" + val2 + '_' + val,
                        style : 'background-color: ' + val
                }; // just to test
*/
        };
        
        /**
         * @private 
         * Check if items of actual level in screen match actual level in short description
         * 
         * @param {object}
         *            container - part of the screen array, which represents actual
         *            depth
         * @param {object}
         *            sd - part of short description description
         * 
         * @return
         */
        function analyzeDepth(container, sd) {
                var i = 0, j = 0, length = 0, itemsLength = 0, wantedItem = false, description = {}, items = [], itemsCopy = [], slots = sd["slots"], whichItems = 0;
                
                // if there is no slots - break
                if(!slots){
                	console.log("brak slotów");
                	return ;
                }
                
                // get copy of items and docked items
                itemsCopy = [SenchaAdapter.cloneItems(container) || [],
                                SenchaAdapter.cloneDockedItems(container) || []];
                
                // remove items and docked items from container
                // IMPORTANT: use false parameter to not destroy objects
                SenchaAdapter.clear(container, false);
                
                console.log(["sd", sd, "container", container, "itemsCopy", itemsCopy]);
                
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
                                description = getFromURL(slots[i].url, slots[i].id,
                                                slots[i].slot);
                                
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
                        whichItems = (description.dock) ? 1 : 0;
                        
                        // add item to proper collection
                        if (whichItems === 1) {
                                SenchaAdapter.addDockedItem(container, description);
                        }
                        else {
                                SenchaAdapter.addItem(container, description);
                        }
                        
                        // recursively go deeper
                        analyzeDepth((whichItems === 1) ? SenchaAdapter
                                        .getLastDockedItem(container) : SenchaAdapter
                                        .getLastItem(container), slots[i]);
                } // for end
                
                // destroy redundant elements from itemsCopy
                for (j = 0, itemsLength = itemsCopy.length; j < itemsLength; j++) {
                        // remove items and destroy them (true parameter)
                        SenchaAdapter.clear(itemsCopy[j], true);
                }
                
        };
        
        /**
         * @public handling request for new page components; adds record to history
         * 
         * @param {string}
         *            url - new url of short description
         * @param {boolean}
         *            keepHash - true if window.location.hash won't be overwritten
         * 
         * @return
         */
        /*
         * public function, handling all user actions
         * 
         * params: url - string, passed to sender class, matching the short
         * description
         */
        function userRequest(url, keepHash) {
                var shortDescription;
     
                // if url is empty, replace it with default url value
                url = url || Config.defaultURL;
                
                // get short description from passed url (sender request)
                shortDescription = getFromURL(url);
                //shortDescription = url;
                
                console.log("in action: [sd]", [shortDescription]);
                
                // add record to History
                History.pushState(shortDescription, "title", url, keepHash);
                // console.log("dodałem do hist");
        }
        
        /**
         * @public called to reload part of the page
         * 
         * @param {object}
         *            state - new state of page; properties: shortDescription,
         *            title, url
         * @param {boolean}
         *            newPage - false if page loaded using back/forward button, true
         *            otherwise
         * 
         * @return
         */
        function pageReload(state, newPage) {
                // work with short description, analyze each depth
                
                //Ext.get("a").dom.innerHTML += state.shortDescription+"; "+state.title+"; "+state.url+"; "+newPage+"<br />";
                console.log("in page reload"); 
                analyzeDepth(screen, state.shortDescription); 
                SenchaAdapter.refresh(screen, !!newPage); 
                // page.doLayout();
                console.log("After adding:", [getScreen()]); 
        };
        
        
        var obj = {
                action : userRequest,
                pageReload : pageReload,
                analyze : analyzeDepth, // to testing
                getScreen : getScreen,
                Config : getConfig,
                setScreen : setScreen
        };
        
        return obj;
        
}();