{
 "id" : "buttonAdd${c.id}",
 "type" : "Button",
 "ui" : "accept",
 "flex" : "1",
 "text" : "Dodaj",
 "action" : 
 {
  "tap" : [
    {
     "type" : "load",
     "url" : "confirm/add/${c.id}"
    },
    {
     "type" : "specialHide"
    }
   ]
 }
}