import logging

from pylons import request, response, session, tmpl_context as c, url
from pylons.controllers.util import abort, redirect

from stylons.lib.base import BaseController, render
from stylons.stitems import Panel, Screen, Tab, Tabbar, Action, Layout

log = logging.getLogger(__name__)

class MainController(BaseController):

    def index(self):
        # Return a rendered template
        #return render('/main.mako')
        # or, return a string
        return 'Hello World'


    def tabbar(self, id):
        tabs=[("List", "info", "list/index/-1"), ("Buttons", "favorites", "buttons/index"),  ("Form", "team", "forms/index"), ("Session", "time", "timer/index")]
        tabsList = []
        
        for (text, icon, url) in tabs:
            active=True if tabs.index((text, icon, url)) == int(id)-1 else None
            currentTab = Tab(text=text, icon=icon, active=active, events={"tap" : Action(action="load", url=url)})
            #currentTab['id'] = hashID(currentTab)
            tabsList.append(currentTab)
        
        return Tabbar(dock='bottom', tabsList=tabsList)
    
    def screen(self):
        return Screen()
    
    def panel(self):
        return Panel(layout=Layout(composition="fit"))