#! -*- coding: utf-8 -*-
import logging, sys, os
from pylons import request, response, session, tmpl_context as c, url
from pylons.controllers.util import abort, redirect
from pysencha.lib.base import BaseController, render
from pysencha.model import meta
from pysencha.model import data_base
from pysencha.model.data_base import *
from pysencha.model.data_base import Dish 
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

log = logging.getLogger(__name__)
testpath = 'testy/refapp/'

class HandlerController(BaseController):
    """
    Handler
    
    Return static files in response to ajax request (POST).
    """
    def load(self, url):
        serverpath = os.path.dirname(os.path.dirname(__file__))
        path = os.path.join(serverpath, testpath, url)
        f = open(path, 'r')
        plik  = f.read()
        """all_dishes = meta.Session.query(Dish, Sizes, Dish_Sizes).join(Dish_Sizes).join(Sizes).filter(Dish.name=='Tortilla').all()
        for i, j, k in all_dishes:
                print " ".join(("Nazwa:", i.name, "rozmiar:", j.name, "cena:", str(k.price)))"""
        f.close()
        return plik