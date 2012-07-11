#! -*- coding: UTF-8 -*-
import logging, json, unicodedata, re

from pylons import request, response, session, tmpl_context as c, url
from pylons.controllers.util import abort, redirect

from stylons.lib.base import BaseController, render
from stylons.stitems import ShortDescription, Panel, Screen, Button, Form, TextField, Checkbox, Toolbar, Action, SelectField

log = logging.getLogger(__name__)

class ShowtimeController(BaseController):

    def index(self):
        form = ['showtime/txtField', 'showtime/checkbox', 'showtime/select']
        
        return ShortDescription(('showtime/screen', 
                                 [
                                  ('showtime/toolbar', 
                                   [
                                    'showtime/sendButton'
                                    ]),
                                  ('showtime/form',form)
                                  ])
                                )
        
    def screen(self):
        return Screen()
    
    def toolbar(self):
        return Toolbar(title="Sample form")
    
    def sendButton(self):
        return Button(text="Send", ui="confirm", events={"tap" : [Action(action="send", url="showtime/get", target="showtime/form")]})
    
    def form(self):
        return Form()
    
    def txtField(self):
        return TextField(name="txtField", label="Your name", required=True)
    
    def checkbox(self):
        n="chk"
        return Checkbox(name=n, label="Do You like STX?", value=n, checked=True)
    
    def select(self):
        s = "favProgLang"
        options = {'python2.6' : 'Python 2.6', 'python2.7' : 'Python 2.7', 'python3' : 'Python 3'}
        return SelectField(label=s, name=s, options=options)
    
    # get and redirect
    def get(self):
         data = json.loads(request.POST['data'], 'utf-8')
         session['formVals'] = data
         session.save()
         return Action(action="load", url="showtime/index2")
     
    def index2(self):
        return ShortDescription(('showtime/screen', 
                                [
                                 'showtime/toolbar',
                                 'showtime/panel'
                                 ]))
    def panel(self):
        result="Form values:"
        for k in session['formVals'].keys():
            tmp = " : ".join([k, str(session['formVals'][k])])
            result = "<br>".join([result,tmp])
        return Panel(html=result, ui="dark")
