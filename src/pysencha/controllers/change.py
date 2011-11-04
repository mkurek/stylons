# -*- coding: utf-8 -*-

from pylons import session, tmpl_context as c
from pysencha.lib.base import BaseController, render
from pysencha.model import meta
from pysencha.model.data_base import *

class ChangeController(BaseController):
    """Render special slot for tapped dish on cart list"""
    def shortDescription(self, id):
        """Render short description
        
        Also change list index to dish's id from database
        """
        c.index = id
        if 'cart' in session and int(id) < len(session['cart']):    
            c.id = session['cart'][int(id)]
            return render('/change/shortDescription.mako')
        else:
            return ''
        
    def changeSize(self, id):
        """Render popup with change size buttons"""
        if 'cart' in session and int(id) < len(session['cart']):
            c.index = id
            c.id = session['cart'][int(id)]
            (parent,) = meta.Session.query(Dish_Sizes.dishId).\
                                    filter(Dish_Sizes.id == c.id).one()
            sizes = meta.Session.query(Dish_Sizes).\
                                    filter(Dish_Sizes.dishId == parent).all()
            c.sizes = [ it.id for it in sizes ]
            return render('/change/changeSize.mako')
        else:
            return ''
        
    def sizePopupButton(self, id):
        """Render button redirecting to popup with available sizes"""
        c.id = id
        return render('/change/sizePopupButton.mako')
        
    def buttonDelete(self, id):
        """Render button deleting dish from cart"""
        c.id = id
        return render('/change/buttonDelete.mako')
    
    def sizeButton(self, group, id):
        """Render button changing size of selected item (named group) to id"""
        c.index = group
        c.id = id
        (c.name,) = meta.Session.query(Sizes.name).\
                        join(Dish_Sizes).\
                        filter(Dish_Sizes.id == id).one()
        return render('/change/sizeButton.mako')
    
    def change(self, group, id):
        """Change selected item (as group) to id"""
        session['cart'][int(group)] = id 
        action = """{
            "type" : "load",
            "url" : "cart/shortDescription"
        }"""
        return action
    
    def delete(self, id):
        """Delete selected item from list"""
        if 'cart' in session and int(id) < len(session['cart']):
            del session['cart'][int(id)]
        action = """
        {
            "type" : "load",
            "url" : "cart/shortDescription"
        }"""
        return action