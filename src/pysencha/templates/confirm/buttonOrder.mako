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
     "type" : "send",
     "url" : "confirm/order/${c.id}"
    },
    {
     "type" : "specialHide"
    }
   ]
 }
}