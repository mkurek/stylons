{
 "id" : "menuList",
 "type" : "List",
 "itemtpl" : "{dish}<div class='metadata'>{ingredients}</div><div class='right'>{price}</div>",
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
