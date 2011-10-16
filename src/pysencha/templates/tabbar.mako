{
 "id" : "${c.tab}Tabbar",
 "type" : "TabBar",
 "dock" : "bottom",
 "list" : 
 [
  {
   "id" : "TabbarButton1",
   "icon" : "home",
   "text" : "Menu",
   "action" : {
      "tap" : {
        "type" : "load",
        "url" : "menu/shortDescription"
      }
   }
   % if c.tab == 'menu':
   ,"active" : "true"
   % endif
  },
  {
   "id" : "TabbarButton2",
   "icon" : "cart",
   "text" : "Koszyk",
   % if c.badge:
   "badge" : "${c.badge}",
   % endif
   "action" : {
      "tap" : {
        "type" : "load",
        "url" : "cart/shortDescription"
      }
   }
   % if c.tab == 'cart':
   ,"active" : "true"
   % endif
  },
  {
   "id" : "TabbarButton3",
   "icon" : "favorites",
   "text" : "Promocje",
   "action" : {
      "tap" : {
        "type" : "load",
        "url" : "promotions/shortDescription"
      }
   }
   % if c.tab == 'promotions':
   ,"active" : "true"
   % endif
  },
  {
   "id" : "TabbarButton4",
   "icon" : "info",
   "text" : "Info",
   "action" : {
      "tap" : {
        "type" : "load",
        "url" : "info/shortDescription"
      }
   }
   % if c.tab == 'info':
   ,"active" : "true"
   % endif
  }
 ]
}