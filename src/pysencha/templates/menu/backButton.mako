{
 "id" : "backButton${c.id}",
 "type" : "Button",
 "ui" : "back",
 "text" : "${c.name}",
 "action" : 
 {
  "tap" :
    {
     "type" : "load",
     "url" : "menu/shortDescription/${c.id}"
    }
 }
}