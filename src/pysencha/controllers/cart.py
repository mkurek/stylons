# -*- coding: utf-8 -*-
import json, hashlib

from pylons import session, tmpl_context as c
from pysencha.lib.base import BaseController, render
from pysencha.model import meta
from pysencha.model.data_base import *

class CartController(BaseController):
    '''Render cart tab elements'''
    def __getId(self):
        """Create unique id added to list and toolbar id's"""
        if 'cart' in session:
            return hashlib.sha256(str(session['cart'])).hexdigest()[0:5]
        else:
            return ''
        
    def __canSend(self):
        return True if len(session['cart']) > 0 else False
    
    def getDishes(self):
        """Get dishes from database
        
        Return:
        list of (dish, dish_size, size)
        """
        if not 'cart' in session:
            session['cart'] = []
            session.save()
        items = []
        for i in session['cart']:
            items.append(meta.Session.query(Dish, Dish_Sizes, Sizes).\
                        join(Dish_Sizes, Sizes).\
                        filter(Dish_Sizes.id == i).one())
        return items

    def shortDescription(self):
        """Render short description with unique toolbar and list"""
        c.sendDisabled = "false" if self.__canSend() else "true"
        c.id = self.__getId()
        return render('/cart/shortDescription.mako')
    
    def toolbar(self):
        """Render cart toolbar with summary cost of ordered dishes"""
        c.id = self.__getId()
        c.cost = sum((dish_size.price for (dish, dish_size, size)\
                    in self.getDishes()))
        return render('/cart/toolbar.mako')
        
    def list(self):
        """Render ordered list"""
        items = [{"dish" : dish.name, "size" : size.name, 
                  "price" : ' '.join((str(dish_size.price), u'zł')),
                  "id" : dish_size.id} for (dish, dish_size,
                  size) in self.getDishes()]
        c.items = json.dumps(items)
        c.id = self.__getId()
        return render('/cart/list.mako')
    
    def sendButton(self):
        """Render clear button"""
        c.disabled = "false" if self.__canSend() else "true"
        return render('/cart/sendButton.mako')
    
    def clear(self):
        """Clear list"""
        session['cart'] = []
        session.save()
        action = '{"type" : "load","url" : "cart/shortDescription"}'
        return action