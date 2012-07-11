#! -*- coding: UTF-8 -*-
import logging

from pylons import request, response, session, tmpl_context as c, url
from pylons.controllers.util import abort, redirect

from stylons.lib.base import BaseController, render
from stylons.stitems import ShortDescription, Toolbar, Panel, Button, Action, Spacer, Popup

log = logging.getLogger(__name__)

class ButtonsController(BaseController):

    def index(self):
        btnsForGroup = 6
        lst = []
        for toolbar in range(1, 4):
            btns = []
            for btn in range((toolbar-1)*btnsForGroup, (toolbar)*btnsForGroup):
                btns.append(('buttons/button/'+str(btn), []))
                if (btn+1)%5 == 0:
                    btns.append(('buttons/spacer', []))
            lst.append(('buttons/toolbar/'+str(toolbar), btns))

        return ShortDescription(('main/screen', [
                                        ('main/panel', [
                                               ('buttons/toolbar/0', [
                                                    ('buttons/popupShow', [])
                                                ]),
                                               ('buttons/panel', lst)         
                                        ]),
                                        ('main/tabbar/2', [])
                                ]))
    
    def toolbar(self, id):
        titles = ["Buttons toolbar", "normal", "round", "small"]
        return Toolbar(title=titles[int(id)])
    
    def panel(self):
        return Panel(html="Buttons panel", margin="50 30 50")
    
    def button(self, id):
        btnTypes = ["", "-round", "-small"]
        panel = int(int(id)/6)
        buttons = [("back", '', None), ("normal", '5', None), ("decline", '', None),
                   ("confirm", '', 1), ("action", '', None), ("forward", '', None)
                   ]
        (ui, badge, flex) = buttons[int(id)%len(buttons)]
        return Button(ui=ui+btnTypes[panel], text=ui, badge=badge, flex=flex)
        
    def popupShow(self):
        return Button(text="Popup", ui="confirm", events={"tap": Action(action="popupShow", url="buttons/popupsd")})
        
    def spacer(self):
        return Spacer()
    
    # popup
    
    def popupsd(self):
        return ShortDescription(('buttons/popup', [
                        ('buttons/popupToolbar/0', []),
                        ('buttons/popupPanel', []),
                        ('buttons/popupToolbar/1', [
                                ('buttons/popupButton/1', [])
                        ])
                ]))
    
    def popup(self):
        return Popup(width=250, height=150)
    
    def popupToolbar(self, id):
        tb = [("top", "Popup"), ("bottom", None)]
        (dock, title) = tb[int(id)%len(tb)]
        return Toolbar(dock=dock, title=title)
    
    def popupPanel(self):
        return Panel(html="Popup panel")
    
    def popupButton(self, id):
        return Button(text="OK!", flex=1, ui="confirm", events={"tap": Action(action="popupHide")})