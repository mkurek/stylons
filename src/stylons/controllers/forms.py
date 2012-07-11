#! -*- coding: UTF-8 -*-
import logging, json, unicodedata, re

from pylons import request, response, session, tmpl_context as c, url
from pylons.controllers.util import abort, redirect

from stylons.lib.base import BaseController, render
from stylons.stitems import Popup, Form, Panel, Fieldset, TextareaField, Radio,\
    Action, Button, Checkbox, Toolbar, TextField, ShortDescription, SelectField

log = logging.getLogger(__name__)

class FormsController(BaseController):

    def get(self):
        data = json.loads(request.POST['data'], 'utf-8')
        session['formValues'] = data
        session.save()
        return Action(action="popupShow", url="forms/popupsd")

    def index(self):
        form = [('forms/fieldset/0', [
                    ('forms/textfield/0', []),
                    ('forms/textfield/1', []),
                    ('forms/checkbox/1', []),
                    ('forms/select/0', [])
                ]),
                ('forms/fieldset/1', [
                    ('forms/radio/0', []),
                    ('forms/radio/1', []),
                    ('forms/radio/2', []),
                    ('forms/radio/3', [])
                ]),
                ('forms/textareafield/1', [])
        ]

        return ShortDescription(('main/screen', [
                                        ('main/panel', [
                                               ('forms/toolbar', [
                                                    ('forms/sendButton', [])
                                                ]),
                                               ('forms/form', form)
                                        ]),
                                        ('main/tabbar/3', [])
                                ]))
    def toolbar(self):
        return Toolbar(title="Form", ui="light", dock="top")

    def sendButton(self):
        return Button(text="Send", events={"tap" : [
                Action(action="send", url='forms/get', target="forms/form")]})

    def panel(self):
        return Panel(layout=Layout(composition="fit"))

    def form(self):
        return Form(scroll='vertical')

    def fieldset(self, id):
        names = ["Personal info", "Favourite color"]
        title = names[int(id) % len(names)]
        return Fieldset(title=title, instructions="Please fill Your " + title.lower())

    def textfield(self, id):
        # (label=name=value, required)  
        fields = [('name', True), ('surname', False)]
        (label, required) = fields[int(id) % len(fields)]
        return TextField(label=label, name=label, value=label, required=required)

    def checkbox(self, id):
        l = "Cool"
        return Checkbox(label=l, name=l, required=True, checked=True, value="I'am cool")

    def select(self):
        s = "Rank"
        options = {'master' : 'Master of disaster', 'geek' : 'Geek', 'nerd' : 'I love prolog'}
        return SelectField(label=s, name=s, options=options)

    def radio(self, id):
        name = "colors"
        colors = ["yellow", "red", "green", "blue"]
        c = colors[int(id) % len(colors)]
        checked = True if int(id) == 1 else False
        return Radio(name=name, label=c, checked=checked, value=c)

    def textareafield(self, id):
        l = "lifeHistory"
        v = "Your life history"
        return TextareaField(label=v, name=l, required=False, maxRows=10)

    #popup

    def popupsd(self):
        return ShortDescription(('forms/popup', [
                        ('forms/popupToolbar/0'),
                        ('forms/popupPanel'),
                        ('forms/popupToolbar/1', [
                                ('forms/popupButton/1')
                        ])
                ]))

    def popup(self):
        return Popup(width=250, height=350, alwaysReload=True)

    def popupToolbar(self, id):
        tb = [("top", "Form values:"), ("bottom", None)]
        (dock, title) = tb[int(id) % len(tb)]
        return Toolbar(dock=dock, title=title)

    def popupPanel(self):
        html = "Form values:"
        if "formValues" in session:
            for key in session['formValues'].keys():
                html = "<br>".join([html, str(key) + ": " + str(session['formValues'][key])])
        return Panel(html=html, alwaysReload=True)

    def popupButton(self, id):
        return Button(text="OK!", flex=1, ui="confirm", events={"tap": [
                        Action(action="popupHide"),
                        Action(action="load", url="buttons/index")
                        ]})
