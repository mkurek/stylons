{
 "id" : "sizeButton${c.id}",
 "type" : "Button",
 "ui" : "confirm",
 "flex" : 1,
 "text" : "${c.name}",
 "action" :
  {
   "tap" :
   [
    {
     "type" : "send",
     "url" : "/change/change/${c.index}/${c.id}"
    },
    {
     "type" : "specialHide"
    }
   ]
  }
}