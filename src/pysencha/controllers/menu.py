# -*- coding: utf-8 -*-
import logging, sys, os, json

from pylons import request, response, session, tmpl_context as c, url
from pylons.controllers.util import abort, redirect
from handler import HandlerController
from dishes import DishesController
from pysencha.lib.base import BaseController, render
from pysencha.model import meta
from pysencha.model.data_base import *
from sqlalchemy import func
from sqlalchemy.orm import aliased

class MenuController(BaseController):
    
    def __getList(self, id):
        """Get groups and dishes, which parent is 'id' and make list of dictionaries."""
        g1 = aliased(Group)
        g2 = aliased(Group)
        groups = meta.Session.query(Menu, g1, g2).\
                                    join(g1, Menu.parentGroup == g1.id).\
                                    join(g2, Menu.childGroup == g2.id).\
                                    filter(Menu.parentGroup == id).\
                                    all()
        list = [{ 'dish' : childGroup.name, 'id' : childGroup.id,
                                    'group' : True } for (menu, 
                                    parentGroup, childGroup) in groups]
        dishes = meta.Session.query(Dish.name, Dish.id,
                                    func.min(Dish_Sizes.price)).\
                                    join(Dish_Sizes).\
                                    join(Menu_Leaves).\
                                    filter(Menu_Leaves.groupId == id).\
                                    group_by(Dish.id).\
                                    all()
        for (name, id, price) in dishes:
            ingredients = meta.Session.query(Ingredients.name).\
                                    join(Dish_Ingredients, Dish).\
                                    filter(Dish.id == id).\
                                    all()
            ingredientsStr = ', '.join((it.name for it in ingredients))
            list.append({ 'dish' : name , 'price' : ' '.join((str(round(price,
                                    2)), 'zł')), 'id' : id, 'group' : False,
                                    'ingredients' : ingredientsStr})
        return list
    
    def listItem(self, group, id):
        """Route item tap to group or dish"""
        id = int(id)
        list = self.__getList(group)
        if list[id]['group']:
            return self.shortDescription(list[id]['id'])
        else:
            d = DishesController()
            return d.shortDescription(group, list[id]['id'])
        
    def shortDescription(self, id):
        """Render short Description for menu depended of choosen group"""
        c.group = int(id)
       
        if c.group > 1:
            (c.parent, ) = meta.Session.query(Menu.parentGroup).filter(Menu.childGroup == c.group).one()
        else:
            c.parent = None
        
        if 'cart' in session:
            c.badge = len(session['cart'])
        else:
            c.badge = None
        
        return render('/menu/shortDescription.mako')
    
    def toolbar(self, id):
        """Render toolbar for each group"""
        c.group = id
        (c.name, ) = meta.Session.query(Group.name).filter(Group.id == id).one()
        return render('/menu/toolbar.mako')
    
    def backButton(self, id):
        """Render back-button to specified group"""
        c.id = id
        (c.name,) = meta.Session.query(Group.name).filter(Group.id == id).one()
        return render('/menu/backButton.mako')
    
    def list(self, id):
        """Generate menu list JSON"""
        c.group = id
        "Get list of groups and dishes in this group and jsonify it"
        c.listString = json.dumps(self.__getList(id))
        return render('/menu/list.mako')
