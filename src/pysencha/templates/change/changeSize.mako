{
 "id" : "popup",
 "url" : "static/change/index",
 "slots" : [
  {
   "id" : "sizeToolbar",
   "url" : "static/change/toolbarSize",
   "slots" : []
  },
  {
   "id" : "changePanel",
   "url" : "static/change/panel",
   "slots" : [
     {
      "id" : "sizeButton${c.sizes[0]}",
      "url" : "change/sizeButton/${c.index}/${c.sizes[0]}"
     }
     % for i in c.sizes[1:]:
     ,{
      "id" : "sizeButton${i}",
      "url" : "change/sizeButton/${c.index}/${i}"
     }
     % endfor
    ]
  }
  ]
}
