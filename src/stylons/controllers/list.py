#! -*- coding: UTF-8 -*-
import logging, json, unicodedata, re

from pylons import request, response, session, tmpl_context as c, url
from pylons.controllers.util import abort, redirect

from stylons.lib.base import BaseController, render
from stylons.stitems import Action, ShortDescription, Toolbar, Button, List

log = logging.getLogger(__name__)

class ListController(BaseController):

    def listOfCinema(self, id):
        id = int(id)
        listOfCinema = ('Kinepolis', 'Cinemacity','Multikino')
        return listOfCinema[id]

    def data(self, id):
        firstLevel = [
                 {'cinema' : 'Kinepolis', 'city' : 'Poznań'},
                 {'cinema' : 'Cinemacity', 'city' : 'Kraków'},
                 {'cinema' : 'Multikino', 'city' : 'Szczecin'}
        ]
        
        secondLevel = [[
                         {'movie' : 'Wasabi : Python zawodowiec', 'director' : 'MK', 'time' : ('18:00','24:00')},
                         {'movie' : 'Terminator Pythona', 'director' : 'Kubked','time' : ('18:00','23:30')},
                         {'movie' : 'Python fiction', 'director' : 'Kubked','time' : ('18:00','19:30')}
                        ],
                       [
                         {'movie' : 'Przekroczony zakres', 'director' : 'meret','time' : ('18:00','20:00')},
                         {'movie' : 'Galopujące słowniki 5', 'director' : 'Kubked','time' :('18:00','19:30')},
                         {'movie' : 'Kompiluj aż umrzesz', 'director' : 'baszmen','time' : ('18:00','18:30')}
                        ],
                       [
                         {'movie' : 'Pythonowy krąg (Python Club)', 'director' : 'pdhijb','time' : ('11:00','15:00')},
                         {'movie' : '2 147 483 647 zmysł', 'director' : 'Janek','time' : ('11:00','18:00')}
                        ]
        ]
        if id != -1 :
            return secondLevel[id]
        return firstLevel

    def index(self):
        return index(id=-1)

    def index(self, id):
        id = str(id)
        return ShortDescription(('main/screen', [
                                        ('main/panel', [
                                               ("list/toolbar/"+id, [
                                                    ("list/backButton/"+id, [])    
                                                                     ]),
                                               ("list/list/"+id, [])         
                                        ]),
                                        ('main/tabbar/1', [])
                                ]))
            
    def backButton(self, id):
        id= int(id)
        if id != -1:
            return Button(ui="back", text="Wstecz", events={"tap" : [ 
                Action(action="load", url="list/index/-1")]} )
        else :
            return Button(ui="back", text="Wstecz")
        
    def toolbar(self,id):
        id = int(id)
        if id == -1 :
            title = "Kina Polskie"
        else :
            cinema = self.listOfCinema(id)
            title = "Repertuar kina: " + str(cinema)
        return Toolbar(title=title)
    
    def list(self, id):
        id = int(id)
        items = self.data(id);
        
        if id == -1 :
            itemTpl = 'Zobacz repertuar kina: <b>{cinema}</b></br> {city}'
            events = {"itemtap" : [Action(action="load", url="list/index/{index}")]}
        else :
            for i,j in enumerate(items) :
                result = ""
                for k in j['time'] :
                    result += k 
                    result += " "
                items[i]['time'] = result
            itemTpl = '<div style="font:bold large arial;">{movie}</div>\
                        <div style="font-size: small">{time}\
                        <div style="font-weight: bold">director: {director}</div></div>' 
            events = None
        
        return List(itemTpl=itemTpl, items=items, fullscreen=True, events=events)
