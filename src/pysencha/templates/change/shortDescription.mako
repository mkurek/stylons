{
 "id" : "popup",
 "url" : "static/change/index",
 "slots" : [
  {
   "id" : "changeToolbar",
   "url" : "static/change/toolbar",
   "slots" : []
  },
  {
   "id" : "changePanel",
   "url" : "static/change/panel",
   "slots" : [
    {
     "id" : "changeButtonHide",
     "url" : "static/change/hide"
    },
    {
     "id" : "sizePopupButton${c.index}",
     "url" : "change/sizePopupButton/${c.index}"
    },
    {
     "id" : "changeButtonDelete${c.index}",
     "url" : "change/buttonDelete/${c.index}"
    }
    ]
  }
  ]
}
