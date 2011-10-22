{
  "id" : "screen",
  "url" : "index",
  "slots" : [
    {
    "id" : "menu",
    "url" : "menu/index",
    "slots" : [
      {
      "id" : "menuToolbar${c.group}",
      "url" : "menu/toolbar/${c.group}",
      "slots" : [
      % if c.parent:
       {
        "id" : "backButton${c.parent}",
        "url" : "menu/backButton/${c.parent}"
       }
      % endif
      ]
      },
      {
      "id" : "menuList${c.group}",
      "url" : "menu/list/${c.group}",
      "slots" : []
      }
    ]
    },
    {
    "id" : "menuTabbar",
    "url" : "menu/tabbar"
    }
  ]
}