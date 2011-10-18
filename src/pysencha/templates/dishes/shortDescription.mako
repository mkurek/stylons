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
       "url" : "static/menu/dishes/panel",
       "slots" : [
        {
         "id" : "dishesTitle${c.id}",
         "url" : "dishes/title/${c.id}"
        },
        {
         "id" : "dishesPicture${c.id}",
         "url" : "dishes/picture/${c.id}"
        },
        {
         "id" : "dishesDesc",
         "url" : "static/dishes/desc"
        },
        {
         "id" : "dishesIngr${c.id}",
         "url" : "dishes/ingr/${c.id}"
        },
        {
         "id" : "Sizes",
         "url" : "static/menu/dishes/sizes",
         "slots" : [
          % for i in c.sizes:
          {
           "id" : "sizeButton${i}",
           "url" : "dishes/sizeButton/${i}"
          },
          % endfor
          {}
         ]
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