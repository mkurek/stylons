{
  "id" : "screen",
  "url" : "static/index",
  "slots" : [
    {
    "id" : "menu",
    "url" : "static/menu/index",
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
         "url" : "static/spacer"
        },
        {
         "id" : "sendButton",
         "url" : "static/cart/sendButton"
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
