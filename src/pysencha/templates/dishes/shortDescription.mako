{
  "id" : "screen",
  "url" : "static/index",
  "slots" : [
    {
    "id" : "menu",
    "url" : "static/menu/index",
    "slots" : [
      {
      "id" : "dishToolbar${c.id}",
      "url" : "dishes/toolbar/${c.id}",
      "slots" : [
       {
        "id" : "dishBackButton${c.group}",
        "url" : "menu/backButton/${c.group}",
        "slots" : []
       }
       ]
      },
      {
       "id" : "dishPanel",
       "url" : "static/dishes/panel",
       "slots" : [
        {
         "id" : "dishTitle${c.id}",
         "url" : "dishes/title/${c.id}"
        },
        {
         "id" : "dishPicture${c.id}",
         "url" : "dishes/picture/${c.id}"
        },
        {
         "id" : "dishDesc${c.id}",
         "url" : "dishes/description/${c.id}"
        },
        {
         "id" : "dishIngr${c.id}",
         "url" : "dishes/ingredients/${c.id}"
        }
       ]
      }
    ]
    },
    {
    "id" : "menuTabbar",
    "url" : "menu/tabbar"
    }
  ]
}