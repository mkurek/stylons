{
 "id" : "buttonAdd${c.id}",
 "type" : "Button",
 "ui" : "accept",
 "flex" : "1",
 "text" : "Dodaj",
 "action" : 
 {
  "tap" :
  [
    {
     "type" : "send",
     "url" : "confirm/add/${c.id}"
    },
    {
     "type" : "specialHide"
    }
  ]
 }
}