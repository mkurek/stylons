{
 "id" : "buttonOrder${c.id}",
 "type" : "Button",
 "ui" : "confirm",
 "flex" : "1",
 "text" : "Zamów",
 "action" : 
 {
  "tap" : [
    {
     "type" : "load",
     "url" : "confirm/order/${c.id}"
    },
    {
     "type" : "specialHide"
    }
   ]
 }
}