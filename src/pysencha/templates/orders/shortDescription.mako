{
  "id" : "screen",
  "url" : "static/index",
  "slots" : [
    {
    "id" : "orders",
    "url" : "static/orders/index",
    "slots" : [
      {
      "id" : "orderToolbar",
      "url" : "orders/toolbar",
      "slots" : []
      },
      {
      "id" : "ordersPanel",
      "url" : "static/orders/panel/index",
      "slots" : [
      % if c.size:
      {
      		"id" : "ordersPanel${c.orders[0]}",
      		"url" : "orders/showPanel/${c.orders[0]}"
      }
      % endif
      % for i in range(1,c.size):
     	,{
        	"id" : "ordersPanel${c.orders[i]}",
      	    "url" : "orders/showPanel/${c.orders[i]}"
    	 }
      % endfor
       
      ]
      }
    ]
    },
    {
    "id" : "ordersTabbar",
    "url" : "orders/tabbar"
    }
  ]
}