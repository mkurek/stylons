# -*- coding: utf-8 -*-
import logging, sys, os, json

from pylons import request, response, session, tmpl_context as c, url
from pylons.controllers.util import abort, redirect
from pysencha.lib.base import BaseController, render
from pysencha.model import meta
from pysencha.model.data_base import *


class FormController(BaseController):
    def submit(self):
        # primitive return without checking POST data
        x = '{"type" : "load","url" : "form/end/shortDescription"}'
        serverpath = os.path.dirname(os.path.dirname(__file__))
        path = os.path.join(serverpath, 'testy/refapp/form/end/data')
        data = json.loads(request.POST['data'], 'utf-8')
        f = open(path, 'w')
        dataStr = '{"id" : "dataEnd'+'", "styleHtmlContent" : "true", \
        "html" : "<h3>Odebrałem:</h3>'+'<br/>'.join(['%s: %s' % (k.encode('utf-8'), 
                            v.encode('utf-8')) for (k, v) in data.items()])+'"}'
        f.write(dataStr)
        f.close()
        return x
    
    def shortDescription(self):
        return render('form/shortDescription.mako')
    
    def fieldset(self, id):
        # do poprawy zapytania - docelowo w 1
        (c.groupName, ) = meta.Session.query(Fieldsets.groupName).filter(Fieldsets.id == int(id)).one()
        (c.title, ) = meta.Session.query(Fieldsets.title).filter(Fieldsets.id == int(id)).one()
        
        return render('form/fieldset.mako')
    
    def field(self, id):
        (c.type, ) = meta.Session.query(Fields.type).filter(Fields.id == int(id)).one()
        (c.label, ) = meta.Session.query(Fields.label).filter(Fields.id == int(id)).one()
        c.required = meta.Session.query(Fields.required).filter(Fields.id == int(id)).one()
        if c.required:
            c.required = "true"
        else:
            c.required = "false"
        
        (c.name, ) = meta.Session.query(Fields.name).filter(Fields.id == int(id)).one()
        return render('form/field.mako')