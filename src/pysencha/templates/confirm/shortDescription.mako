{
 "id" : "popup",
 "url" : "confirm/dishes/special/index",
 "slots" : [
  {
   "id" : "confirmToolbarTop",
   "url" : "static/confirm/toolbarTop",
   "slots" : []
  },
  {
   "id" : "confirmContent${c.id}",
   "url" : "static/confirm/content"
  },
  {
   "id" : "confirmToolbarBottom",
   "url" : "static/confirm/toolbarBottom",
   "slots" : [
    {
     "id" : "buttonAbort",
     "url" : "static/confirm/buttonAbort"
    },
    {
     "id" : "buttonAdd${c.id}",
     "url" : "confirm/buttonAdd/${c.id}"
    },
    {
     "id" : "buttonOrder${c.id}",
     "url" : "confirm/buttonOrder/${c.id}"
    }
    ]
  }
  ]
}