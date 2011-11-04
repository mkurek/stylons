# -*- coding: utf-8 -*-
import logging, sys, os, json, unicodedata, re

from pylons import request, response, session, tmpl_context as c, url
from pylons.controllers.util import abort, redirect
from pysencha.lib.base import BaseController, render
from pysencha.model import meta
from pysencha.model.data_base import *
from sqlalchemy import func
from cart import CartController

class FormController(BaseController):

    def __getFieldsets(self):
        """Returns list of fieldsets (dictionaries)"""
        list = []

        result = meta.Session.query(Fieldsets).all()

        for row in result:
            fieldset = {'id' : row.id, 'groupName': row.groupName}
            list.append(fieldset)
        
        return list
    
    
    def __getFields(self, fieldset):
        """Returns list of fields (dictionaries)"""
        list = []

        result = meta.Session.query(Fields).\
                    select_from(Fields_Fieldsets).\
                    join(Fields, Fields_Fieldsets.fieldId == Fields.id).\
                    filter(Fields_Fieldsets.fieldsetId == fieldset).\
                    all()

        for row in result:
            
            field = {'id' : row.id, 'name' : row.name}
            list.append(field)
            
        return list
    
    def validate(self, fieldName, fieldValue):
        """Validate field (get regexp from DB)"""
        # convert to ascii
        val = unicodedata.normalize('NFD', fieldValue).encode('ascii', 'ignore')
        
        (regex, required) = meta.Session.query(Fields.regex, Fields.required).\
                                        filter(Fields.name == fieldName).\
                                        one()
           
        # if field is not required and is empty   
        if not required and val.strip() == '':
               return True
        
        # check field correctness    
        if re.search(str(regex), val) == None:
            return False
    
        return True
    
    def submit(self):
        """Put an order; validate fields and proceed to main page or throws errors"""
 
        # clear errors
        self.reset()
        errors = session['FieldsErrors']
           
        # load data
        data = json.loads(request.POST['data'], 'utf-8')
        
        d = {}
        
        # validate fields
        for (k, v) in data.items():
            correct = self.validate(k, v)
            d[str(k)] = v
            if not correct:
                errors.append(k)
        
        session.save()
        
        # if no errors save order in DB
        if not errors:
            # insert customer info        
            order = Orders(d['name'], d['surname'], d['city'], d['street'], d['houseNumber'], 
                           d['apartmentNumber'], d['email'], int(d['phonenumber']))
            
            meta.Session.add(order)
            meta.Session.commit()
        
            id = order.id
            
            # add dishes
            for dish in session['cart']:
                order = Orders_Dishes(id, int(dish))            
                meta.Session.add(order)
            
            meta.Session.commit() 
                
            # clear cart
            c = CartController()
            c.clearCart()
        
            x = '{"type" : "specialShow","url" : "static/form/orderMessage/shortDescription"}'
        
        else:
            x = '{"type" : "load","url" : "form/shortDescription"}'
        return x
    
    def shortDescription(self):
        """Render form"""
        
        # (create and) reference session var to errors
        if 'FieldsErrors' not in session:
            self.reset()
            
        errors = session['FieldsErrors']
        
        fields = {}
        
        # get all fieldsets
        fieldsets = self.__getFieldsets()
        
        # for all fieldsets get fields in it
        for fieldset in fieldsets:
            fieldsF = self.__getFields(fieldset['id'])
            
            newFields = []
            # add error field to each field if necessary
            for field in fieldsF:
                id = str(field['id'])
                field['url'] = 'field/'+id
                
                # rewrite field to newFields
                newFields.append(field)
                
                # if field is invalid - append error field to newFields
                if field['name'] in errors:
                    newFields.append({'id' : int(id), 'name' : 'errorField'+id, 'url' : 'errorField/'+id})
            
            # add fields to dict (by fieldset id) 
            fields[int(fieldset['id'])] = newFields
    
        c.fields = fields
        c.fieldsets = fieldsets
        
        return render('form/shortDescription.mako')
    
    
    def fieldset(self, id):
        """Render fieldset"""
        
        # get data from DB
        (c.groupName, c.title) = meta.Session.query(Fieldsets.groupName, Fieldsets.title).\
                            filter(Fieldsets.id == int(id)).\
                            one()
        
        return render('form/fieldset.mako')
    
    
    def field(self, id):
        """Render field"""
        
        # get data from DB
        (c.type, c.label, c.required, c.name) = meta.Session.query(Fields.type, Fields.label, Fields.required, Fields.name).\
                                                filter(Fields.id == int(id)).\
                                                one()
        # change 1 to "true", 0 to "false"
        c.required = "true" if c.required else "false"
            
        return render('form/field.mako')
    
    
    def errorField(self, id):
        """Render error field"""
        
        # get data from DB
        (c.errorMsg, c.name) = meta.Session.query(Fields.errorMessage, Fields.name).\
                                filter(Fields.id == int(id)).\
                                one()
        
        # Set default error message if not given
        if not c.errorMsg:
            c.errorMsg = "Nieprawidlowe pole"
        
        # Set name
        c.name = "error"+c.name[0].capitalize()+c.name[1:]
        
        return render('form/errorField.mako')
    
    def reset(self):
        """Reset error fields"""
        session['FieldsErrors'] = []
        session.save()