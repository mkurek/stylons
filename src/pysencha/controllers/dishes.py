# -*- coding: utf-8 -*-

from pylons import session, tmpl_context as c
from pysencha.lib.base import BaseController, render
from pysencha.model import meta
from pysencha.model.data_base import *

class DishesController(BaseController):
    '''Render dish panel elements'''
    def shortDescription(self, group, id):
        """Generate short description for dish panel
        
        Change index and group given as parameters 
        to identifier of dish in database
        
        Parameters:
        group -- id of dish's group choosen by user
        id -- position on list (index)
        """
        c.id = id
        group = meta.Session.query(Menu_Leaves).\
                                    filter(Menu_Leaves.dishId == id).one()
        c.group = group.groupId
        sizes = meta.Session.query(Dish_Sizes).\
                                    filter(Dish_Sizes.dishId == id).all()
        c.sizes = [ it.id for it in sizes ]
        return render('/dishes/shortDescription.mako')
    
    def ingredients(self, id):
        """Generate panel with dish's ingredients"""
        c.dishId = id
        ingr = meta.Session.query(Ingredients.name).\
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
    
    def sizeButton(self, id):
        """Make size button (id is dish_sizes.id)"""
        c.id = int(id)
        (c.size, c.price) = meta.Session.query(Sizes.name, Dish_Sizes.price).\
                                    join(Dish_Sizes, Dish).\
                                    filter(Dish_Sizes.id == id).one()
        return render('/dishes/sizeButton.mako')