# -*- coding: utf-8 -*-
import logging, sys, os, json

from pylons import request, response, session, tmpl_context as c, url
from pylons.controllers.util import abort, redirect
from handler import HandlerController
from pysencha.lib.base import BaseController, render
from pysencha.model import meta
from pysencha.model.data_base import *

class ChangeController(BaseController):
    """Render special slot for tapped dish on cart list"""
    
    def shortDescription(self, id):
        """Render short description
        
        Also change list index to dish's id from database
        """
        print '\n\n'+str(int(id))+'\n\n'
        c.index = id
        if 'cart' in session and int(id) < len(session['cart']):    
            c.id = session['cart'][int(id)]
            return render('/change/shortDescription.mako')
        
    def buttonSize(self, id):
        """Render button redirecting to popup with available sizes"""
        c.id = id
        return render('/change/buttonSize.mako')
        
    def buttonDelete(self, id):
        """Render button redirecting to popup with available sizes"""
        print '\n\nbutton\n' + id
        c.id = id
        return render('/change/buttonDelete.mako')
    
    def delete(self, id):
        """Delete selected item from list"""
        print '\nusuwam:\n' + id + '\n'
        print str(session['cart'])
        if 'cart' in session and int(id) < len(session['cart']):
            del session['cart'][int(id)]
        action = """
        {
            "type" : "load",
            "url" : "cart/shortDescription"
        }"""
        return action