# -*- coding: utf-8 -*-
import logging, sys, os, json

from pylons import request, response, session, tmpl_context as c, url
from pylons.controllers.util import abort, redirect
from pysencha.lib.base import BaseController, render
from handler import HandlerController
from pysencha.model import meta
from pysencha.model.data_base import *

class ConfirmController(BaseController):
    
    def __add(self, id):
        if 'cart' in session:
            session['cart'].append(id)
        else:
            session['cart']=[id]
        session.save()
    
    def buttonAdd(self, id):
        """Render button to add dish into cart"""
        c.id = id
        return render('/confirm/buttonAdd.mako')
    
    def buttonOrder(self, id):
        """Render button to order dish"""
        c.id = id
        return render('/confirm/buttonOrder.mako')
    
    def content(self, id):
        """Render panel with question"""
        (c.name, c.size) = meta.Session.query(Dish.name, Sizes.name).\
                        join(Dish_Sizes, Sizes).\
                        filter(Dish_Sizes.id==id).one()
        return render('/confirm/content.mako')
    
    def add(self, id):
        """Add selected dish to session.cart"""
        self.__add(id)
        (group, id) = meta.Session.query(Menu_Leaves.groupId, Dish.id).\
                                join(Dish, Dish_Sizes).\
                                filter(Dish_Sizes.id == id).\
                                one()
        action = {'type': 'load', 'url' : '/'.join(('/dishes/shortDescription',
                                                    str(group), str(id)))}
        return json.dumps(action)
    
    def order(self, id):
        """Add selected dish to session.cart and go to form"""
        "First add:"
        self.__add(id)
        "Then go to form:"
        action = {'type': 'load', 'url' : '/form/shortDescription'}
        return json.dumps(action)
    
    def shortDescription(self, id):
        """Render special slot description for all dishes"""
        c.id = id
        return render('/confirm/shortDescription.mako')