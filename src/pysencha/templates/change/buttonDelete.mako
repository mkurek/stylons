{
 "id" : "changeButtonDelete${c.id}",
 "type" : "Button",
 "ui" : "decline",
 "text" : "Usuń",
 "action" :
 {
  "tap" :
  [
   {
    "type" : "specialShow",
    "url" : "change/delete/${c.id}"
   },
   {
    "type" : "load",
    "url" : "cart/shortDescription"
   },
   {
    "type" : "specialHide"
   }
  ]
 }
}