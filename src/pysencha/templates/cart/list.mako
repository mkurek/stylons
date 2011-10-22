{
 "id" : "cartList${c.id}", 
 "type" : "List",
 "itemtpl" : "{dish} ({size})<div style='position: absolute; top: 10px; right: 30px; font-size: 120%;'>{price}</div>",
 "list" : 
    ${c.items | n}
  ,
 "action" : {
    "itemtap" : {
        "type" : "specialShow",
        "url" : "/change/shortDescription/{index}"
    }
 }
}
