/*
 * Parser - class returning method to parse server's JSON to SenchaTouch object
 * @method transform(JSON):
 * @param JSON - JSON returned by server, containing slot description
 * @return result - SenchaTouch object described in JSON
 */

var Parser = function() {
	
	var content, funct;
		funct = {
			"Panel" : fmakePanel,
			//"List" : fmakeList,   TODO
			"TabBar" : fmakeTabBar,
			"Button" : fmakeButton
	};
	
	function ftransform(JSON){
		var result, type;
		
		content = new Object();
		content.items = [];
		//content.handler = function() {
		//	Dispatcher.action(JSON["action"] || "Not defined");
		//		};
		type = JSON["type"] || "Panel"; // if type is not declared set it as a "Panel"
		result = funct[ (type in funct) ? type : "Panel"](JSON); // if declared type doesn't exist use "Panel"
		alert("3");
		return result;
	};
	
	function fmakePanel(JSON){
		content.html = JSON["html"] || "";
		content.styleHtmlContent = JSON["margin"] || false;
		return new Ext.Panel(content);
	};
	
	/*function fmakeList(JSON){
		// To do
		return "List";
	};*/
	
	function fmakeTabBar(JSON){
		content.ui = "dark";
		content.dock = JSON["dock"] || "top";
		content.items = [];
		for(var i = 0; i < JSON["list"].length; i++)
			{
			 	var elem = new Object;
				if(JSON.list[i].icon) elem.iconCls = JSON.list[i].icon;
				if(JSON.list[i].text) elem.text = JSON.list[i].text;
				if(JSON.list[i].active) elem.active = JSON.list[i].active;
				if(JSON.list[i].badge) elem.badgeText = JSON.list[i].badge;
				if(JSON.list[i].action) elem.handler = function(){
					Dispatcher.action(JSON.list[i].action);
				};
				content.items.push(elem);
			}
		return new Ext.TabBar(content);
	};
	
	function fmakeButton(JSON){
		content.ui = JSON.ui || "";
		content.text = JSON.text || "";
		return new Ext.Button(content);
	}
	
	return {
		transform : ftransform
	};

}();
