# -*- coding: utf-8 -*-
import logging, sys, os, json

from pylons import request, response, session, tmpl_context as c, url
from pylons.controllers.util import abort, redirect
from handler import HandlerController
from pysencha.lib.base import BaseController, render
from pysencha.model import meta
from pysencha.model.data_base import *
from sqlalchemy import func
from sqlalchemy.orm import aliased

class MenuController(BaseController):
    def shortDescription(self, id):
        """Render short Description for menu depended of choosen group"""
        c.group = int(id)
        if c.group > 1:
            (c.parent, ) = meta.Session.query(Menu.parentGroup).filter(Menu.childGroup == c.group).one()
        return render('/menu/shortDescription.mako')
    
    def toolbar(self, id):
        """Render toolbar for each group"""
        c.group = id
        (c.name, ) = meta.Session.query(Group.name).filter(Group.id == id).one()
        return render('/menu/toolbar.mako')
    
    def special(self, url):
        """Render special slot description for all dishes"""
        c.url = url
        c.hash = url
        return render('/menu/special.mako')
    
    def buttonAdd(self, url):
        """Render button to add dish into cart"""
        c.url = url
        c.hash = url
        return render('/menu/buttonAdd.mako')
    
    def buttonOrder(self, url):
        """Render button to order dish"""
        c.url = url
        c.hash = url
        return render('/menu/buttonOrder.mako')
    
    def backButton(self, id):
        """Render back-button to specified group"""
        c.id = id
        (c.name,) = meta.Session.query(Group.name).filter(Group.id == id).one()
        return render('/menu/backButton.mako')
    
    def add(self, id, size, pizza):
        """Add selected dish to session.cart"""
        #if 'cart' in session:
        #    session['cart'].append()
        handler = HandlerController()
        return handler.load(url='menu/shortDescription')
    
    def order(self, id, size, pizza):
        """Add selected dish to session.cart and go to form"""
        "First add:"
        self.add(id, size, pizza)
        "Then go to form:"
        handler = HandlerController()
        return handler.load(url='form/shortDescription')
    
    def list(self, id):
        """Generate menu list JSON"""
        group = id
        c.group = group
        "Select groups:"
        g1 = aliased(Group)
        g2 = aliased(Group)
        
        #TO DO do usunięcia:
        session['cart'] = [1,4,4,1,1,4,1]
        session.save()
        #end
        
        groups = meta.Session.query(Menu, g1, g2).\
                                    join(g1, Menu.parentGroup == g1.id).\
                                    join(g2, Menu.childGroup == g2.id).\
                                    filter(Menu.parentGroup == group).\
                                    all()
        
        groupsString = ',\n'.join(u'{ "dish" : "%s", "id" : "%s" }'\
                                    % (childGroup.name, childGroup.id)\
                                    for (Menu, parentGroup, childGroup)\
                                    in groups)
        
        "Select dishes (leafs):"
        dishes = meta.Session.query(Dish.name, func.min(Dish_Sizes.price),
                                    Dish.id, Menu_Leaves.groupId).\
                                    join(Dish_Sizes).\
                                    join(Menu_Leaves).\
                                    filter(Menu_Leaves.groupId == group).\
                                    group_by(Dish.id).\
                                    all()
        
        "Join name, price, id and ingredients into list item string"
        "then join it into list data string"
        dishesString = ''
        for (name, price, id, group) in dishes:
            ingredients = meta.Session.query(Ingredients.name).\
                                    join(Dish_Ingredients, Dish).\
                                    filter(Dish.id == id).\
                                    all()
            ingredientsStr = ', '.join((x[0] for x in ingredients))
            item = ''.join((u'{ "dish" : "%s",' % (name,),
                            u'"price" : "%.2f zł",' % (price, ),
                            u' "id" : "%s",' % (id, ),
                            u' "ingredients" : "%s"}' % (ingredientsStr)))
            if dishesString:
                dishesString = ', '.join((dishesString,item))
            else:
                dishesString = item
        
        "Join groups and dishes:"
        c.listString = groupsString and ',\n'.join((groupsString,\
                                    dishesString)) or dishesString
        c.listString = dishesString and c.listString or groupsString
        return render('/menu/list.mako')
