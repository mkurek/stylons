{
 "id" : "sendButton${c.disabled}",
 "type" : "Button",
 "ui" : "confirm",
 "text" : "Zamów",
 "disabled" : ${c.disabled},
 "action" : {
      "tap" : {
        "type" : "load",
        "url" : "form/shortDescription"
      }
   }
}