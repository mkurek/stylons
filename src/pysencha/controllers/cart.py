# -*- coding: utf-8 -*-
import logging, sys, os, json, hashlib

from pylons import request, response, session, tmpl_context as c, url
from pylons.controllers.util import abort, redirect
from pysencha.lib.base import BaseController, render
from pysencha.model import meta
from pysencha.model.data_base import *

class CartController(BaseController):
    def shortDescription(self):
        if not 'cart' in session:
            session['cart'] = []
            session.save()
        c.id = hashlib.sha256(str(session['cart'])).hexdigest()
        return render('/cart/shortDescription.mako')
    
    def toolbar(self):
        if not 'cart' in session:
            session['cart'] = []
            session.save()
        itemsList = meta.Session.query(Dish, Dish_Sizes, Sizes).join(Dish_Sizes, Sizes).\
            filter(Dish_Sizes.id.in_(session['cart'])).all()
        c.id = hashlib.sha256(str(session['cart'])).hexdigest()
        c.cost = sum(dish_size.price for (dish, dish_size, size) in itemsList)
        return render('/cart/toolbar.mako')
            
    def list(self):
        if not 'cart' in session:
            session['cart'] = []
            session.save()
        itemsList = meta.Session.query(Dish, Dish_Sizes, Sizes).join(Dish_Sizes, Sizes).\
            filter(Dish_Sizes.id.in_(session['cart'])).all()
        c.items = ",\n".join((u'{ "dish" : "%s", "price" : "%.2f zł", "id" : "%d" }'\
            % (dish.name, dish_size.price, dish_size.id)\
            for (dish, dish_size, size) in itemsList))
        c.id = hashlib.sha256(str(session['cart'])).hexdigest()
        return render('/cart/list.mako')