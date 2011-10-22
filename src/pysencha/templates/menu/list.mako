{
 "id" : "menuList",
 "type" : "List",
 "itemtpl" : "{dish}<div style='font-size: 80%;color: #999;font-style: italic;'>{ingredients}</div><div style='position: absolute;top: 10px;right: 30px;font-size: 120%;'>{price}</div>",
 "list" : 
 ${c.listString|n}
 ,
 "action" : {
    "itemtap" : {
        "type" : "load",
        "url" : "menu/listItem/${c.group}/{index}"
    }
 }
}
