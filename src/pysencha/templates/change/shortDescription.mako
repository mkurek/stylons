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
     "id" : "changeButtonSize${c.id}",
     "url" : "change/buttonSize/${c.id}"
    },
    {
     "id" : "changeButtonDelete${c.index}",
     "url" : "change/buttonDelete/${c.index}"
    }
    ]
  }
  ]
}
