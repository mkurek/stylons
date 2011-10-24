# -*- coding: utf-8 -*-
import logging, sys, os, json

from pylons import request, response, session, tmpl_context as c, url
from pylons.controllers.util import abort, redirect
from pysencha.lib.base import BaseController, render
from pysencha.model import meta
from pysencha.model.data_base import *


class FormController(BaseController):

    def __getFieldsets(self):
        """Returns list of fieldsets (dictionaries)"""
        list = []

        for row in meta.Session.query(Fieldsets).all():
            fieldset = {'id' : row.id, 'groupName': row.groupName, 'title' : row.title}
            list.append(fieldset)
        
        return list
    
    
    def __getFields(self, fieldset):
        """Returns list of fields (dictionaries)"""
        list = []
        
        for row in meta.Session.query(Fields).select_from(Fields_Fieldsets).join(Fields, Fields_Fieldsets.fieldId == Fields.id).filter(Fields_Fieldsets.fieldsetId == fieldset).all():
            field = {'id' : row.id, 'type': row.type, 'label' : row.label, 'required': "true" if row.required else "false", 'name' : row.name}
            list.append(field)
            
        return list
    
    def submit(self):
        # primitive return without checking POST data
        
        serverpath = os.path.dirname(os.path.dirname(__file__))
        path = os.path.join(serverpath, 'testy/refapp/form/end/data')
        data = json.loads(request.POST['data'], 'utf-8')
        f = open(path, 'w')
        dataStr = '{"id" : "dataEnd'+'", "styleHtmlContent" : "true", \
        "html" : "<h3>Odebrałem:</h3>'+'<br/>'.join(['%s: %s' % (k.encode('utf-8'), 
                            v.encode('utf-8')) for (k, v) in data.items()])+'"}'
        f.write(dataStr)
        f.close()
        
        x = '{"type" : "specialShow","url" : "static/form/orderMessage/shortDescription"}'
        return x
    
    def shortDescription(self):
        
        fieldsList = {}
        # get all fieldsets
        fieldsets = self.__getFieldsets()
        
        #print "fieldsets"
        #print fieldsets
        
        # for all fieldsets get 
        for fieldset in fieldsets:
            fields = self.__getFields(fieldset['id'])
            fieldsList[int(fieldset['id'])] = fields
    
        c.fields = fieldsList
        c.fieldsets = fieldsets
        
        #print "fieldList"
        #print fieldsList
        
        return render('form/shortDescription.mako')
    
    def fieldset(self, id):
        # do poprawy zapytania - docelowo w 1
        (c.groupName, ) = meta.Session.query(Fieldsets.groupName).filter(Fieldsets.id == int(id)).one()
        (c.title, ) = meta.Session.query(Fieldsets.title).filter(Fieldsets.id == int(id)).one()
        
        return render('form/fieldset.mako')
    
    def field(self, id):
        (c.type, c.label, c.required, c.name) = meta.Session.query(Fields.type, Fields.label, Fields.required, Fields.name).filter(Fields.id == int(id)).one()
        if c.required:
            c.required = "true"
        else:
            c.required = "false"
        
        return render('form/field.mako')