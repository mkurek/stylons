{
 "id" : "popup",
 "url" : "menu/dishes/special/index",
 "slots" : [
  {
   "id" : "dishToolbar",
   "url" : "menu/dishes/special/toolbar",
   "slots" : []
  },
  {
   "id" : "dishPopupContent",
   "url" : "menu/dishes/special/content"
  },
  {
   "id" : "dishToolbar2",
   "url" : "menu/dishes/special/toolbar2",
   "slots" : [
    {
     "id" : "buttonAbort",
     "url" : "menu/dishes/special/buttonAbort"
    },
    {
     "id" : "buttonAdd${c.hash}",
     "url" : "menu/dishes/special/${c.url}/buttonAdd"
    },
    {
     "id" : "buttonOrder${c.hash}",
     "url" : "menu/dishes/special/${c.url}/buttonOrder"
    }
    ]
  }
  ]
}