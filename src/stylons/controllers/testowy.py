#! -*- coding: UTF-8 -*-

from stylons.lib.base import BaseController
from stylons.stitems import *
import json

class TestowyController(BaseController):
    def index(self):
        x = ShortDescription(('testowy/screen', 
                                [('testowy/lista', []),
                                    ('testowy/toolbar',
                                         [('testowy/button',[])])]
                              ))
        return x
    
    def index2(self):
        x = ShortDescription(('testowy/screen', [('testowy/panel', []), ('testowy/toolbar', [('testowy/button', []), ('testowy/spacer', []), ('testowy/button2', [])])]))
        print "x: " + str(x)
        return x
    
    def screen(self):
        return Screen()

    def toolbar(self):
        return Toolbar(title="testowy Toolbar", dock='top')

    def panel(self):
        return Panel(html="testowy panel", scroll = 'horizontal')

    def button(self):
        return Button(text="button1", events={"tap" : Action(action="load", url="testowy/index2")})
    
    def button2(self):
        return Button(text="button2", events={"tap" : Action(action="load", url="testowy/index")})
    
    def spacer(self):
        return Spacer()
    
    def lista(self):
        return List(itemTpl = '{imie} : {nazwisko}', items = [{'imie' : 'Jan', 
        'nazwisko': 'Niezbedny'}, {'imie' : 'Mateusz', 'nazwisko' : 'Trąbalski'}], 
        events={'itemtap' : Action(action='load', url='buttons/index')})