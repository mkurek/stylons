{
  "id" : "screen",
  "url" : "index",
  "slots" : [
    {
    "id" : "menu",
    "url" : "menu/index",
    "slots" : [
      {
      "id" : "cartToolbar${c.id}",
      "url" : "cart/toolbar",
      "slots" : [
        {
         "id" : "clearButton",
         "url" : "static/cart/clearButton"
        },
        {
         "id" : "spacer",
         "url" : "spacer"
        },
        {
         "id" : "sendButton",
         "url" : "cart/sendButton"
        }
      ]
      },
      {
      "id" : "cartList${c.id}",
      "url" : "cart/list",
      "slots" : []
      }
    ]
    },
    {
    "id" : "cartTabbar",
    "url" : "cart/tabbar"
    }
  ]
}
