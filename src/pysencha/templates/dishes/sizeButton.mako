{
 "id" : "sizeButton${c.id}",
 "type" : "Button",
 "ui" : "action",
 "flex" : "1",
 "text" : "${c.size} - ${c.price} zł",
 "action" : 
 {
  "tap" : 
   {
    "type" : "specialShow",
    "url" : "confirm/shortDescription/${c.id}"
   }
 }
}