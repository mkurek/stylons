# -*- coding: utf-8 -*-
import logging, sys, os, json

from pylons import request, response, session, tmpl_context as c, url
from pylons.controllers.util import abort, redirect
from pysencha.lib.base import BaseController, render
from pysencha.model import meta
from pysencha.model.data_base import *

class DishesController(BaseController):
    def shortDescription(self, dishId):
        """
        generate short description:
        required : c.id (dish id in database), c.group (dish group in database), c.sizes (list of size's id)
        """
        c.id = dishId
        group = meta.Session.query(Menu_Leaves).filter(Menu_Leaves.dishId == dishId).one()
        c.group = group.groupId
        sizes = meta.Session.query(Dish_Sizes).filter(Dish_Sizes.dishId == dishId).all()
        c.sizes = [ it.sizeId for it in sizes ]
        return render('/dishes/shortDescription.mako')
    
    def ingredients(self, dishId):
        c.dishId = dishId
        ingr = meta.Session.query(Ingredients).\
            join(Dish_Ingredients, Dish).\
            filter(Dish.id == dishId).all()
        c.ingr = ", ".join([ it.name for it in ingr ])
        return render('/dishes/ingredients.mako')
    
    def title(self, dishId):
        c.dishId = dishId
        title = meta.Session.query(Dish).filter(Dish.id == dishId).one()
        c.title = title.name
        return render('/dishes/title.mako')
    
    def toolbar(self, dishId):
        c.dishId = dishId
        title = meta.Session.query(Dish).filter(Dish.id == dishId).one()
        c.title = title.name
        return render('/dishes/toolbar.mako')
    
    def description(self, dishId):
        c.dishId = dishId
        desc = meta.Session.query(Dish).filter(Dish.id == dishId).one()
        c.desc = desc.description
        return render('/dishes/description.mako')
    
    def picture(self, dishId):
        c.dishId = dishId
        picture = meta.Session.query(Dish).filter(Dish.id == dishId).one()
        c.picture = picture.picture
        return render('/dishes/picture.mako')