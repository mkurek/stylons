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
      {
      		"id" : "ordersPanel0",
      		"url" : "orders/showPanel/0"
      }
      % for i in range(1,c.size):
     	,{
        	"id" : "ordersPanel${i}",
      	    "url" : "orders/showPanel/${i}"
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