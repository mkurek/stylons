# -*- coding: utf-8 -*-
import logging, sys, os, json

from pylons import request, response, session, tmpl_context as c, url
from pylons.controllers.util import abort, redirect
from pysencha.lib.base import BaseController, render
from pysencha.model import meta
from pysencha.model.data_base import *
from sqlalchemy import func

class DishesController(BaseController):
    def shortDescription(self, group, id):
        """Generate short description for dish panel
        
        Change index and group given as parameters 
        to identifier of dish in database
        
        Parameters:
        group -- id of dish's group choosen by user
        dishId -- position on list (index)
        """
        dishes = meta.Session.query(Dish.name, func.min(Dish_Sizes.price),\
                                    Dish.id, Menu_Leaves.groupId).\
                                    join(Dish_Sizes).\
                                    join(Menu_Leaves).\
                                    filter(Menu_Leaves.groupId == group).\
                                    group_by(Dish.id).\
                                    all()
        
        c.id = id
        group = meta.Session.query(Menu_Leaves).\
                                    filter(Menu_Leaves.dishId == id).one()
        c.group = group.groupId
        sizes = meta.Session.query(Dish_Sizes).\
                                    filter(Dish_Sizes.dishId == id).all()
        c.sizes = [ it.sizeId for it in sizes ]
        return render('/dishes/shortDescription.mako')
    
    def ingredients(self, id):
        """Generate panel with dish's ingredients"""
        c.dishId = id
        ingr = meta.Session.query(Ingredients).\
                                    join(Dish_Ingredients, Dish).\
                                    filter(Dish.id == id).all()
        c.ingr = ", ".join([ it.name for it in ingr ])
        return render('/dishes/ingredients.mako')
    
    def title(self, id):
        """Generate panel with dish's name"""
        c.dishId = id
        title = meta.Session.query(Dish).filter(Dish.id == id).one()
        c.title = title.name
        return render('/dishes/title.mako')
    
    def toolbar(self, id):
        """Generate toolbar with dish's name"""
        c.dishId = id
        title = meta.Session.query(Dish).filter(Dish.id == id).one()
        c.title = title.name
        return render('/dishes/toolbar.mako')
    
    def description(self, id):
        """Generate panel with dish description"""
        c.dishId = int(id)
        (c.desc,) = meta.Session.query(Dish.description).filter(Dish.id == id).one()
        return render('/dishes/description.mako')
    
    def picture(self, id):
        """Generate panel with url to dish's picture"""
        c.dishId = int(id)
        (c.picture,) = meta.Session.query(Dish.picture).filter(Dish.id == id).one()
        return render('/dishes/picture.mako')