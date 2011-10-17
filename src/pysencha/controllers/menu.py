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
    def special(self, url):
        """
        render special slot description for all dishes
        """
        c.url = url
        c.hash = url
        return render('/menu/special.mako')
    
    def buttonAdd(self, url):
        """
        render button to add dish into cart
        """
        c.url = url
        c.hash = url
        return render('/menu/buttonAdd.mako')
    
    def buttonOrder(self, url):
        """
        render button to order dish
        """
        c.url = url
        c.hash = url
        return render('/menu/buttonOrder.mako')
    
    def add(self, id, size, pizza):
        """
        add selected dish to session.cart
        """
        "Tutaj powinno być dodawanie do sesji, tylko że nie ma sesji"
        "Potrzebna by była też jakaś tablica z daniami, żeby wziąć nazwę, rozmiar, cenę itd."
        print "add: " + id + " size: " + size + ""
        handler = HandlerController()
        return handler.load(url='menu/shortDescription')
    
    def order(self, id, size, pizza):
        """
        add selected dish to session.cart and go to form
        """
        "First add:"
        self.add(id, size, pizza)
        "Then go to form:"
        handler = HandlerController()
        return handler.load(url='form/shortDescription')
    
    def list(self, group):
        """
        generate menu list JSON
        """
        
        "Select groups:"
        g1 = aliased(Group)
        g2 = aliased(Group)
        
        groups = meta.Session.query(Menu, g1, g2).\
            join(g1, Menu.parentGroup == g1.id).\
            join(g2, Menu.childGroup == g2.id).\
            filter(Menu.parentGroup == group).\
            all()
        
        groupsString = ',\n'.join(u'{ "dish" : "%s", "id" : "%s" }' % (childGroup.name, childGroup.id) for (Menu, parentGroup, childGroup) in groups)
    
        "TO DO - back button - pole do wyciągnięcia z parentGroup"
        
        "Select dishes (leafs):"
        dishes = meta.Session.query(Dish.name, func.min(Dish_Sizes.price), Dish.id, Menu_Leaves.groupId).\
            join(Dish_Sizes).\
            join(Menu_Leaves).\
            filter(Menu_Leaves.groupId == group).\
            group_by(Dish.id).\
            all()
       
        dishesString = ',\n'.join(u'{ "dish" : "%s", "price" : "%.2f zł", "id" : "%s"}' % (x[0], x[1], x[2]) for (x) in dishes)
        
        "Join groups and dishes:"
        c.listString = ',\n'.join((groupsString, dishesString))
        
        return render('/menu/list.mako')