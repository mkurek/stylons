# -*- coding: utf-8 -*-
import logging, sys, os, json, hashlib

from pylons import request, response, session, tmpl_context as c, url
from pylons.controllers.util import abort, redirect
from pysencha.lib.base import BaseController, render
from pysencha.model import meta
from pysencha.model.data_base import *

class CartController(BaseController):
    
    
    def __getId(self):
        """Create unique id added to list and toolbar id's"""
        if 'cart' in session:
            return hashlib.sha256(str(session['cart'])).hexdigest()[0:5]
        else:
            return ''
    @staticmethod
    def __checkSession():
        """Create cart list in session if doesn't exist"""
        if not 'cart' in session:
            session['cart'] = []
            session.save()

    @staticmethod
    def getDishes():
        """Get dishes from database
        
        Return:
        list of (dish, dish_size, size)
        """
        CartController.__checkSession()
        items = []
        for i in session['cart']:
            items.append(meta.Session.query(Dish, Dish_Sizes, Sizes).\
                        join(Dish_Sizes, Sizes).\
                        filter(Dish_Sizes.id == i).one())
        return items

    def shortDescription(self):
        """Render short description with unique toolbar and list""" 
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
        c.items = ",\n".join((u'{ "dish" : "%s", "price" :'\
                    u'"%.2f zł", "id" : "%d" }'\
                    % (dish.name, dish_size.price, dish_size.id)\
                    for (dish, dish_size, size) in self.getDishes()))
        c.id = self.__getId()
        return render('/cart/list.mako')
    
    def clear(self):
        """Clear list"""
        print "\n\njestem tu\n\n"
        session['cart'] = []
        session.save()
        action = '{"type" : "load","url" : "cart/shortDescription"}'
        return action