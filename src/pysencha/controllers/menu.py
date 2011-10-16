# -*- coding: utf-8 -*-
import logging, sys, os, json

from pylons import request, response, session, tmpl_context as c, url
from pylons.controllers.util import abort, redirect
from handler import HandlerController
from pysencha.lib.base import BaseController, render

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